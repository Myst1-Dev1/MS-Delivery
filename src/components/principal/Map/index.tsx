'use client';

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

interface MapProps {
  zipCode:any;
}

export function Map({ zipCode }:MapProps) {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const zip = zipCode.zipCode.replace("-", "");
        console.log(`Buscando dados do CEP: ${zip}`);
  
        const viaCepResponse = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        const viaCepData = await viaCepResponse.json();
  
        if (!viaCepData.localidade || !viaCepData.uf) {
          console.error("Não foi possível obter a cidade e estado do CEP.");
          return;
        }
  
        // 2️⃣ Buscar coordenadas da cidade no Nominatim
        const nominatimResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${viaCepData.localidade}&state=${viaCepData.uf}&country=Brazil&format=json`
        );
        const nominatimData = await nominatimResponse.json();
  
        console.log("Resposta Nominatim:", nominatimData);
  
        if (!nominatimData || nominatimData.length === 0) {
          console.error("Nenhuma coordenada encontrada para a cidade.");
          return;
        }
  
        const { lat, lon } = nominatimData[0];
  
        // 3️⃣ Criar a rota no OpenRouteService
        const apiKey = "5b3ce3597851110001cf62482db8175f134f43a19dfc97e345e26f69";
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${lon},${lat}&end=-46.64839,-23.567117`
        );
  
        const data = await response.json();
  
        if (data.features) {
          const coordinates = data.features[0].geometry.coordinates.map(([lng, lat]: any) => [lat, lng]);
          setRouteCoordinates(coordinates);
        }
      } catch (error) {
        console.error("Erro ao buscar coordenadas ou rota:", error);
      }
    };
  
    fetchCoordinates();
  }, []);  

  return (
    <MapContainer
      center={[-23.55052, -46.633308]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {routeCoordinates.length > 0 && (
        <Polyline positions={routeCoordinates} color="green" />
      )}
    </MapContainer>
  );
}