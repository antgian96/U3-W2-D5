import React from "react";
import { Card, ListGroup,  } from "react-bootstrap";

function WeatherCard({ weather, cityImage, city }) {
  if (!weather) return null;

  return (
    <div>
      <h2 className="text-white">Ora</h2>
    <Card border="warning" style={{ width: "18rem", margin: "10px auto" }}>
    {/* Immagine della città */}
    {cityImage && <Card.Img variant="top" src={cityImage} alt={`Immagine di ${city}`} />}
    <Card.Body>
      <Card.Title>{city}</Card.Title>
      
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item><strong>Descrizione:</strong> {weather.weather[0]?.description}</ListGroup.Item>
      <ListGroup.Item><strong>Pressione:</strong> {weather.main.pressure} hPa</ListGroup.Item>
      <ListGroup.Item><strong>Temperatura:</strong> {weather.main.temp}°C</ListGroup.Item>
      <ListGroup.Item><strong>Umidità:</strong> {weather.main.humidity}%</ListGroup.Item>
      <ListGroup.Item><strong>Vento:</strong> {weather.wind.speed} m/s</ListGroup.Item>
    </ListGroup>
  </Card>
  </div>
  );
}

export default WeatherCard;
