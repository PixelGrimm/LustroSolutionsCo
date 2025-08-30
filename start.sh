#!/bin/bash

# Get the port from Railway environment variable, default to 8080
PORT=${PORT:-8080}

echo "Starting PHP server on port $PORT"

# Start PHP server
php -S 0.0.0.0:$PORT
