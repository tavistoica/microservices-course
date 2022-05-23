FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install --only=prod
RUN npm run build
COPY . .

CMD ["npm", "start"]