FROM node:14.15.3
WORKDIR /app
COPY . .

RUN npm ci

CMD ["npm", "run", "start"]
