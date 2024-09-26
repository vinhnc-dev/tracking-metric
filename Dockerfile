# syntax=docker/dockerfile:1

FROM node:18.12.1

ENV NODE_ENV=production

WORKDIR /app

# INSTALL SOURCE
RUN set -eux apk add --no-cache yarn
RUN yarn global add @nestjs/cli

COPY package*.json ./
COPY yarn.lock ./

RUN yarn
RUN yarn add source-map-support
# Copy source
COPY ./ ./

RUN yarn run build

EXPOSE 8888  


CMD [ "yarn", "start:dev" ]
