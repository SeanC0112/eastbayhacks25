import React from 'react';

const Map = () => {
    return (
        <div style={{
            maxWidth: 400,
            minWidth: 320,
            margin: "0 auto",
            padding: 32,
            borderRadius: 18,
            boxShadow: "0 4px 24px rgba(25,118,210,0.10)",
            background: "#fff",
            border: "2px solid #1976d222",
            textAlign: "center"
        }}>
            <h1 style={{ color: "#43e97b", marginBottom: 24, fontWeight: 700, fontSize: 28 }}>Map</h1>
            <div style={{
                width: "100%",
                height: 220,
                background: "linear-gradient(135deg, #e3f2fd 0%, #b2dfdb 100%)",
                borderRadius: 12,
                border: "2px dashed #1976d255",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1976d2",
                fontWeight: 600,
                fontSize: 20
            }}>
                {/* Replace this with your actual map component */}
                Map goes here
            </div>
        </div>
    );
};

export default Map;