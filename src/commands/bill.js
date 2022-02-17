import logger from "../utilities/logger.js"
import { playSound } from "../utilities/discord.js"
import ytdl from "ytdl-core"
import { closestMatch } from 'closest-match'
import fetch from 'node-fetch'
import _ from 'lodash'


export default {
  name: "bill",
  desc: "Gnomebot will join your voice channel and play a bill wurtz song",
  /**
   * @param {import('discord.js').CommandInteraction} interaction
   */
  async execute(interaction) {
    const song = interaction.options.getString('title')
    const volume = interaction.options.getInteger('volume', false) || 30
    const volumePercent = volume / 100.0

    const userVoiceChannel = interaction.member.voice?.channel

    if (!userVoiceChannel) {
      return interaction.reply({ content: 'You must be in a voice channel!', ephemeral: true })
    }

    const songs = await getSongs()

    const closestMatchingSong = closestMatch(song, Object.keys(songs))

    const videoId = songs[closestMatchingSong]
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    const stream = ytdl(videoUrl, { filter: 'audioonly' })

    playSound(userVoiceChannel, stream, { volume: volumePercent })

    return interaction.reply(`**Now playing**: \`${closestMatchingSong}\` by Bill Wurtz in ${userVoiceChannel}`)
  }
}


const getSongs = async () => {
  logger.debug('Loading bill wurtz songs...')
  const { YOUTUBE_API_KEY } = process.env
  const playlistId = 'PLo7FOXNe7Yt8xXI3qYIualWNtIKlkeMlE'
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`
  const result = await fetch(url)

  if (!result.ok) {
    logger.error('Unable to get songs list')
    return {}
  }

  const data = await result.json()

  const songs = {}

  for (const item of data.items) {
    songs[item.snippet.title] = item.contentDetails.videoId
  }

  return songs
}
