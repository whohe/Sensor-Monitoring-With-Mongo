const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
	origin: '*'
}));

// Conexión a MongoDB
mongoose.connect('mongodb://root:secret@db:27017/monitoring-sensor-data?authSource=admin&readPreference=primary&appname=LogicExpress&directConnection=true&ssl=false')

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

function standard_deviation(list){
  const avg = list.reduce((sum, num) => sum + num, 0) / list.length;
  const sum_squares_difference = list.reduce((sum, num) => sum + Math.pow(num - avg, 2), 0);
  const variance = sum_squares_difference / list.length;
  return Math.sqrt(variance);
}

app.get('/weather', async (req, res) => {
	try {
		const items = await Weather.find({}, {_id: 0});
		const temperature = items.map(object => object.temperature);
		const humidity = items.map(object => object.humidity);
		const avg_temperature = temperature.reduce((a, b) => a + b, 0)/temperature.length
		const avg_humidity = humidity.reduce((a, b) => a + b, 0)/humidity.length
		const temperature_standard_deviation = standard_deviation(temperature)
		const humidity_standard_deviation = standard_deviation(humidity)
		const data_analysis = {
			'humidity_average': avg_humidity, 
			'temperature_average': avg_temperature,
			'temperature_standard_deviation': temperature_standard_deviation,
			'humidity_standard_deviation': humidity_standard_deviation,
		}
		const response = {'data': items.slice(-6), 'data-analysis': data_analysis}
		res.json(response);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/meteorological', async (req, res) => {
	try {
		const items = await Meteorological.find({}, {_id: 0});
		const pressure = items.map(object => object.pressure);
		const wind_speed = items.map(object => object.wind_speed);
		const avg_wind_speed = wind_speed.reduce((a, b) => a + b, 0)/wind_speed.length
		const avg_pressure = pressure.reduce((a, b) => a + b, 0)/pressure.length
		const pressure_standard_deviation = standard_deviation(pressure)
		const wind_speed_standard_deviation = standard_deviation(wind_speed)
		const data_analysis = {
			'pressure_average': avg_pressure, 
			'wind_speed_average': avg_wind_speed,
			'wind_speed_standard_deviation': wind_speed_standard_deviation,
			'pressure_standard_deviation': pressure_standard_deviation,
		}
		const response = {'data': items.slice(-6), 'data-analysis': data_analysis}
		res.json(response);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

app.get('/ambient', async (req, res) => {
	try {
		const items = await Ambient.find({}, {_id: 0});
		const air_quality = items.map(object => object.air_quality);
		const noise_level = items.map(object => object.noise_level);
		const avg_air_quality = air_quality.reduce((a, b) => a + b, 0)/air_quality.length
		const avg_noise_level = noise_level.reduce((a, b) => a + b, 0)/noise_level.length
		const air_quality_standard_deviation = standard_deviation(air_quality)
		const noise_level_standard_deviation = standard_deviation(noise_level)
		const data_analysis = {
			'air_quality_average': avg_air_quality, 
			'noise_level_average': avg_noise_level,
			'air_quality_standard_deviation': air_quality_standard_deviation,
			'noise_level_standard_deviation': noise_level_standard_deviation,
		}
		const response = {'data': items.slice(-6), 'data-analysis': data_analysis}
		res.json(response);
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
