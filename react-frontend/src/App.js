import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Upload from './upload';
import ResponseBox from './response';
import Map from './map';
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
                width: '100vw',
                fontFamily: 'Segoe UI, Arial, sans-serif',
                position: 'relative',
                overflowX: 'hidden',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #b2dfdb 100%)',
            }}
        >
            {/* Animated Gradient Circles */}
            <div style={{
                position: 'fixed',
                top: '-120px',
                left: '-120px',
                width: 340,
                height: 340,
                background: 'radial-gradient(circle at 60% 40%, #43e97b88 0%, #1976d200 80%)',
                zIndex: 0,
                filter: 'blur(8px)',
                pointerEvents: 'none',
                animation: 'float1 12s ease-in-out infinite alternate'
            }} />
            <div style={{
                position: 'fixed',
                bottom: '-100px',
                right: '-100px',
                width: 300,
                height: 300,
                background: 'radial-gradient(circle at 40% 60%, #1976d288 0%, #43e97b00 80%)',
                zIndex: 0,
                filter: 'blur(8px)',
                pointerEvents: 'none',
                animation: 'float2 14s ease-in-out infinite alternate'
            }} />

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
                    padding: '32px 0 40px 0',
                    marginBottom: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 2
                }}
            >
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: 'min(340px, 80vw)',
                        borderRadius: 32,
                        background: 'transparent',
                        padding: 0,
                        objectFit: 'contain',
                        boxShadow: '0 8px 32px rgba(25,118,210,0.10)'
                    }}
                />
            </div>

            {/* Main Content: Upload, ResponseBox, Map side by side */}
            <div style={{
                maxWidth: 1400,
                margin: '0 auto',
                display: 'flex',
                gap: 32,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'stretch',
                position: 'relative',
                zIndex: 3
            }}>
                <Upload />
                <ResponseBox />
                <div style={{
                    flex: 1,
                    minWidth: 380,
                    maxWidth: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: 24,
                    boxShadow: "0 8px 32px rgba(25,118,210,0.10)",
                    border: "2px solid #1976d233",
                    padding: 24,
                    margin: "0 auto"
                }}>
                    <Map />
                </div>
            </div>

            {/* Bottom Wave (at exact bottom) */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                zIndex: 1,
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

            {/* Keyframes for floating circles */}
            <style>
                {`
                @keyframes float1 {
                    0% { transform: translateY(0) scale(1);}
                    100% { transform: translateY(40px) scale(1.08);}
                }
                @keyframes float2 {
                    0% { transform: translateY(0) scale(1);}
                    100% { transform: translateY(-30px) scale(1.04);}
                }
                `}
            </style>
        </div>
    );
};

export default App;
