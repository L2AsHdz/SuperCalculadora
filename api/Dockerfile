FROM node:erbium-alpine

RUN mkdir -p /app/api

WORKDIR /app/api

COPY . .

RUN npm install

EXPOSE 3001

CMD node src/app.js