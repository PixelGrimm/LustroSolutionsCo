#!/bin/bash

# Get the port from Railway environment variable, default to 8080
PORT=${PORT:-8080}

echo "Starting Container"
echo "Current directory: $(pwd)"
echo "Files in directory:"
ls -la

echo "No external dependencies required"

echo "Waiting for server to be ready..."

# Start PHP server
php -S 0.0.0.0:$PORT -t . &
SERVER_PID=$!

echo "PHP server started successfully on port $PORT"
echo "Server PID: $SERVER_PID"

# Wait a bit for server to start
sleep 5

# Test if server is responding
if kill -0 $SERVER_PID 2>/dev/null; then
    echo "Server is responding to HTTP requests"
else
    echo "Server failed to start"
    exit 1
fi

# Wait for server process
wait $SERVER_PID
