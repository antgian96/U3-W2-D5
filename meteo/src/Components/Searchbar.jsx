import React, { useState } from "react";
import { FloatingLabel, Form, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherCard from "./WeatherCard"
import WeatherForecast from "./WeatherForecast";

function Searchbar() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [cityImage, setCityImage] = useState("");

  const PEXELS_API_KEY = "XEfrxzxljDAqFwzQfl6vjylOg2J01m5tQXm4PIQSau6ywA5K0pzNvGlt";

  const handleChange = (e) => setCity(e.target.value);

  const getWeather = async () => {
    if (city === "") return;

    const apiKey = "4188706688c5a57992569ea94308af64";
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

    try {
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=it`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=it`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();
        setForecast(forecastData);

        const pexelsUrl = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;
        const pexelsResponse = await fetch(pexelsUrl, {
          headers: { Authorization: PEXELS_API_KEY },
        });
        const pexelsData = await pexelsResponse.json();
        setCityImage(pexelsData.photos?.[0]?.src.large || "");
      } else {
        throw new Error("Città non trovata.");
      }
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
      setCityImage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1 className="text-black">Previsioni Meteo</h1>

      <Container>
        <Row className="align-items-center">
          <Col xs="auto">
            <Button variant="light" type="submit" onClick={handleSubmit}>
              Cerca
            </Button>
          </Col>
          <Col>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingCity"
                label="Inserisci il nome della città"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={city}
                  onChange={handleChange}
                  placeholder="Inserisci il nome della città"
                />
              </FloatingLabel>
            </Form>
          </Col>
        </Row>
      </Container>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <WeatherCard weather={weather} cityImage={cityImage} city={city} />
      <WeatherForecast forecast={forecast} />
    </div>
  );
}

export default Searchbar;
