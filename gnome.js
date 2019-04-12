const Discord = require('discord.js');
const auth = require('./auth.json');
const fs = require('fs');

const client = new Discord.Client();

const ascii_gnome = '⣿⠿⠋⠉⠄⠄⠄⠄⠄⠉⠙⢻⣿\n⣿⣿⣿⣿⣿⣿⢋⠄⠐⠄⠐⠄⠠⠈⠄⠂⠠⠄⠈⣿\n⣿⣿⣿⣿⣿⡟⠄⠄⠄⠁⢀⠈⠄⠐⠈⠄⠠⠄⠁⠈⠹\n⣿⣿⣿⣿⣿⣀⡀⡖⣖⢯⢮⢯⡫⡯⢯⡫⡧⣳⡣⣗⣼\n⣿⣿⣿⣿⣷⣕⢱⢻⢮⢯⢯⡣⣃⣉⢪⡪⣊⣀⢯⣺⣺\n⣿⣿⣿⣿⣿⣷⡝⣜⣗⢽⢜⢎⢧⡳⡕⡵⡱⣕⡕⡮⣾\n⣿⣿⣿⣿⣿⡿⠓⣕⢯⢮⡳⣝⣕⢗⡭⣎⢭⠮⣞⣽⡺\n⣿⣿⣿⡿⠋⠄⠄⠸⣝⣗⢯⣳⢕⣗⡲⣰⡢⡯⣳⣳⣫\n⣿⣿⠋⠄⠄⠄⠄⠄⠘⢮⣻⣺⢽⣺⣺⣳⡽⣽⣳⣳⠏⠛⠛⠛⢿\n⣿⠇⠄⢁⠄⠄⠄⠁⠄⠈⠳⢽⢽⣺⢞⡾⣽⣺⣞⠞⠄⠄⠈⢄⢎⡟⣏⢯⢝⢛⠿\n⡇⠄⡧⣣⢢⢔⢤⢢⢄⠂⠄⠄⠁⠉⠙⠙⠓⠉⠈⢀⠄⠄⠄⠑⢃⣗⢕⣕⢥⡣⣫⢽\n⣯⠄⢽⢸⡪⡪⡣⠲⢤⠄⠄⠂⠄⠄⠄⡀⠄⠠⠐⠄⣶⣤⣬⣴⣿⣿⣷⡹⣿⣿⣾⣿\n⣿⣶⣾⣵⢱⠕⡕⡱⠔⠄⠁⢀⠠⠄⠄⢀⠄⠄⢀⣾\n⣿⣿⣿⣿⡷⡗⠬⡘⠂⠄⠈⠄⠄⠄⠈⠄⠄⠄⢸\n⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶\n⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶\n⣿⣿⣿⣿⣿⣿⣧⢁⠂⠔⠠⠈⣾⠄⠂⠄⡁⢲\n⣿⣿⣿⣿⣿⣿⠿⠠⠈⠌⠨⢐⡉⠄⠁⡂⠔⠼\n⣿⣿⣿⣿⣿⣿⡆⠈⠈⠈⠄⠂⣆⠄⠄⠄⠄⣼\n⣿⣿⣿⣿⣿⣿⣿⠄⠁⠈⠄⣾⡿⠄⠄⠂⢸\n⣿⣿⣿⣿⣿⣿⡟⠄⠄⠁⠄⠻⠇⠄⠐⠄⠄⠈⠙⢻\n⣿⣿⣿⣿⣿⣿⡇⡀⠄⠂⠁⢀⠐⠄⣥⡀⠁⢀⠄⣿';


client.on('ready', function (evt) {
    logMessage(`Client connected.\nLogged in as: ${getUserNameID(client.user)}`);
});


client.on('disconnect', function (evt) {
    logMessage('Client disconnected.');
});


client.on('message', info => {
    if (!info.guild) return;

    let message = info.content;
    if (message.toLowerCase() === 'hello me ol chum') {
        if (info.member.voice.channel) {
            woo(info.member.voice);
        } else {
            info.reply('you are not in a voice channel!');
        }

        printMessage(info);
    } else if (message.toLowerCase().includes('gnome')) {
        info.channel.send(ascii_gnome);
        printMessage(info);
    }
});


// Called when anything about a user's voice state changes (i.e. mute, unmute, join,leave,change channel, etc.)
client.on('voiceStateUpdate', (os, ns) => {
    if (!ns.channel) return;
    let member = ns.member;

    if (member.user.id === client.user.id) return;

    if (Math.random() > 0.04) return;

    if (os.channelID === ns.channelID) return;

    logMessage(`${getUserNameID(member.user)} joined channel: ${getChannelNameID(ns.channel)})`);

    woo(member.voice);
});


async function woo(vs) { // vs = voice state

    vs.channel.join()
        .then(connection => {
            console.log(`\nJoined voice channel: ${getChannelNameID(vs.channel)})`);
            const dispatcher = connection.play(
                fs.createReadStream('gnome_quick.ogg'), {
                    highWaterMark: 1
                });

            dispatcher.on('start', () => {
                console.log('Started voice.');
                connection.player.streamingData.pausedTime = 0;
            });

            dispatcher.on('finish', () => {
                console.log('Finished voice.');
                dispatcher.destroy();
                connection.disconnect();
            });

            dispatcher.on('error', e => {
                console.log('An error occured.');
                console.log(e);
                dispatcher.destroy();
                connection.disconnect();
            });
        })
        .catch(console.log);
}


function getUserNameID(user){
    return `${user.username} (${user.id})`;
}

function getChannelNameID(channel){
    return `${channel.name} (${channel.id})`;
}


function printMessage(message) {
    let user = getUserNameID(message.author);
    let server = message.guild ? `${message.guild.name} (${message.guild.id})` : 'none';
    let channel = server === 'none' ? message.channel.id : getChannelNameID(message.channel);
    logMessage(`Message (${message.id}):\n\tUser: ${user}\n\tServer: ${server}\n\tChannel: ${channel}\n\tContent: ${message.content}`);
}


function logMessage(message){
    let d = new Date();
    console.log(`\nTimestamp: ${d.toUTCString()}\n${message}`);
}


client.login(auth.token);