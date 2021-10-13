FROM node:erbium-alpine

RUN mkdir -p /app/worker

WORKDIR /app/worker

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3002

CMD npm run dev