import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResponseBox = () => {
    const [data, setData] = useState(null);
    const checkForUpdates = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/chatgpt/data');
            setData(response.data);

        } catch (error) {
            console.error('Error checking for updates:', error);
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            checkForUpdates();
        }, 1000); // Check every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div
            style={{
                flex: 1,
                minWidth: 320,
                maxWidth: 400,
                margin: "0 auto",
                padding: 32,
                borderRadius: 24,
                background: 'rgba(255,255,255,0.7)',
                boxShadow: "0 8px 32px rgba(25,118,210,0.10)",
                backdropFilter: "blur(8px)",
                border: "2px solid #43e97b33",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            <h1 style={{ color: "#1976d2", marginBottom: 24, fontWeight: 700, fontSize: 24 }}>
                ChatGPT Response
            </h1>
            <div style={{
                color: data ? "#222" : "#1976d2",
                fontWeight: 500,
                fontSize: 18,
                minHeight: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {!data && (
                    <div style={{ width: "100%" }}>
                        <div className="loader" style={{
                            margin: "0 auto 12px auto",
                            width: 32,
                            height: 32,
                            border: "4px solid #43e97b55",
                            borderTop: "4px solid #1976d2",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite"
                        }} />
                        <span style={{ color: "#43e97b", fontWeight: 600 }}>Waiting for upload...</span>
                        <style>
                            {`
                            @keyframes spin {
                                0% { transform: rotate(0deg);}
                                100% { transform: rotate(360deg);}
                            }
                            `}
                        </style>
                    </div>
                )}
                {data && (
                    <div style={{ width: "100%" }}>
                        <div style={{
                            background: "linear-gradient(90deg, #e3f2fd 0%, #b2dfdb 100%)",
                            borderRadius: 12,
                            padding: 16,
                            marginBottom: 12,
                            boxShadow: "0 2px 8px rgba(67,233,123,0.10)"
                        }}>
                            <h2 style={{ color: "#1976d2", fontWeight: 700, fontSize: 20, margin: 0 }}>
                                Item: <span style={{ color: "#43e97b" }}>{data.item}</span>
                            </h2>
                            <h3 style={{ color: "#1976d2", fontWeight: 700, fontSize: 18, margin: "12px 0 0 0" }}>
                                Disposal: <span style={{ color: "#43e97b" }}>{data.disposal}</span>
                            </h3>
                            <p style={{ color: "#1976d2", margin: "16px 0 0 0", fontWeight: 500 }}>
                                {data.details}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResponseBox;
