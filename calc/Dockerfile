FROM node:erbium-alpine

RUN mkdir -p /app/calc

WORKDIR /app/calc

COPY . .

RUN npm install

EXPOSE 3000

CMD npm start