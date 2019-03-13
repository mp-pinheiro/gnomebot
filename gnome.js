import Client from 'discord.js';
import token from './auth.json';

const client = new Client();

const ascii_gnome = '⣿⠿⠋⠉⠄⠄⠄⠄⠄⠉⠙⢻⣿\n⣿⣿⣿⣿⣿⣿⢋⠄⠐⠄⠐⠄⠠⠈⠄⠂⠠⠄⠈⣿\n⣿⣿⣿⣿⣿⡟⠄⠄⠄⠁⢀⠈⠄⠐⠈⠄⠠⠄⠁⠈⠹\n⣿⣿⣿⣿⣿⣀⡀⡖⣖⢯⢮⢯⡫⡯⢯⡫⡧⣳⡣⣗⣼\n⣿⣿⣿⣿⣷⣕⢱⢻⢮⢯⢯⡣⣃⣉⢪⡪⣊⣀⢯⣺⣺\n⣿⣿⣿⣿⣿⣷⡝⣜⣗⢽⢜⢎⢧⡳⡕⡵⡱⣕⡕⡮⣾\n⣿⣿⣿⣿⣿⡿⠓⣕⢯⢮⡳⣝⣕⢗⡭⣎⢭⠮⣞⣽⡺\n⣿⣿⣿⡿⠋⠄⠄⠸⣝⣗⢯⣳⢕⣗⡲⣰⡢⡯⣳⣳⣫\n⣿⣿⠋⠄⠄⠄⠄⠄⠘⢮⣻⣺⢽⣺⣺⣳⡽⣽⣳⣳⠏⠛⠛⠛⢿\n⣿⠇⠄⢁⠄⠄⠄⠁⠄⠈⠳⢽⢽⣺⢞⡾⣽⣺⣞⠞⠄⠄⠈⢄⢎⡟⣏⢯⢝⢛⠿\n⡇⠄⡧⣣⢢⢔⢤⢢⢄⠂⠄⠄⠁⠉⠙⠙⠓⠉⠈⢀⠄⠄⠄⠑⢃⣗⢕⣕⢥⡣⣫⢽\n⣯⠄⢽⢸⡪⡪⡣⠲⢤⠄⠄⠂⠄⠄⠄⡀⠄⠠⠐⠄⣶⣤⣬⣴⣿⣿⣷⡹⣿⣿⣾⣿\n⣿⣶⣾⣵⢱⠕⡕⡱⠔⠄⠁⢀⠠⠄⠄⢀⠄⠄⢀⣾\n⣿⣿⣿⣿⡷⡗⠬⡘⠂⠄⠈⠄⠄⠄⠈⠄⠄⠄⢸\n⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶\n⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶\n⣿⣿⣿⣿⣿⣿⣧⢁⠂⠔⠠⠈⣾⠄⠂⠄⡁⢲\n⣿⣿⣿⣿⣿⣿⠿⠠⠈⠌⠨⢐⡉⠄⠁⡂⠔⠼\n⣿⣿⣿⣿⣿⣿⡆⠈⠈⠈⠄⠂⣆⠄⠄⠄⠄⣼\n⣿⣿⣿⣿⣿⣿⣿⠄⠁⠈⠄⣾⡿⠄⠄⠂⢸\n⣿⣿⣿⣿⣿⣿⡟⠄⠄⠁⠄⠻⠇⠄⠐⠄⠄⠈⠙⢻\n⣿⣿⣿⣿⣿⣿⡇⡀⠄⠂⠁⢀⠐⠄⣥⡀⠁⢀⠄⣿';


client.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ' + client.user.username + ' - (' + client.user.id + ')');
});


client.on('message', messageInfo => {
    if (!messageInfo.guild) return;

    let message = messageInfo.content;
    if (message === '!woo') {
        if (messageInfo.member.voice.channel) {
            woo(messageInfo.member.voice);
        } else {
            messageInfo.reply('you are not in a voice channel!');
        }

        printMessage(messageInfo);
    } else if (message.toLowerCase().includes('gnome')) {
        messageInfo.channel.send(ascii_gnome);
        printMessage(messageInfo);
    }
});



client.on('voiceStateUpdate', (os, ns) => {

    if (!ns.channel) return;
    let member = ns.member;

    console.log(`${member.user.username} joined channel: ${ns.channel.name} (${ns.channel.id})`);

    if (member.id === '275816996266835968' || member.id === '187034695941357568') {
        woo(member.voice);
    }

});


async function woo(voice) {

    voice.channel.join()
        .then(connection => {
            console.log('Joined voice channel');
            const dispatcher = connection.play('./gnome_quick.wav');

            dispatcher.on('start', () => {
                console.log('Started voice.');
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

            dispatcher.setVolume(0.5);
        })
        .catch(console.log);

}


function printMessage(message) {
    let user = `${message.author.username} (${message.author.id})`;
    let server = message.guild ? `${message.guild.name} (${message.guild.id})` : 'none';
    let channel = server === 'none' ? message.channel.id : `${message.channel.name} (${message.channel.id})`;
    console.log(`Message:\n\tUser: ${user}\n\tServer: ${server}\n\tChannel: ${channel}\n\tContent: ${message.content}`);
}


client.login(token);