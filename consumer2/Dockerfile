# Use an official PHP runtime as a parent image
FROM php:7.4-apache

# Set the working directory in the container
WORKDIR /var/www/html

# Install PHP extensions and other dependencies
RUN apt-get update && \
    apt-get install -y librdkafka-dev 

RUN pecl install rdkafka \
    && docker-php-ext-enable rdkafka
# Copy your PHP application code into the container
COPY . .

# Expose the port Apache listens on
EXPOSE 80

# Start Apache when the container runs
CMD ["apache2-foreground"]
