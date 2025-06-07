import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Example trash/recycling centers in the Bay Area (expanded)
const defaultTrashCenters = [
  { name: "Milpitas Sanitation & Recycling Center", lat: 37.4323, lng: -121.8996 },
  { name: "Davis Street Transfer Station", lat: 37.7357, lng: -122.1566 },
  { name: "Alameda County Household Hazardous Waste", lat: 37.7282, lng: -122.1561 },
  { name: "San Jose Environmental Innovation Center", lat: 37.3722, lng: -121.8875 },
  { name: "Oakland Transfer Station", lat: 37.7992, lng: -122.2727 },
  { name: "Sunnyvale SMaRT Station", lat: 37.4042, lng: -122.0146 },
  { name: "San Francisco Recology", lat: 37.7416, lng: -122.4011 },
  { name: "South San Francisco Scavenger", lat: 37.6547, lng: -122.4001 },
  { name: "Berkeley Transfer Station", lat: 37.8572, lng: -122.2992 },
  { name: "Redwood Landfill & Recycling Center", lat: 38.1122, lng: -122.5456 },
  { name: "Fremont Recycling & Transfer Station", lat: 37.5269, lng: -121.9836 },
  { name: "Hayward Transfer Station", lat: 37.6341, lng: -122.0775 },
  { name: "Richmond Sanitary Service", lat: 37.9747, lng: -122.3531 },
  { name: "Pacifica Recycling Yard", lat: 37.6138, lng: -122.4869 },
];

const Map = () => {
    const [location, setLocation] = useState({lat: 37.77955484118413, lng: -122.39026767050531});
    const [trashCenters, setTrashCenters] = useState(defaultTrashCenters);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                () => {
                    alert('Unable to retrieve your location.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }, []);

    // Center map on user location if available, otherwise on first trash center, otherwise fallback
    const center = location
        ? [location.lat, location.lng]
        : trashCenters.length > 0
            ? [trashCenters[0].lat, trashCenters[0].lng]
            : [37.4323, -121.8996]; // fallback to Milpitas if no centers

    return (
        <div style={{ width: '100%', height: '420px', margin: '32px auto', maxWidth: '600px', marginBottom: '100px' }}>
            <div style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.25em',
                marginBottom: '8px',
                letterSpacing: '1px',
                color: "#1976d2"
            }}>
                🗑️ Map of Trash & Recycling Centers
            </div>
            <MapContainer
                center={center}
                zoom={11}
                style={{ height: '400px', width: '100%', borderRadius: '12px' }}
                key={center.join(',')}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {location && (
                    <Marker position={[location.lat, location.lng]}>
                        <Popup>
                            <b>Your Location</b>
                        </Popup>
                    </Marker>
                )}
                {trashCenters.map((center, idx) => (
                    <Marker key={`trashcenter-${idx}`} position={[center.lat, center.lng]}>
                        <Popup>
                            <b>{center.name}</b>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;