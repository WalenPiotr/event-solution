FROM node:12.2.0-alpine as build
COPY . /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
CMD ["npm", "run", "start"]