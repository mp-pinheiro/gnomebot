FROM node:18

WORKDIR /app

RUN apt update && apt install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev libsodium-dev ffmpeg -y

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile

COPY . .

CMD ["yarn", "run", "start"]
