import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential, Model
from tensorflow.keras.layers import Dense, LeakyReLU, BatchNormalization, Reshape, Flatten, Input
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import initializers
from pymongo import MongoClient
import threading
import time
from datetime import datetime, timedelta
import pytz

# Generador
def build_generator():
    generator = Sequential()
    generator.add(Dense(128, input_dim=100, kernel_initializer=initializers.RandomNormal(stddev=0.02)))
    generator.add(LeakyReLU(0.2))
    generator.add(BatchNormalization(momentum=0.8))
    generator.add(Dense(1, activation='linear'))
    return generator

# Discriminador
def build_discriminator():
    discriminator = Sequential()
    discriminator.add(Dense(128, input_dim=1, kernel_initializer=initializers.RandomNormal(stddev=0.02)))
    discriminator.add(LeakyReLU(0.2))
    discriminator.add(Dense(1, activation='sigmoid'))
    discriminator.compile(loss='binary_crossentropy', optimizer=Adam(lr=0.0002, beta_1=0.5))
    return discriminator

# GAN
def build_gan(generator, discriminator):
    discriminator.trainable = False
    gan_input = Input(shape=(100,))
    x = generator(gan_input)
    gan_output = discriminator(x)
    gan = Model(gan_input, gan_output)
    gan.compile(loss='binary_crossentropy', optimizer=Adam(lr=0.0002, beta_1=0.5))
    return gan

# Función para entrenar la GAN
def train_gan(generator, discriminator, gan, data):
    epochs = 1
    batch_size = 5000

    for epoch in range(epochs):
        noise = np.random.normal(0, 1, size=(batch_size, 100))
        generated_data = generator.predict(noise)
        idx = np.random.randint(0, data.shape[0], batch_size)
        real_data = data[idx]

        labels_real = np.ones((batch_size, 1))
        labels_fake = np.zeros((batch_size, 1))

        d_loss_real = discriminator.train_on_batch(real_data, labels_real)
        d_loss_fake = discriminator.train_on_batch(generated_data, labels_fake)

        d_loss = 0.5 * np.add(d_loss_real, d_loss_fake)

        noise = np.random.normal(0, 1, size=(batch_size, 100))
        labels_gan = np.ones((batch_size, 1))

        g_loss = gan.train_on_batch(noise, labels_gan)

    generated_values = generator.predict(noise)
    return generated_values

def meteorological_seeder():
    while True:
        try:
            meteorological = db['meteorological-sensors']
            meteorological_data = list(meteorological.find({}, {'_id': 0}))
            pressure = [e['pressure'] for e in meteorological_data]
            wind_speed = [e['wind_speed'] for e in meteorological_data]
            pressure = np.array(pressure)
            wind_speed = np.array(wind_speed)
            pressure_scaler = MinMaxScaler(feature_range=(0, 1))
            pressure_data = pressure_scaler.fit_transform(pressure.reshape(-1, 1))
            wind_speed_scaler = MinMaxScaler(feature_range=(0, 1))
            wind_speed_data = wind_speed_scaler.fit_transform(wind_speed.reshape(-1, 1))
            sintetical_pressure_data = pressure_scaler.inverse_transform(train_gan(generator, discriminator, gan, pressure_data)).flatten().tolist()
            sintetical_wind_speed_data = wind_speed_scaler.inverse_transform(train_gan(generator, discriminator, gan, wind_speed_data)).flatten().tolist()
            timeS = datetime.utcfromtimestamp(meteorological_data[-1]['timestamp'])
            timeS = timeS.replace(tzinfo=pytz.utc).astimezone(pytz.timezone('America/Bogota'))
            for i in range(len(sintetical_pressure_data)):
                timeS = timeS + timedelta(minutes=15)
                timestamp = timeS.timestamp()
                jsonDocument={'timestamp':timestamp,'pressure':sintetical_pressure_data[i],'wind_speed':sintetical_wind_speed_data[i]}
                meteorological.insert_one(jsonDocument)
                time.sleep(1)
        except Exception as e:
            print(f"Error inesperado: {e}")


