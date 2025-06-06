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
  { name: "Milpitas Sports Center", lat: 37.4329, lng: -121.9072 },
  { name: "Milpitas Library", lat: 37.4321, lng: -121.9067 },
  { name: "Milpitas High School", lat: 37.4327, lng: -121.9102 },
  { name: "Curtner Elementary School", lat: 37.4262, lng: -121.9111 },
  { name: "Pomeroy Elementary School", lat: 37.4148, lng: -121.9157 },
  { name: "Sunnyhills Apartments Community Room", lat: 37.4412, lng: -121.8921 },
  { name: "Milpitas Senior Center", lat: 37.4286, lng: -121.9062 },
  { name: "Zanker Elementary School", lat: 37.4269, lng: -121.9222 },
  { name: "Burnett Elementary School", lat: 37.4201, lng: -121.9007 },
  { name: "Rose Elementary School", lat: 37.4265, lng: -121.8992 },
  { name: "Pearl Zanker Park", lat: 37.4275, lng: -121.9205 },
  { name: "Cardoza Park", lat: 37.4320, lng: -121.8990 },
  { name: "Hall Memorial Park", lat: 37.4360, lng: -121.9040 },
  { name: "Pines Neighborhood Center", lat: 37.4365, lng: -121.8970 },
  { name: "Weller Elementary School", lat: 37.4340, lng: -121.8890 },
  { name: "Randall Elementary School", lat: 37.4400, lng: -121.9020 },
  { name: "Sinnott Elementary School", lat: 37.4210, lng: -121.8920 },
  { name: "Marshall Pomeroy Elementary", lat: 37.4140, lng: -121.9150 },
  { name: "Calaveras Hills High School", lat: 37.4335, lng: -121.9045 },
  { name: "Joseph Weller Elementary", lat: 37.4345, lng: -121.8895 },
  { name: "Milpitas Adult Education", lat: 37.4328, lng: -121.8998 },
  { name: "Northwood Park", lat: 37.4405, lng: -121.9005 },
  { name: "Foothill Square", lat: 37.4368, lng: -121.8902 },
  { name: "Pines Park", lat: 37.4370, lng: -121.8965 },
  { name: "Starlite Park", lat: 37.4205, lng: -121.9040 },
  { name: "Sandalwood Park", lat: 37.4380, lng: -121.8990 },
  { name: "Creighton Park", lat: 37.4190, lng: -121.9100 },
  { name: "Augustine Park", lat: 37.4330, lng: -121.9120 },
  { name: "Higuera Adobe Park", lat: 37.4267, lng: -121.9135 },
  { name: "Ed Levin County Park", lat: 37.4451, lng: -121.8577 },
  { name: "Alviso Marina County Park", lat: 37.4269, lng: -121.9767 },
  { name: "Peter Gill Memorial Park", lat: 37.4362, lng: -121.8852 },
  { name: "Bob McGuire Park", lat: 37.4300, lng: -121.9200 },
  { name: "Berryessa Community Center", lat: 37.3861, lng: -121.8569 },
  { name: "Great Mall", lat: 37.4156, lng: -121.8910 },
  { name: "Milpitas City Hall", lat: 37.4323, lng: -121.8997 },
  { name: "Elmwood Correctional Facility", lat: 37.4197, lng: -121.9202 },
  { name: "South Bay Community Church", lat: 37.4329, lng: -121.8991 },
  { name: "Saint John the Baptist Catholic Church", lat: 37.4324, lng: -121.8993 },
  { name: "Trinity Presbyterian Church", lat: 37.4342, lng: -121.9021 },
  { name: "Bay View Golf Club", lat: 37.4369, lng: -121.9455 },
  { name: "Park Victoria Baptist Church", lat: 37.4360, lng: -121.8890 },
  { name: "Calaveras Park", lat: 37.4410, lng: -121.9040 },
  { name: "Hidden Lake Park", lat: 37.4280, lng: -121.9000 },
  { name: "Dixon Landing Park", lat: 37.4400, lng: -121.9200 },
  { name: "Coyote Creek Trailhead", lat: 37.4260, lng: -121.8850 },
  { name: "Pines Elementary School", lat: 37.4375, lng: -121.8980 },
  { name: "Milpitas Montessori School", lat: 37.4330, lng: -121.9000 },
  { name: "Rose Garden Park", lat: 37.4270, lng: -121.8990 },
  { name: "Calaveras Ridge Trailhead", lat: 37.4450, lng: -121.9000 },
  { name: "Spring Valley Golf Course", lat: 37.4455, lng: -121.8800 },
  { name: "Summitpointe Golf Club", lat: 37.4452, lng: -121.8805 },
  { name: "Milpitas Unified School District", lat: 37.4325, lng: -121.8995 },
  { name: "Berryessa Community Center", lat: 37.3861, lng: -121.8569 },
  { name: "Berryessa Branch Library", lat: 37.3868, lng: -121.8665 },
  { name: "Mayfair Community Center", lat: 37.3498, lng: -121.8377 },
  { name: "Seven Trees Community Center", lat: 37.2855, lng: -121.8413 },
  { name: "Alum Rock Youth Center", lat: 37.3661, lng: -121.8242 },
  { name: "Evergreen Community Center", lat: 37.3042, lng: -121.7896 },
  { name: "Willow Glen Community Center", lat: 37.2941, lng: -121.9002 },
  { name: "Camden Community Center", lat: 37.2567, lng: -121.9212 },
  { name: "Bascom Community Center", lat: 37.3122, lng: -121.9311 },
  { name: "Southside Community Center", lat: 37.2523, lng: -121.8197 },
  { name: "Roosevelt Community Center", lat: 37.3477, lng: -121.8672 },
  { name: "Washington United Youth Center", lat: 37.3281, lng: -121.8942 },
  { name: "Santa Clara Senior Center", lat: 37.3541, lng: -121.9552 },
  { name: "Santa Clara Northside Library", lat: 37.3979, lng: -121.9542 },
  { name: "Santa Clara Central Park Library", lat: 37.3485, lng: -121.9706 },
  { name: "Campbell Community Center", lat: 37.2872, lng: -121.9445 },
  { name: "Cupertino Senior Center", lat: 37.3230, lng: -122.0322 },
  { name: "Cupertino Community Hall", lat: 37.3229, lng: -122.0322 },
  { name: "Mountain View Community Center", lat: 37.3894, lng: -122.0819 },
  { name: "Sunnyvale Community Center", lat: 37.3688, lng: -122.0292 },
  { name: "Sunnyvale Senior Center", lat: 37.3688, lng: -122.0293 },
  { name: "Fremont Community Center", lat: 37.5483, lng: -121.9886 },
  { name: "Fremont Main Library", lat: 37.5485, lng: -121.9886 },
  { name: "Irvington Community Center", lat: 37.5262, lng: -121.9617 },
  { name: "Centerville Community Center", lat: 37.5521, lng: -121.9826 },
  { name: "Warm Springs Community Center", lat: 37.4917, lng: -121.9306 },
  { name: "Milpitas Sikh Gurdwara", lat: 37.4322, lng: -121.8897 },
  { name: "San Jose City College", lat: 37.3126, lng: -121.9260 },
  { name: "San Jose State University Event Center", lat: 37.3352, lng: -121.8811 },
  { name: "SAP Center", lat: 37.3328, lng: -121.9010 },
  { name: "Santa Clara Convention Center", lat: 37.4030, lng: -121.9749 },
  { name: "Levi's Stadium", lat: 37.4030, lng: -121.9697 },
  { name: "San Jose Convention Center", lat: 37.3305, lng: -121.8881 },
  { name: "Children's Discovery Museum", lat: 37.3269, lng: -121.8937 },
  { name: "Guadalupe Community Center", lat: 37.3382, lng: -121.8863 },
  { name: "Almaden Community Center", lat: 37.2507, lng: -121.8663 },
  { name: "Rose Garden Branch Library", lat: 37.3337, lng: -121.9367 },
  { name: "Eastridge Center", lat: 37.3249, lng: -121.8107 },
  { name: "Evergreen Branch Library", lat: 37.3042, lng: -121.7897 },
  { name: "West Valley Branch Library", lat: 37.3128, lng: -121.9782 },
  { name: "Berryessa Community Garden", lat: 37.3890, lng: -121.8660 },
  { name: "Santa Clara Youth Activity Center", lat: 37.3545, lng: -121.9505 },
  { name: "Santa Clara Fire Station 2", lat: 37.3547, lng: -121.9507 },
  { name: "Santa Clara Fire Station 8", lat: 37.3977, lng: -121.9540 },
  { name: "Santa Clara Fire Station 9", lat: 37.3543, lng: -121.9550 },
  { name: "Santa Clara Fire Station 10", lat: 37.3549, lng: -121.9555 },
   { name: "San Jose Family Shelter", lat: 37.3494, lng: -121.8747 },
  { name: "Santa Clara University", lat: 37.3496, lng: -121.9381 },
  { name: "Santa Clara City Library", lat: 37.3541, lng: -121.9552 },
  { name: "Sunnyvale Public Library", lat: 37.3688, lng: -122.0296 },
  { name: "Sunnyvale Senior Center", lat: 37.3688, lng: -122.0293 },
  { name: "Mountain View Community Center", lat: 37.3894, lng: -122.0819 },
  { name: "Mountain View Senior Center", lat: 37.3902, lng: -122.0837 },
  { name: "Palo Alto Art Center", lat: 37.4419, lng: -122.1430 },
  { name: "Palo Alto Mitchell Park Library", lat: 37.4265, lng: -122.1081 },
  { name: "Fremont Main Library", lat: 37.5485, lng: -121.9886 },
  { name: "Fremont Community Center", lat: 37.5483, lng: -121.9886 },
  { name: "Fremont Irvington Community Center", lat: 37.5262, lng: -121.9617 },
  { name: "Fremont Centerville Community Center", lat: 37.5521, lng: -121.9826 },
  { name: "Redwood City Community Activities Building", lat: 37.4848, lng: -122.2281 },
  { name: "Redwood City Veterans Memorial Senior Center", lat: 37.4827, lng: -122.2364 },
  { name: "San Mateo Main Library", lat: 37.5663, lng: -122.3227 },
  { name: "San Mateo Senior Center", lat: 37.5630, lng: -122.3220 },
  { name: "Daly City War Memorial Community Center", lat: 37.6879, lng: -122.4702 },
  { name: "South San Francisco Municipal Services Building", lat: 37.6547, lng: -122.4077 },
  { name: "San Francisco Main Library", lat: 37.7789, lng: -122.4155 },
  { name: "SF Moscone Center", lat: 37.7840, lng: -122.4011 },
  { name: "SF Bill Graham Civic Auditorium", lat: 37.7780, lng: -122.4192 },
  { name: "SF YMCA Chinatown", lat: 37.7941, lng: -122.4078 },
  { name: "Oakland Main Library", lat: 37.8087, lng: -122.2708 },
  { name: "Oakland Convention Center", lat: 37.8014, lng: -122.2727 },
  { name: "Berkeley Community Center", lat: 37.8715, lng: -122.2730 },
  { name: "Berkeley Public Library", lat: 37.8700, lng: -122.2697 },
  { name: "Richmond Memorial Auditorium", lat: 37.9369, lng: -122.3430 },
  { name: "Hayward City Hall", lat: 37.6704, lng: -122.0871 },
  { name: "Hayward Senior Center", lat: 37.6702, lng: -122.0869 },
  { name: "Union City Library", lat: 37.5958, lng: -122.0190 },
  { name: "Union City Kennedy Community Center", lat: 37.6017, lng: -122.0177 },
  { name: "San Leandro Senior Community Center", lat: 37.7221, lng: -122.1607 },
  { name: "San Leandro Main Library", lat: 37.7249, lng: -122.1566 },
  { name: "Castro Valley Library", lat: 37.6955, lng: -122.0732 },
  { name: "Pleasanton Senior Center", lat: 37.6661, lng: -121.8708 },
  { name: "Pleasanton Library", lat: 37.6609, lng: -121.8747 },
  { name: "Livermore Public Library", lat: 37.6819, lng: -121.7680 },
  { name: "Livermore Community Center", lat: 37.6816, lng: -121.7682 },
  { name: "Dublin Senior Center", lat: 37.7022, lng: -121.9358 },
{ name: "Dublin Library", lat: 37.7021, lng: -121.9356 },
{ name: "Fremont Central Park Library", lat: 37.5485, lng: -121.9886 },
{ name: "Fremont Community Center", lat: 37.5483, lng: -121.9886 },
{ name: "Fremont Irvington Community Center", lat: 37.5262, lng: -121.9617 },
{ name: "Fremont Centerville Community Center", lat: 37.5521, lng: -121.9826 }
];

