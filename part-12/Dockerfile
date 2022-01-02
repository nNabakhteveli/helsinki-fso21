FROM node:17

USER node

WORKDIR /usr/src/app

COPY --chown=node:node . .

COPY ./express .

CMD DEBUG=playground:* npm start
