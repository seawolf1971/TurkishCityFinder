import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "./button.css";
import Dropdown from "./Dropdown";
import "./resultBox.css";
import History from "./History";
import "./howToPlay.css";


const App = () => {
  const [geoData, setGeoData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(""); // Kullanıcının geçici seçimi
  const [submittedCity, setSubmittedCity] = useState(""); // Kullanıcının submit ettiği şehir
  const [hoveredCity, setHoveredCity] = useState(""); // Hover edilen şehir
  const [targetCity, setTargetCity] = useState(""); // Doğru şehir
  const [attempts, setAttempts] = useState(0); // Kullanıcının tahmin sayısı
  const [feedback, setFeedback] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [wrongCities, setWrongCities] = useState([]); // Yanlış tahmin edilen şehirler
  const [errorMessage, setErrorMessage] = useState("");
  const [cityHistory, setCityHistory] = useState([]); // Kullanıcının seçim geçmişi (eski adı `history`)
  const [clickedCity, setClickedCity] = useState(""); // Tıklanan şehir
  const [showHowToPlay, setShowHowToPlay] = useState(false); // "Nasıl oynanır?" kutusunu kontrol eden state



  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        const response = await fetch("/data/tr-cities.json");
        if (!response.ok) {
          throw new Error("GeoJSON dosyası yüklenemedi.");
        }
        const data = await response.json();
        setGeoData(data);

        const randomCity =
          data.features[Math.floor(Math.random() * data.features.length)];
        setTargetCity(randomCity.properties.name);
      } catch (error) {
        console.error("Hata:", error);
      }
    };
    fetchGeoData();
  }, []);

  // Şehir seçim işlemi (Hem harita hem de dropdown için çalışır)
  const handleCitySelect = (cityName) => {
    setSelectedCity(cityName); // Seçilen şehri güncelle
    setErrorMessage("");
  };

  // Kullanıcının seçimini submit işlemi
  const handleSubmit = () => {
    if (!selectedCity) {
      setErrorMessage("Lütfen bir şehir seçiniz.");
      return;
    }

    setSubmittedCity(selectedCity); // Kullanıcının submit ettiği şehri kaydet
    setAttempts(attempts + 1);
    generateFeedback(selectedCity);
    setShowFeedback(true);

    if (selectedCity !== targetCity) {
      setWrongCities((prev) => [...prev, selectedCity]);
    } else {
      setWrongCities([]); // Doğru şehir seçildiyse yanlış şehirleri sıfırla
    }

    const cityData = geoData.features.find(
      (feature) => feature.properties.name === selectedCity
    );
    const newHistory = {
      name: cityData.properties.name,
      plate: cityData.properties.number,
      population: cityData.properties.population,
    };
    setCityHistory((prev) => [...prev, newHistory]);
  };

  const generateFeedback = (cityName) => {
    const cityData = geoData.features.find(
      (feature) => feature.properties.name === cityName
    );
    const targetCityData = geoData.features.find(
      (feature) => feature.properties.name === targetCity
    );

    const newFeedback = {
      plate: {
        value: cityData.properties.number,
        correct: cityData.properties.number === targetCityData.properties.number,
        direction:
          cityData.properties.number > targetCityData.properties.number
            ? "down"
            : "up",
      },
      region: {
        value: cityData.properties.region,
        correct: cityData.properties.region === targetCityData.properties.region,
      },
      population: {
        value: cityData.properties.population,
        correct:
          cityData.properties.population === targetCityData.properties.population,
        direction:
          cityData.properties.population > targetCityData.properties.population
            ? "down"
            : "up",
      },
      letterCount: {
        value: cityName.length,
        correct: cityName.length === targetCity.length,
        direction: cityName.length > targetCity.length ? "down" : "up",
      },
    };

    setFeedback(newFeedback);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px",
        width: "55%",
      }}
    >
      {/* Nasıl Oynanır Kutusu */}
      <div className="how-to-play-container">
        <div className="how-to-play-header">
          <span>Nasıl Oynanır?</span>
          <button
            className="how-to-play-button"
            onClick={() => setShowHowToPlay(!showHowToPlay)}
          >
            ?
          </button>
        </div>
        {showHowToPlay && (
          <ul className="how-to-play-content">
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt.</li>
          </ul>
        )}
      </div>

      {/* History Component */}
      <History history={cityHistory} />
      

      <div
        style={{
          width: "58.9%",
          backgroundColor: "#f5f5f5",
          borderBottom: "1.7px solid #d3d6da",
          padding: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          textAlign: "center",
          zIndex: "1000",
          position: "absolute",
          top: "0",
        }}
      >
        Türk Şehir Bulma Oyunu
      </div>

      {/* Harita */}
      <div
        style={{
          width: "100%",
          maxWidth: "90vw",
          aspectRatio: "4 / 2",
          backgroundColor: "#f5f5f5",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        {geoData ? (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 3200,
              center: [35, 39],
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            const [clickedCity, setClickedCity] = useState(""); // Tıklanan şehir

...

<Geographies geography={geoData}>
  {({ geographies }) =>
    geographies.map((geo) => (
      <Geography
        key={geo.rsmKey}
        geography={geo}
        onMouseEnter={() =>
          setHoveredCity(
            `${geo.properties?.name || "Bilinmeyen Şehir"} (${
              geo.properties?.number || "N/A"
            })`
          )
        }
        onMouseLeave={() => setHoveredCity("")}
        onClick={() => {
          handleCitySelect(geo.properties?.name || ""); // Şehir seçimi
          setClickedCity(geo.properties?.name || ""); // Tıklanan şehri güncelle
        }}
        style={{
          default: {
            fill:
              wrongCities.includes(geo.properties.name)
                ? "#ffcccc" // Yanlış tahmin edilen şehir kırmızı
                : geo.properties.name === submittedCity &&
                  submittedCity === targetCity
                ? "#ccffcc" // Doğru tahmin edilen şehir yeşil
                : clickedCity === geo.properties.name
                ? "#cce5ff" // Tıklanan şehir mavi
                : "#ECEFF1", // Varsayılan renk
            stroke: "#000",
            strokeWidth: 0.5,
            outline: "none",
          },
          hover: {
            fill: "#CFD8DC",
            stroke: "#000",
            strokeWidth: 0.7,
            outline: "none",
          },
          pressed: {
            fill: "#2196F3",
            stroke: "#000",
            strokeWidth: 0.5,
            outline: "none",
          },
        }}
      />
    ))
  }
</Geographies>



          </ComposableMap>
        ) : (
          <p style={{ textAlign: "center" }}>Harita yükleniyor...</p>
        )}
      </div>

      {/* Hover edilen şehir */}
      <div style={{ textAlign: "center", fontSize: "18px", marginTop: "365px", position: "absolute",  }}>
        {hoveredCity && <p>Seçilen Şehir: {hoveredCity}</p>}
      </div>

      {/* Dropdown ve Submit */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <Dropdown
          items={geoData ? geoData.features.map((feature) => feature.properties.name) : []}
          onSelect={handleCitySelect}
          selectedCity={selectedCity}
        />
        <button
          className="button"
          onClick={handleSubmit}
          style={{
            padding: "8px 25px",
            marginTop: "0px",
            marginLeft: "20px",
          }}
        >
          Submit
        </button>
      </div>

      {/* Hata Mesajı */}
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "20px" }}>{errorMessage}</div>
      )}

      

      {/* Kutucuklar */}
      {showFeedback && (
        <div className="result-container" key={attempts} >
        {/* Plaka */}
        <div
          className={`result-box ${
            feedback.plate?.correct ? "correct" : "wrong"
          }`}
        >
          <p>Plaka: {feedback.plate?.value || "-"}</p>
          <span className="arrow">
            {feedback.plate?.correct
              ? "✔️"
              : feedback.plate?.direction === "up"
              ? "↑"
              : "↓"}
          </span>
        </div>
    
        {/* Bölge */}
        <div
          className={`result-box ${
            feedback.region?.correct ? "correct" : "wrong"
          }`}
        >
          <p>Bölge: {feedback.region?.value || "-"}</p>
          <span className="arrow">
            {feedback.region?.correct ? "✔️" : "❌"}
          </span>
        </div>
    
        {/* Nüfus */}
        <div
          className={`result-box ${
            feedback.population?.correct ? "correct" : "wrong"
          }`}
        >
          <p>Nüfus: {feedback.population?.value || "-"}</p>
          <span className="arrow">
            {feedback.population?.correct
              ? "✔️"
              : feedback.population?.direction === "up"
              ? "↑"
              : "↓"}
          </span>
        </div>
    
        {/* Şehir Harf Sayısı */}
        <div
          className={`result-box ${
            feedback.letterCount?.correct ? "correct" : "wrong"
          }`}
        >
          <p>Harf Sayısı: {feedback.letterCount?.value || "-"}</p>
          <span className="arrow">
            {feedback.letterCount?.correct
              ? "✔️"
              : feedback.letterCount?.direction === "up"
              ? "↑"
              : "↓"}
          </span>
        </div>
      </div>
    )}
    </div>
  );
};

export default App;
