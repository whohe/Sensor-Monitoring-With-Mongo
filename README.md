
# Sensor Monitoring With MongoDB
Esta prueba consistió en crear un front-end en angular que consumiera los datos de una api manejada con nodejs que requiere datos de una nosql mongodb, adicionalmente agregamos dos ficheros docker para manejar el cargue de servicios y facilitar la tarea de despliegue del proyecto.

En una segunda oportunidad se abordo un enfoque de generación de datos a partir de un modelo de Aprendizaje Automático, se hizo una investigación acerca de los modelos disponibles y se concluyo que para este caso se requiere un modelo capaz de generar datos sintéticos o similares a los provistos, por ello una red GAN (Red Generativa Adversarial) es la mejor opción y por esto se diseño el modelo en un contenedor con acceso a la base de datos que hace de sembrador; posteriormente se ajusto el diseño gráfico para que actualice datos de los gráficos usando la API y que también actualice los gráficos en tiempo real. 

Este reto se realizo en un lapso de 24 horas

This test consisted of creating a front-end on Angular, that consumes data from an API managed with Node.js, which requires data from a NoSQL data base on MongoDB, additionally, we added two Docker files to manage the services upload and to facilitate the project’s deployment task. 

This challenge was carried out in a period of 24 hours


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
![Preview](demo.gif?raw=true "Example")
Revisar: [http://localhost:4200](http://localhost:4200)

