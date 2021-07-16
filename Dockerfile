FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN apt update
RUN apt install ffmpeg -y
COPY package*.json ./

ENV NODE_ENV=production
RUN npm install --production

# Setup env vars
ARG DISCORD_AUTH_TOKEN
RUN touch .env
RUN echo "DISCORD_AUTH_TOKEN=${DISCORD_AUTH_TOKEN}" >> .env

# Bundle app source
COPY . .

RUN chmod +x gnome.sh
CMD [ "bash", "gnome.sh" ]