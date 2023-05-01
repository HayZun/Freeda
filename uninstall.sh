#!/bin/bash

# Stop and remove all containers
docker image prune -f
docker compose down

#remove image containers backend and frontend
docker rmi app-backend
docker rmi app-frontend