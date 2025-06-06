import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from './upload';
import Map from './map';
import logo from './logo.webp';

const App = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5050/api/data')
            .then(response => {
                setData(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #b2dfdb 100%)',
                fontFamily: 'Segoe UI, Arial, sans-serif'
            }}
        >
            <div
                style={{
                    width: '100%',
                    background: 'linear-gradient(90deg, #1976d2 0%, #43e97b 100%)',
                    padding: '56px 0 56px 0',
                    marginBottom: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 8px 32px rgba(25,118,210,0.12)'
                }}
            >
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: 420,
                        maxWidth: '90vw',
                        borderRadius: 32,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                        background: 'transparent',
                        padding: 0,
                        objectFit: 'contain'
                    }}
                />
            </div>
            <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Upload />
                <Map />
            </div>
        </div>
    );
};

export default App;