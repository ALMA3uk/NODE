FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --omit=optional --no-audit --no-fund --no-update-notifier

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]