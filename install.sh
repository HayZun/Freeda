#!/bin/bash


# Fonction pour afficher le menu et demander à l'utilisateur de choisir une interface
select_interface() {
    echo "Veuillez choisir une interface pour la configuration de l'application :"
    select interface_name in $(ifconfig -s | awk '$1 ~ /^wl|^en/ {print $1}')
    do
        if [ -n "$interface_name" ]; then
            ip_address=$(ifconfig $interface_name 2>/dev/null | grep -m 1 'inet ' | awk '{print $2}')
            if [ -z "$ip_address" ]; then
                echo "L'interface $interface_name n'a pas d'adresse IP."
            else
                # Vérifier si l'interface est active
                interface_status=$(cat /sys/class/net/$interface_name/operstate 2>/dev/null)
                if [ "$interface_status" == "up" ]; then
                    echo "L'adresse IP pour accéder à l'application est $ip_address."
                    return
                else
                    echo "L'interface $interface_name est désactivée."
                fi
            fi
        else
            echo "Choix invalide. Veuillez réessayer."
        fi
    done
}

# Appeler la fonction pour sélectionner une interface
select_interface

# Replace the value of BACKEND_HOST with the IP address
sed -i "s/BACKEND_HOST=.*/BACKEND_HOST=$ip_address/g" .env

# Start the containers
docker-compose up --build -d

# Stop and remove all containers
docker image prune -f

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

