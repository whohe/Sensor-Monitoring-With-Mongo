const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
	origin: '*'
}));

// Conexión a MongoDB
mongoose.connect('mongodb://root:secret@db:27017/monitoring-sensor-data?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));

db.once('open', () => {
	console.log('Conexión exitosa a MongoDB');
});


const WeatherSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
});

const MeteorologicalSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  pressure: { type: Number, required: true },
  wind_speed: { type: Number, required: true },
});

const AmbientSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  noise_level: { type: Number, required: true },
  air_quality: { type: Number, required: true },
});

const Weather = mongoose.model('weather-sensors', WeatherSchema);
const Meteorological = mongoose.model('meteorological-sensors', MeteorologicalSchema);
const Ambient = mongoose.model('ambient-sensors', AmbientSchema);

// Middleware para parsear JSON
app.use(express.json());

app.get('/weather', async (req, res) => {
	try {
		const items = await Weather.find();
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/meteorological', async (req, res) => {
	try {
		const items = await Meteorological.find();
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/ambient', async (req, res) => {
	try {
		const items = await Ambient.find();
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Ruta para crear un nuevo elemento
/*
app.post('/items', async (req, res) => {
	const newItem = new Item({ name: req.body.name });
	try {
		const savedItem = await newItem.save();
		res.json(savedItem);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});*/


// Iniciar el servidor
app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
});
