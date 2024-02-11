#!/bin/bash

# Stop and remove all containers
docker image prune -f
docker-compose down

#remove image containers backend and frontend
docker rmi freeda_backend
docker rmi freeda_frontend