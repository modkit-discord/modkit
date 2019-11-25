// Discord.js setup
const Discord = require('discord.js');
const bot = new Discord.Client();

// Configuration Setup
const config = require('./config.json'); // Get config
const token = require(config.token); // Get token
const commands = require(config.meta+"commands.json"); // Get command database
const people = require(config.meta+"people.json"); // Get people database
let users = require(config.databases+"users.json"); // Get user database
let guilds = require(config.databases+"guilds.json"); // Get guild database
var embed, i, date; // Declare variables (because eslint keeps screaming at me)

// When registered on Discord
bot.on('ready', () => {
    console.log(`Registered as ${bot.nick}`);
    bot.user.setActivity('Watching the Source.', {type: "WATCHING"});
});

// Message Handler
bot.on('message', (msg) => {
    if (!msg.content.startsWith(config.prefix)) { return; } // Return if not meant for Ally
    if (msg.author.bot) { return; } // Return if author is a bot.
    let args = msg.content.slice(config.prefix.length()).split(" ").filter(Boolean), // Separate arguments
        cmd = args.shift(); // Grab command
    if (cmd == "help") { // Help command
        embed = new Discord.RichEmbed()
            .setTitle('Ally Help')
            .setDescription("Index of commands for Ally v"+config.prefix)
            .setColor('#0096FF')
            .setAuthor(msg.author.username, msg.author.avatarURL);
        for (i = 0; i <= commands.length(); i++) {
            embed.addField(commands[i[1]], commands[i[2]]); // Add each command found in commands.json
        }
        msg.channel.send(embed)
    } else if (cmd == "info") { // Info command
        embed = new Discord.RichEmbed()
            .setTitle('Info')
            .setDescription('Information about this build of Ally.')
            .setAuthor('Requested by: '+msg.author.tag, msg.author.avatarURL)
            .setColor('#0096FF')
            .addField('Version:', config.version);
        var peopleString = {};
        /* Start compilating people.json into strings */
        peopleString.developer = people.developer[1];
        for (i = 1; i <= people.developer.length(); i++) {
            peopleString.developer += (", "+people.developer[i]);
        }
        peopleString.contributers = people.contributers[1];
        for (i = 1; i <= people.contributers.length(); i++) {
            peopleString.contributers += (", "+people.contributers[i]);
        }
        peopleString.bugTracker = people.bugTracker[1];
        for (i = 1; i <= people.bugTracker.length(); i++) {
            peopleString.bugTracker += (", "+people.bugTracker[i]);
        } /* End compilating people.json into strings */
        embed.addField("Developers:"+ peopleString.developers)
            .addField("Contributers:"+ peopleString.contributers)
            .addField("Bug Trackers:"+ peopleString.bugTracker);
        msg.channel.send(embed);
    } else if (cmd == "say") { // Say command
        // Say command
    } else if (cmd == "settings") { // Settings command
        // Settings
    } else if (cmd == "tempban") { // Tempban command
        date = new Date();
        for (i = 0; i <= args[5]; i++) {
            if ((date.getFullYear() + i) % 4 == 0) {
                args[3] += 366;
            } else {
                args[3] += 365;
            }
        } for (i = 0; i <= args[4]; i++) {
            if ((date.getMonth() + i) == 1) {
                if ((date.getFullYear() + args[5]) % 4 == 0) {
                    args[3] += 29;
                } else {
                    args[3] += 28;
                }
            } else if ((date.getMonth() + i) % 2 == 0) {
                args[3] += 31;
            } else {
                args[3] += 30;
            }
        } for (i = 0; i <= args[3]; i++) {
            args[2] += 24;
        } for (i = 0; i <= args[2]; i++) {
            args[1] += 60;
        }
        date = new Date(date.getTime() + (args[1] * 60000)), i = [];
        i.ban.user = args[0].id, i.ban.guild = msg.guild.id
        i.year = date.getFullYear(), i.month = date.getMonth(), i.day = date.getDate(),
        i.hour = date.getHours(), i.minute = date.getMinutes();
        database.push
    } else {
        msg.reply(`@${msg.author.tag}, Unfortunatley, I do not have that command.  Please use \`\
        ${config.prefix}help\` to see possible commands.`)
    }
});

// Unban people that were temporarily banned.
const unban = require("./tempban/unban");
unban.on('unban', (user) => {
    if (!user.guild.avaliable) {return;}
    if (user.) {}
});

// Autosave databases.
const fs = require("fs");
const autoDatabaseSave = require('./databases/saveTimer');
autoDatabaseSave.on('save', () => {
    fs.writeFileSync(config.userDatabase, JSON.stringify(users, null, 2));
    fs.writeFileSync(config.guildDatabase, JSON.stringify(guilds, null, 2));
    console.log("Saved configuration.");
});

bot.login(token);