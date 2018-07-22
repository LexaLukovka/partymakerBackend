FROM node:10
WORKDIR /opt/app
COPY package.json /opt/app


RUN npm install

COPY . /opt/app

CMD node server.js

EXPOSE 3333
