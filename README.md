# Prueba técnica para Rocketfy
Esta prueba consistió en crear un front-end en angular que consumiera los datos de una api manejada con nodejs que requiere datos de una nosql mongodb, adicionalmente agregamos dos ficheros docker para manejar el cargue de servicios y facilitar la tarea de despliegue del proyecto.

## Instalacion

Docker y docker-compose serian los requisitos para poner en marcha este proyecto, por lo que es importante instalarlos previamente

```bash
apt install -y docker docker-compose git 
```

## Despliegue 

```bash 
git clone https://github.com/whohe/pruebaTecnicaRocketfy
cd pruebaTecnicaRocketfy
docker-compose up -d
```
![Preview](example.gif?raw=true "Example")
Revisar: [http://localhost:4200](http://localhost:4200)
