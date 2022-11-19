FROM mhart/alpine-node:16
LABEL low code platform icon server
USER 0
ADD dist /icon-server/dist
CMD echo "ENV=production" > /icon-server/.env && node /icon-server/dist/index.js
