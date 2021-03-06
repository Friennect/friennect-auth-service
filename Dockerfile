FROM node:10-alpine
COPY src ./src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:unix
ENTRYPOINT [ "npm", "run", "demo:prod" ]