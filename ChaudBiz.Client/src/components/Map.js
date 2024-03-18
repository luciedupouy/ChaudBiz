import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ address }) => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!address) return; // Ne rien faire si l'adresse est vide

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data && data.length > 0 && data[0].lat && data[0].lon) {
          setLat(data[0].lat);
          setLon(data[0].lon);
          console.log(data[0].lat, data[0].lon);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };
    fetchCoordinates();
  }, [address]);

  if (lat === null || lon === null) {
    return null; // Ne rien rendre si les coordonnées ne sont pas disponibles
  }

  return (
    <MapContainer center={[lat, lon]} zoom={13} style={{ height: '350px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
