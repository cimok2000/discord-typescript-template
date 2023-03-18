FROM node:16

WORKDIR /usr/src/discord-bot-template

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "run", "prod" ]