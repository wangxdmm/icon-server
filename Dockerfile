FROM mhart/alpine-node:16
LABEL low code platform icon server
USER 0
ENV NODE_ENV=production
ADD dist /icon-server/dist
ADD .env.production /icon-server/
CMD node /icon-server/dist/index.js
