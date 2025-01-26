import React from "react";
import "./history.css"; // Stil dosyası

const History = ({ history }) => {
  return (
    <div
      className="history-container"
      style={{
        position: "fixed",
        top: "50px",
        left: "10px",
        width: "220px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxHeight: "90vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "150px", // Minimum yükseklik
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Seçim Geçmişi
      </h3>
      {history.length > 0 ? (
        history.map((item, index) => (
          <div
            key={index}
            className="history-item"
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#f5f5f5",
              border: "1px solid #d3d6da",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {item.name}
            </p>
            <p>Plaka: {item.plate}</p>
            <p>Nüfus: {item.population}</p>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#aaa" }}></p>
      )}
    </div>
  );
};

export default History;