def ambient_seeder():
    while True:
        try:
            ambient = db['ambient-sensors']
            ambient_data = list(ambient.find({}, {'_id': 0}))
            noise_level = [e['noise_level'] for e in ambient_data]
            air_quality = [e['air_quality'] for e in ambient_data]
            noise_level = np.array(noise_level)
            air_quality = np.array(air_quality)
            noise_level_scaler = MinMaxScaler(feature_range=(0, 1))
            noise_level_data = noise_level_scaler.fit_transform(noise_level.reshape(-1, 1))
            air_quality_scaler = MinMaxScaler(feature_range=(0, 1))
            air_quality_data = air_quality_scaler.fit_transform(air_quality.reshape(-1, 1))
            sintetical_noise_level_data = noise_level_scaler.inverse_transform(train_gan(generator, discriminator, gan, noise_level_data)).flatten().tolist()
            sintetical_air_quality_data = air_quality_scaler.inverse_transform(train_gan(generator, discriminator, gan, air_quality_data)).flatten().tolist()
            timeS = datetime.utcfromtimestamp(ambient_data[-1]['timestamp'])
            timeS = timeS.replace(tzinfo=pytz.utc).astimezone(pytz.timezone('America/Bogota'))
            for i in range(len(sintetical_air_quality_data)):
                timeS = timeS + timedelta(minutes=15)
                timestamp = timeS.timestamp()
                jsonDocument={'timestamp':timestamp,'noise_level':sintetical_noise_level_data[i],'air_quality':sintetical_air_quality_data[i]}
                ambient.insert_one(jsonDocument)
                time.sleep(1)
        except Exception as e:
            print(f"Error inesperado: {e}")

def weather_seeder():
    while True:
        try:
            weather = db['weather-sensors']
            weather_data = list(weather.find({}, {'_id': 0}))
            temperature = [e['temperature'] for e in weather_data]
            humidity = [e['humidity'] for e in weather_data]
            temperature = np.array(temperature)
            humidity = np.array(humidity)
            temperature_scaler = MinMaxScaler(feature_range=(0, 1))
            temperature_data = temperature_scaler.fit_transform(temperature.reshape(-1, 1))
            humidity_scaler = MinMaxScaler(feature_range=(0, 1))
            humidity_data = humidity_scaler.fit_transform(humidity.reshape(-1, 1))
            sintetical_temperature_data = temperature_scaler.inverse_transform(train_gan(generator, discriminator, gan, temperature_data)).flatten().tolist()
            sintetical_humidity_data = humidity_scaler.inverse_transform(train_gan(generator, discriminator, gan, humidity_data)).flatten().tolist()
            timeS = datetime.utcfromtimestamp(weather_data[-1]['timestamp'])
            timeS = timeS.replace(tzinfo=pytz.utc).astimezone(pytz.timezone('America/Bogota'))
            for i in range(len(sintetical_humidity_data)):
                timeS = timeS + timedelta(minutes=15)
                timestamp = timeS.timestamp()
                jsonDocument={'timestamp':timestamp,'temperature':sintetical_temperature_data[i],'humidity':sintetical_humidity_data[i]}
                weather.insert_one(jsonDocument)
                time.sleep(1)
        except Exception as e:
            print(f"Error inesperado: {e}")


client = MongoClient('mongodb://root:secret@db:27017/monitoring-sensor-data?authSource=admin&readPreference=primary&appname=PyML&directConnection=true&ssl=false')
db=client['monitoring-sensor-data']


# Construye y entrena la GAN
generator = build_generator()
discriminator = build_discriminator()
gan = build_gan(generator, discriminator)

meteorological_seeder_1 = threading.Thread(target=meteorological_seeder)
ambient_seeder_1 = threading.Thread(target=ambient_seeder)
weather_seeder_1 = threading.Thread(target=weather_seeder)

meteorological_seeder_1.start()
ambient_seeder_1.start()
weather_seeder_1.start()
