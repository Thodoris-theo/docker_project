#!/bin/bash

docker build -t restful-service-image .

docker volume create database-volume
