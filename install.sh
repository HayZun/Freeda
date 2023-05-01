#!/bin/bash

# Get the IP address of the host
ip_address=$(ip addr | awk '/state UP/ {print $2}' | grep -E '^en|^wl' | xargs -I{} sh -c 'ip addr show {} | grep -oP "(?<=inet\s)\d+(\.\d+){3}"')

# Replace the value of BACKEND_HOST with the IP address
sed -i "s/BACKEND_HOST=.*/BACKEND_HOST=$ip_address/g" .env

# Start the containers
docker compose up --build -d

# Stop and remove all containers
docker image prune -f

clear

#display application name with big characters ASCII art font, the name of application is freeda
echo """
                        ______ _____  ______ ______ _____          
                        |  ____|  __ \|  ____|  ____|  __ \   /\    
                        | |__  | |__) | |__  | |__  | |  | | /  \   
                        |  __| |  _  /|  __| |  __| | |  | |/ /\ \  
                        | |    | | \ \| |____| |____| |__| / ____ \ 
                        |_|    |_|  \_\______|______|_____/_/    \_\


"""

# Display a nice message with the IP address and port
echo "****************************************************************************************"
echo "*                                                                                      *"
echo "*                ✨   Application is running on http://$ip_address:3000   ✨           *"
echo "*                                                                                      *"
echo "****************************************************************************************"

