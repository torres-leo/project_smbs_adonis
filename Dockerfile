FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn", "dev" ]