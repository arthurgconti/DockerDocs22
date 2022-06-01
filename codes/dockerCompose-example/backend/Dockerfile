FROM node
WORKDIR /server-example
COPY package.json .
ADD *.js ./
ADD .env .
COPY prisma/* ./prisma/
COPY controller/* ./controller/
EXPOSE 3333

RUN npm install --production
RUN ["npx","prisma","generate"]
CMD ["npm","start"]
