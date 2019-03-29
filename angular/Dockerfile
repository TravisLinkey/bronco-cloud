FROM node:8-alpine AS builder
ENV NPM_CONFIG_LOGLEVEL warn
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN apk add --no-cache make gcc g++ python git && \
    npm install && \
    npm cache clean --force && \
    apk del make gcc g++ python git
COPY . /usr/src/app/
RUN npm run build

FROM node:8-alpine
ENV NPM_CONFIG_LOGLEVEL warn
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN apk add --no-cache make gcc g++ python git && \
    npm install --production -g pm2 && \
    npm install --production && \
    npm cache clean --force && \
    apk del make gcc g++ python git
COPY . /usr/src/app/
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
EXPOSE 6001
CMD [ "pm2-docker", "node", "--", "app.js" ]