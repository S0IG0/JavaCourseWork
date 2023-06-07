FROM node:alpine3.17

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

RUN adduser --disabled-password service-user
USER service-user