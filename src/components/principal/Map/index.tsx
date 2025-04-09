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
        const zip = zipCode.zipCode.replace("-", "");
  
        console.log("Buscando coordenadas para:", address, "e CEP:", zip);
  
        const restaurantResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
        );
        const restaurantData = await restaurantResponse.json();
        console.log("Dados do restaurante:", restaurantData);
  
        if (!restaurantData || restaurantData.length === 0) {
          console.error("Não foi possível obter coordenadas do restaurante.");
          return;
        }
  
        const { lat: latRestaurante, lon: lonRestaurante } = restaurantData[0];
  
        const viaCepResponse = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        const viaCepData = await viaCepResponse.json();
        console.log("Dados do cliente (via CEP):", viaCepData);
  
        if (!viaCepData.localidade || !viaCepData.uf || !viaCepData.logradouro) {
          console.error("Dados incompletos do cliente.");
          return;
        }
  
        const fullAddress = `${viaCepData.logradouro}, ${viaCepData.localidade}, ${viaCepData.uf}, Brazil`;
        const clientResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json`
        );
        const clientData = await clientResponse.json();
        console.log("Dados do cliente (Nominatim):", clientData);
  
        if (!clientData || clientData.length === 0) {
          console.error("Nenhuma coordenada encontrada para o cliente.");
          return;
        }
  
        const { lat: latDestino, lon: lonDestino } = clientData[0];
  
        const apiKey = "5b3ce3597851110001cf62482db8175f134f43a19dfc97e345e26f69";
        const routeResponse = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${lonRestaurante},${latRestaurante}&end=${lonDestino},${latDestino}`
        );
  
        const routeData = await routeResponse.json();
        console.log("Rota:", routeData);
  
        if (routeData.features) {
          const coordinates = routeData.features[0].geometry.coordinates.map(
            ([lng, lat]: any) => [lat, lng]
          );
          setRouteCoordinates(coordinates);
        } else {
          console.error("Erro ao gerar rota:", routeData);
        }
      } catch (error) {
        console.error("Erro ao buscar coordenadas ou rota:", error);
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