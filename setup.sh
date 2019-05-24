#! /bin/bash

docker-compose up -d --build
docker exec -it --user=root swan_jupyter bash -c "chmod +x /home/jovyan/run.sh && /home/jovyan/run.sh"