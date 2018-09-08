#!/bin/bash
docker-compose down
git reset --hard origin/master
git pull origin master
yarn boot
docker-compose build backend
docker-compose up -d
