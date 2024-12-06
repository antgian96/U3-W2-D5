import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function WeatherForecast({ forecast }) {
  if (!forecast) return null;

  return (
    <div>
    <h2 className="text-black">Previsioni meteo per le prossime ore</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
         {forecast.list.slice(0, 4).map((item, index) => (
        <Card border="warning" style={{ width: "18rem" }} key={index}>
          <Card.Body>
            <Card.Title>
              {new Date(item.dt * 1000).toLocaleString()}
            </Card.Title>
            <Card.Text >
              Previsioni per questa fascia oraria:
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item> <i class="bi bi-thermometer"><strong>Temperatura:</strong></i> {item.main.temp}°C</ListGroup.Item>
            <ListGroup.Item><strong>Descrizione:</strong> {item.weather[0]?.description}</ListGroup.Item>
            <ListGroup.Item><strong>Vento:</strong> {item.wind.speed} m/s</ListGroup.Item>
            <ListGroup.Item><strong>Umidità</strong> {item.main.humidity} m/s</ListGroup.Item>
          </ListGroup>
        </Card>

      ))}
    </div>
    </div>
  );
}

export default WeatherForecast;
