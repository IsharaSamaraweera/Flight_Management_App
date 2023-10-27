const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const flights = [];

app.use(express.json());

app.get('/flights', (req, res) => {
  res.json({ flights });
});

app.post('/flights', (req, res) => {
  const { flightNumber, destination, departureTime } = req.body;

  if (!flightNumber || !destination || !departureTime) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  const newFlight = {
    flightNumber,
    destination,
    departureTime,
  };

  flights.push(newFlight);

  res.status(201).json({ message: 'Flight added successfully' });
});

app.put('/flights/:flightNumber', (req, res) => {
  const { flightNumber } = req.params;
  const { destination, departureTime } = req.body;

  const flightIndex = flights.findIndex((flight) => flight.flightNumber === flightNumber);

  if (flightIndex === -1) {
    return res.status(404).json({ error: 'Flight not found' });
  }

  flights[flightIndex] = {
    flightNumber,
    destination: destination || flights[flightIndex].destination,
    departureTime: departureTime || flights[flightIndex].departureTime,
  };

  res.json({ message: 'Flight updated successfully' });
});

app.delete('/flights/:flightNumber', (req, res) => {
  const { flightNumber } = req.params;

  const flightIndex = flights.findIndex((flight) => flight.flightNumber === flightNumber);

  if (flightIndex === -1) {
    return res.status(404).json({ error: 'Flight not found' });
  }

  flights.splice(flightIndex, 1);

  res.json({ message: 'Flight deleted successfully' });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Flight Management Application.');
});  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});