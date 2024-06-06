#!/bin/bash

read -p "Enter the network name: " network_name
docker network create $network_name

# Start the database container with the created volume
docker run -d --name database-container --network $network_name \
  -v database-volume:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=db \
  mysql:latest

echo "Waiting for the database to start..."
while ! docker exec database-container mysqladmin --user=root --password=root --host "127.0.0.1" ping --silent &> /dev/null ; do
    sleep 2
    echo -n "."
done
echo "Database is ready!"

docker run -d --name restful-service-container --network $network_name -p 3000:3000 restful-service-image
