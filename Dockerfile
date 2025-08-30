FROM php:8.1-cli

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Expose port
EXPOSE 8080

# Start PHP server
CMD ["php", "-S", "0.0.0.0:8080"]
