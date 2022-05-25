FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN rm -r node_modules
RUN npm i --only:prod

CMD ["npm", "start"]