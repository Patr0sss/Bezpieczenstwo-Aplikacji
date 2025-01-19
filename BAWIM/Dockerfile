FROM node:latest
WORKDIR /app


RUN npm install  yarn
COPY package.json .
RUN yarn

COPY . .

EXPOSE 5173

CMD ["yarn","dev", "--host"]