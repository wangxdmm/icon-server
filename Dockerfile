FROM mhart/alpine-node:16
LABEL low code platform icon server
USER 0
ENV NODE_EN production
COPY dist /
CMD node /dist/index.js