FROM node:16.13.1

WORKDIR /app

RUN apt update && apt install ffmpeg -y

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . .

CMD ["yarn", "run", "start"]
