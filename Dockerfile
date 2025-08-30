FROM php:8.1-cli

# Install PHP extensions
RUN docker-php-ext-install curl mbstring

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Expose port
EXPOSE 8080

# Start PHP server
CMD ["php", "-S", "0.0.0.0:8080"]
