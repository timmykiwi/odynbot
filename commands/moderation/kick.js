const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "k",
    category: "moderation",
    description: "Wyrzuca użytkownika z serwera.",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deletable) message.delete();

        if (!args[0]) {
            return message.reply("Wprowadź nazwę użytkownika, którego chcesz wyrzucić.")
                .then(m => m.delete(5000));
        }

        if (!args[1]) {
            return message.reply("Podaj powód.")
                .then(m => m.delete(5000));
        }

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("Nie masz permisji do tej komendy.")
                .then(m => m.delete(5000));
        }

        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("Nie mam wystarczających permisji.")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toKick) {
            return message.reply("Nie można znaleźć użytkownika.")
                .then(m => m.delete(5000));
        }

        if (toKick.id === message.author.id) {
            return message.reply("Nie możesz siebie wyrzucić.")
                .then(m => m.delete(5000));
        }

        if (!toKick.kickable) {
            return message.reply("Tego użytkownika nie można wyrzucić.")
                .then(m => m.delete(5000));
        }

        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**Wyrzucony użytkownik:** ${toKick} (${toKick.id})


            **Powód:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new RichEmbed()
            .setColor("RANDOM")
            .setDescription(`Czy na pewno chcesz wyrzucić ${toKick}?`)

        await message.channel.send(promptEmbed).then(async msg => {

            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Nie mogłem wyrzucić tego użytkownika, ponieważ ${err} :<`)
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`Komenda anulowana.`)
                    .then(m => m.delete(10000));
            }
        });
    }
};
