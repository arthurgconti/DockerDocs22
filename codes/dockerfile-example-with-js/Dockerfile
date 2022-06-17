FROM node
WORKDIR /server-example
COPY package.json .
ADD server.js .
EXPOSE 3333

RUN npm install --production
CMD ["npm","start"]
