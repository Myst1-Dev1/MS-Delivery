import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export function FlyToRoute({ coords }: { coords: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (coords.length > 0) {
      const middle = coords[Math.floor(coords.length / 2)];
      map.flyTo(middle, 14); // anima até o centro da rota
    }
  }, [coords, map]);

  return null;
}