const Map = () => {
    const [location, setLocation] = useState(null);
    const [hospitals, setHospitals] = useState([{name: "", latitude: 0, longitude: 0}]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    axios.get('http://127.0.0.1:5000/api/geocode', {
                        params: { lat: position.coords.latitude, long: position.coords.longitude }
                    })
                        .then(response => {
                            // If backend returns array of objects [{name, latitude, longitude}, ...]
                            for (let i = 0; i < response.data.hospitals.length; i++) {
                                setHospitals(...hospitals, {name: response.data.hospitals, latitude: response.data.latitude, longitude: response.data.longitude});
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching hospital data:', error);
                        });
                },
                () => {
                    alert('Unable to retrieve your location.');
                    axios.get('http://127.0.0.1:5000/api/geocode')
                        .then(response => {
                            // If backend returns array of objects [{name, latitude, longitude}, ...]
                            for (let i = 0; i < response.data.hospitals.length; i++) {
                                setHospitals(...hospitals, {name: response.data.hospitals, latitude: response.data.latitude, longitude: response.data.longitude});
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching hospital data:', error);
                        });
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
            axios.get('http://127.0.0.1:5000/api/geocode')
                        .then(response => {
                            // If backend returns array of objects [{name, latitude, longitude}, ...]
                            for (let i = 0; i < response.data.hospitals.length; i++) {
                                setHospitals(...hospitals, {name: response.data.hospitals, latitude: response.data.latitude, longitude: response.data.longitude});
                            }
                        })
                        .catch(error => {
                            console.error('Error fetching hospital data:', error);
                        });
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
                {hospitals.map((hospital, idx) => (
                    <Marker key={`hospital-${idx}`} position={[hospital.latitude, hospital.longitude]}>
                        <Popup>
                            <b>{hospital.name}</b>
                        </Popup>
                    </Marker>
                ))}
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