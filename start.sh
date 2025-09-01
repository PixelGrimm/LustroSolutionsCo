#!/bin/bash

# Get the port from Railway environment variable, default to 8080
PORT=${PORT:-8080}

echo "Starting PHP server on port $PORT"
echo "Current directory: $(pwd)"
echo "Files in directory: $(ls -la)"

# Wait a moment for the server to start
sleep 2

# Start PHP server with proper error handling
php -S 0.0.0.0:$PORT -t . &

# Store the server PID
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to be ready..."
sleep 5

# Check if server is running
if kill -0 $SERVER_PID 2>/dev/null; then
    echo "PHP server started successfully on port $PORT"
    echo "Server PID: $SERVER_PID"
    
    # Test if server is responding
    echo "Testing server response..."
    if curl -f http://localhost:$PORT/test.html > /dev/null 2>&1; then
        echo "Server is responding to HTTP requests"
    else
        echo "Server is not responding to HTTP requests"
    fi
    
    # Keep the script running
    wait $SERVER_PID
else
    echo "Failed to start PHP server"
    exit 1
fi
