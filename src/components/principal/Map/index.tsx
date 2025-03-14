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
        const zip = zipCode.zipCode.replace("-", ""); // Remove hífen do CEP
        console.log(`Buscando coordenadas para CEP: ${zip}`);
  
        const nominatimResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=Brazil&format=json`
        );
        const nominatimData = await nominatimResponse.json();
  
        console.log("Resposta Nominatim:", nominatimData);
  
        if (!nominatimData || nominatimData.length === 0) {
          console.error("Nenhuma coordenada encontrada para o CEP.");
          return;
        }
  
        const { lat, lon } = nominatimData[0];
  
        console.log(`Coordenadas do CEP ${zip}:`, lat, lon);
  
        // Buscar rota na OpenRouteService
        const apiKey = "5b3ce3597851110001cf62482db8175f134f43a19dfc97e345e26f69";
        const response = await fetch(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${lon},${lat}&end=-46.64839,-23.567117`
        );
  
        const data = await response.json();
        console.log("Resposta OpenRouteService:", data);
  
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