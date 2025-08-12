FROM node:18

ENV MONGO_DB_USERNAME=deep_admin
ENV MONGO_DB_PASSWORD=deep_password

WORKDIR /deep/nodeapp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["node", "server.js"]
