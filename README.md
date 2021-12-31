# Gnomebot

Gnomebot started as a silly discord bot I created to prank my friends and slowly snowballed into a feature-rich discord bot.

## Commands

**ascii** - Replies with a random ascii gnome.<br>
**help** - Replies with list of commands and their descriptions.<br>
**source** - Replies with a link to source repository.<br>
**woo** - Gnomebot joins your voice channel and says 'woo'.<br>
**power** - Gnomebot joins your voice channel and plays 'GNOME POWER'.<br>
**chess** - Play Gnomebot in chess using [chess.js](https://github.com/jhlywa/chess.js).<br>

### Future Commands:

**translate** - Translates text using Google Cloud Translation API.<br>
**checkvideo** - Checks to see if a video contains gnomes.<br>
**script** - Ability to run gnomescripts (We'll see).<br>

## Triggers

### Text Channels
- For each message that matches `/.*g.*n.*o.*m.*e.*/`, gnomebot will repond with:

```
⣿⠿⠋⠉⠄⠄⠄⠄⠄⠉⠙⢻⣿
⣿⣿⣿⣿⣿⣿⢋⠄⠐⠄⠐⠄⠠⠈⠄⠂⠠⠄⠈⣿
⣿⣿⣿⣿⣿⡟⠄⠄⠄⠁⢀⠈⠄⠐⠈⠄⠠⠄⠁⠈⠹
⣿⣿⣿⣿⣿⣀⡀⡖⣖⢯⢮⢯⡫⡯⢯⡫⡧⣳⡣⣗⣼
⣿⣿⣿⣿⣷⣕⢱⢻⢮⢯⢯⡣⣃⣉⢪⡪⣊⣀⢯⣺⣺
⣿⣿⣿⣿⣿⣷⡝⣜⣗⢽⢜⢎⢧⡳⡕⡵⡱⣕⡕⡮⣾
⣿⣿⣿⣿⣿⡿⠓⣕⢯⢮⡳⣝⣕⢗⡭⣎⢭⠮⣞⣽⡺
⣿⣿⣿⡿⠋⠄⠄⠸⣝⣗⢯⣳⢕⣗⡲⣰⡢⡯⣳⣳⣫
⣿⣿⠋⠄⠄⠄⠄⠄⠘⢮⣻⣺⢽⣺⣺⣳⡽⣽⣳⣳⠏⠛⠛⠛⢿
⣿⠇⠄⢁⠄⠄⠄⠁⠄⠈⠳⢽⢽⣺⢞⡾⣽⣺⣞⠞⠄⠄⠈⢄⢎⡟⣏⢯⢝⢛⠿
⡇⠄⡧⣣⢢⢔⢤⢢⢄⠂⠄⠄⠁⠉⠙⠙⠓⠉⠈⢀⠄⠄⠄⠑⢃⣗⢕⣕⢥⡣⣫⢽
⣯⠄⢽⢸⡪⡪⡣⠲⢤⠄⠄⠂⠄⠄⠄⡀⠄⠠⠐⠄⣶⣤⣬⣴⣿⣿⣷⡹⣿⣿⣾⣿
⣿⣶⣾⣵⢱⠕⡕⡱⠔⠄⠁⢀⠠⠄⠄⢀⠄⠄⢀⣾
⣿⣿⣿⣿⡷⡗⠬⡘⠂⠄⠈⠄⠄⠄⠈⠄⠄⠄⢸
⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶
⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶
⣿⣿⣿⣿⣿⣿⣧⢁⠂⠔⠠⠈⣾⠄⠂⠄⡁⢲
⣿⣿⣿⣿⣿⣿⠿⠠⠈⠌⠨⢐⡉⠄⠁⡂⠔⠼
⣿⣿⣿⣿⣿⣿⡆⠈⠈⠈⠄⠂⣆⠄⠄⠄⠄⣼
⣿⣿⣿⣿⣿⣿⣿⠄⠁⠈⠄⣾⡿⠄⠄⠂⢸
⣿⣿⣿⣿⣿⣿⡟⠄⠄⠁⠄⠻⠇⠄⠐⠄⠄⠈⠙⢻
⣿⣿⣿⣿⣿⣿⡇⡀⠄⠂⠁⢀⠐⠄⣥⡀⠁⢀⠄⣿
```

### Voice Channels
- Upon entering a voice channel, there is a 4% chance gnomebot will join and deliver a delightful "woo!" to those in the voice channel, leaving shortly after.<br>
- If you become impatient, you can type `!gnome woo` and gnomebot will perform the same action on command. You must be in a voice channel for this feature to work.<br>
- Users with the Administrator permission can type `!gnome woo <voice channel id>` to prank their friends without the need to be in a voice channel.

## Development

### Prereqresites
- [Node.js](https://github.com/nvm-sh/nvm#installing-and-updating) (16.13.1)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Docker](https://docs.docker.com/get-docker/) (Optional, but recommended)
- [Discord Bot](https://www.discord.com/developers) (With access to token)

### Environment
Create a `.env` file using `.env-example` as a template.

### Run Docker Development Server
```sh
yarn run docker
```

## References
- <a href="https://discord.js.org/#/" target="_blank">discord.js</a><br>
- <a href="https://github.com/jhlywa/chess.js" target="_blank">chess.js</a><br>
- <a href="https://github.com/andyruwruw/chess-image-generator" target="_blank">chess-image-generator</a> 
(<a href="https://github.com/hadley31/chess-image-generator" target="_blank">My Fork</a>)<br>

