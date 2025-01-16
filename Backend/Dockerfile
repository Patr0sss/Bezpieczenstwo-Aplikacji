FROM node:latest

WORKDIR /app

ARG PORT= 5050
ENV PORT $PORT

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .


EXPOSE $PORT 
CMD ["npm", "start"]

