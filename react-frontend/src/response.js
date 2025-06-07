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
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div
            style={{
                maxWidth: 400,
                minWidth: 320,
                margin: "0 auto",
                padding: 32,
                borderRadius: 18,
                boxShadow: "0 4px 24px rgba(25,118,210,0.10)",
                background: "#fff",
                textAlign: "center",
                border: "2px solid #43e97b22",
                fontFamily: 'Segoe UI, Arial, sans-serif'
            }}
        >
            <h1 style={{ color: "#1976d2", marginBottom: 24, fontWeight: 700, fontSize: 24 }}>
                ChatGPT Response
            </h1>
            <div style={{
                color: data ? "#222" : "#43e97b",
                fontWeight: 500,
                fontSize: 18,
                minHeight: 40
            }}>
                {!data && ("Waiting for upload...")}
                {data && (
                    <div>
                        <h1 style={{ color: "#1976d2", marginBottom: 16, fontWeight: 700, fontSize: 20 }}>Item: {data.item}</h1>
                        <h1 style={{ color: "#1976d2", marginBottom: 16, fontWeight: 700, fontSize: 20 }}>Disposal: {data.disposal}</h1>
                        <p style={{ marginBottom: 16 }}>{data.details}</p>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResponseBox;
