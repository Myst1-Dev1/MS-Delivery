'use client';

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { FlyToRoute } from "./FlyToRoute";

interface MapProps {
  zipCode:any;
  address:string;
}

export function Map({ zipCode, address }:MapProps) {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    if (!zipCode?.zipCode || !address) {
      console.warn("Dados incompletos:", zipCode, address);
      return;
    }
  
    const fetchCoordinates = async () => {
      try {
        const clientCep = zipCode.zipCode.replace("-", "");
        const restaurantCep = address.replace("-", "");
  
        // Buscar endereço do restaurante pelo CEP
        const restaurantViaCepRes = await fetch(`https://viacep.com.br/ws/${restaurantCep}/json/`);
        const restaurantViaCepData = await restaurantViaCepRes.json();
  
        if (!restaurantViaCepData.logradouro || !restaurantViaCepData.localidade || !restaurantViaCepData.uf) {
          console.error("Endereço do restaurante incompleto.");
          return;
        }
  
        const fullRestaurantAddress = `${restaurantViaCepData.logradouro}, ${restaurantViaCepData.localidade}, ${restaurantViaCepData.uf}, Brazil`;
        const restaurantGeoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullRestaurantAddress)}&format=json`
        );
        const restaurantGeoData = await restaurantGeoRes.json();
  
        if (!restaurantGeoData?.length) {
          console.error("Coordenadas do restaurante não encontradas.");
          return;
        }
  
        const { lat: latRestaurante, lon: lonRestaurante } = restaurantGeoData[0];
  
        // Buscar endereço do cliente pelo CEP
        const clientViaCepRes = await fetch(`https://viacep.com.br/ws/${clientCep}/json/`);
        const clientViaCepData = await clientViaCepRes.json();
  
        if (!clientViaCepData.logradouro || !clientViaCepData.localidade || !clientViaCepData.uf) {
          console.error("Endereço do cliente incompleto.");
          return;
        }
  
        const fullClientAddress = `${clientViaCepData.logradouro}, ${clientViaCepData.localidade}, ${clientViaCepData.uf}, Brazil`;
        const clientGeoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullClientAddress)}&format=json`
        );
        const clientGeoData = await clientGeoRes.json();
  
        if (!clientGeoData?.length) {
          console.error("Coordenadas do cliente não encontradas.");
          return;
        }
  
        const { lat: latCliente, lon: lonCliente } = clientGeoData[0];
  
        // Gerar rota
        const apiKey = "5b3ce3597851110001cf62482db8175f134f43a19dfc97e345e26f69";
        const routeRes = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${lonRestaurante},${latRestaurante}&end=${lonCliente},${latCliente}`
        );
        const routeData = await routeRes.json();
  
        if (routeData.features) {
          const coordinates = routeData.features[0].geometry.coordinates.map(
            ([lng, lat]: any) => [lat, lng]
          );
          setRouteCoordinates(coordinates);
        } else {
          console.error("Erro ao gerar rota:", routeData);
        }
      } catch (err) {
        console.error("Erro geral:", err);
      }
    };
  
    fetchCoordinates();
  }, [zipCode?.zipCode, address]);  
  
  return (
    <MapContainer
      center={
        routeCoordinates.length > 0
          ? routeCoordinates[Math.floor(routeCoordinates.length / 2)]
          : [-23.55052, -46.633308] // fallback SP
      }
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
       {routeCoordinates.length > 0 && (
          <>
            <Polyline positions={routeCoordinates} color="green" />
            <FlyToRoute coords={routeCoordinates} />
          </>
        )}
    </MapContainer>
  );
}