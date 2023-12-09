#!/bin/ash

STATE_FILE=".npmupdate"

# Verificar si el archivo de estado existe
if [ ! -f "$STATE_FILE" ]; then
    echo "Ejecutando npm update por primera vez..."
    npm update

    # Crear el archivo de estado para indicar que npm update ya se ejecutó
    touch "$STATE_FILE"
else
    echo "npm update ya se ha ejecutado previamente. Omitiendo..."
fi
npm start
