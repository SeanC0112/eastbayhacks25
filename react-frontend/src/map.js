import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// (Optional) Example shelters, remove if not needed
const shelters = [
  { name: "Milpitas Community Center", lat: 37.4323, lng: -121.8996 },
];

const Map = () => {
    const [location, setLocation] = useState({lat: 37.77955484118413, lng: -122.39026767050531});

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

    // Center map on user location if available, otherwise on first shelter, otherwise fallback
    const center = location
        ? [location.lat, location.lng]
        : shelters.length > 0
            ? [shelters[0].lat, shelters[0].lng]
            : [37.4323, -121.8996]; // fallback to Milpitas if no shelters

    return (
        <div style={{ width: '100%', height: '420px', margin: '32px auto', maxWidth: '600px', marginBottom: '100px' }}>
            <div style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.25em',
                marginBottom: '8px',
                letterSpacing: '1px'
            }}>
                🗺️ Map of Shelters
            </div>
            <MapContainer
                center={center}
                zoom={14}
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
                {/* Remove shelters section below if you don't want static shelters */}
                {shelters.map((shelter, idx) => (
                    <Marker key={`shelter-${idx}`} position={[shelter.lat, shelter.lng]}>
                        <Popup>
                            <b>{shelter.name}</b>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            {/* Remove this section if you don't want to list shelters */}
            {/* Emergency Shelters List in a scrollable box */}
            <div style={{
                marginTop: '10px',
                textAlign: 'center'
            }}>
                <b>Emergency Shelters:</b>
                <div
                    style={{
                        maxHeight: '180px',
                        overflowY: 'auto',
                        margin: '12px auto',
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        background: '#fafbfc',
                        width: '90%',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        padding: '8px 0'
                    }}
                >
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {shelters.map((shelter, idx) => (
                            <li key={idx} style={{ padding: '4px 0' }}>
                                <span role="img" aria-label="shelter">🏢</span> {shelter.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Map;