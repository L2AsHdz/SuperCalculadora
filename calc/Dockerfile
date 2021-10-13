FROM node:erbium-alpine

RUN mkdir -p /app/calc

WORKDIR /app/calc

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD npm run dev