import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from './upload';
import Map from './map';
import ResponseBox from './response';
import logo from './logo.webp';
import Wavify from 'react-wavify';

const App = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/data')
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
                fontFamily: 'Segoe UI, Arial, sans-serif',
                position: 'relative',
                overflowX: 'hidden'
            }}
        >

            {/* Top Wave (flipped) */}
            <div style={{
                position: 'fixed',
                top: -30,
                left: 0,
                width: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                transform: 'scaleY(-1)'
            }}>
                <Wavify
                    fill="url(#topWaveGradient)"
                    paused={false}
                    options={{
                        height: 60,
                        amplitude: 60,
                        speed: 0.16,
                        points: 5
                    }}
                    style={{ minHeight: 180, width: '100vw' }}
                >
                    <defs>
                        <linearGradient id="topWaveGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#1976d2" />
                            <stop offset="100%" stopColor="#43e97b" />
                        </linearGradient>
                    </defs>
                </Wavify>
            </div>

            {/* Banner with Logo */}
            <div
                style={{
                    width: '100%',
                    background: 'transparent',
                    padding: '10px 0 56px 0',
                    marginBottom: 48,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: 'min(440px, 90vw)',
                        borderRadius: 32,
                        background: 'transparent',
                        padding: 0,
                        objectFit: 'contain'
                    }}
                />
            </div>

            {/* Main Content */}
            <div style={{
                maxWidth: 900,
                margin: '0 auto',
                display: 'flex',
                gap: 48,
                flexWrap: 'wrap',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2
            }}>
                <Upload />
                <ResponseBox />
                {/* <Map /> */}
            </div>

            {/* Bottom Wave (at exact bottom) */}
            <div style={{
                position: 'relative',
                bottom: -20,
                left: 0,
                width: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}>
                <Wavify
                    fill="url(#bottomWaveGradient)"
                    paused={false}
                    options={{
                        height: 40,
                        amplitude: 40,
                        speed: 0.15,
                        points: 4
                    }}
                    style={{ minHeight: 160, width: '100vw' }}
                >
                    <defs>
                        <linearGradient id="bottomWaveGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#43e97b" />
                            <stop offset="100%" stopColor="#1976d2" />
                        </linearGradient>
                    </defs>
                </Wavify>
            </div>
        </div>
    );
};

export default App;
