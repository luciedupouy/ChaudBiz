import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ address }) => {
  const [coordinates, setCoordinates] = useState([0, 0]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          setCoordinates([data[0].lat, data[0].lon]);
          console.log(data[0].lat, data[0].lon);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };
    fetchCoordinates();
  }, [address]);

  return (
    <MapContainer center={coordinates} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coordinates}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
