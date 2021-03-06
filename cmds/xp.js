const Discord = require("discord.js");

module.exports.run = async (bot, message, args, pool) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
    let replyChannel = message.guild.channels.find("name", "bot-spam");

    pool.query(`SELECT xp FROM userdata WHERE id = '${target.id}'`, (error, response) => {
        if(error) {
            console.log('DB_ERROR: ', error);
        } else {
            if(!response.rows[0]) return replyChannel.send("This user has not received any XP yet.").then(msg => {msg.delete(60000)});

            let xp = response.rows[0].xp;
            let embed = new Discord.RichEmbed()
            .setColor("#9b59b6")
            .setAuthor(`${target.username}'s current XP is ${xp}`)
            .setDescription("Msg length/two = XP gain.");

            replyChannel.send(embed).then(msg => {msg.delete(60000)});
            console.log(`Displayed ${target.username}'s xp on request of ${message.author.username}!`);
        }
    });
}

module.exports.help = {
    name: "xp"
}