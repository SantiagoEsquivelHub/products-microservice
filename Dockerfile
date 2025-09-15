FROM node:21-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Remove any existing generated client that might be for the wrong platform
RUN rm -rf generated/prisma

EXPOSE 3001