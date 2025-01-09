'use client';

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

export function Map() {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      const apiKey = "5b3ce3597851110001cf62482db8175f134f43a19dfc97e345e26f69";
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=-46.633308,-23.55052&end=-46.64839,-23.567117`
      );
      const data = await response.json();
      const coordinates = data.features[0].geometry.coordinates.map(([lng, lat]: any) => [lat, lng]);
      setRouteCoordinates(coordinates);
    };

    fetchRoute();
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