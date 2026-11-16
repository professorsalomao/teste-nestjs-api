FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

COPY certs ./certs

ENV NODE_ENV=production
ENV PORT=3005

EXPOSE 3005

CMD ["npm", "run", "start:prod"]
