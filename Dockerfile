FROM node:latest
WORKDIR /usr/app/mr-p
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9001
CMD ["node", "index.js"]