# Sensor Monitoring With MongoDB
Esta prueba consistió en crear un front-end en angular que consumiera los datos de una api manejada con nodejs que requiere datos de una nosql mongodb, adicionalmente agregamos dos ficheros docker para manejar el cargue de servicios y facilitar la tarea de despliegue del proyecto.

Este reto se realizo en un lapso de 8 horas

This test consisted of creating a front-end on Angular, that consumes data from an API managed with Node.js, which requires data from a NoSQL data base on MongoDB, additionally, we added two Docker files to manage the services upload and to facilitate the project’s deployment task. 

This challenge was carried out in a period of 8 hours


## Instalacion – Installation 

Docker y docker-compose serian los requisitos para poner en marcha este proyecto, por lo que es importante instalarlos previamente

Docker and Docker-compose are required to run this project, so please install them first. 

```bash
apt install -y docker docker-compose git 
```

## Despliegue – Deployment

```bash 
git clone https://github.com/whohe/Sensor-Monitoring-With-Mongo
cd Sensor-Monitoring-With-Mongo
docker-compose up -d
```
![Preview](example.gif?raw=true "Example")
Revisar: [http://localhost:4200](http://localhost:4200)
