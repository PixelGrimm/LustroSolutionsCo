FROM php:8.1-cli

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Make startup script executable
RUN chmod +x start.sh

# Expose port
EXPOSE 8080

# Start PHP server using the startup script
CMD ["./start.sh"]
