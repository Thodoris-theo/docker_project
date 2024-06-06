#!/bin/bash

docker stop database-container restful-service-container
docker rm database-container restful-service-container

read -p "Enter the network name: " network_name
docker network rm $network_name
