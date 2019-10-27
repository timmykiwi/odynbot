const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "b",
    category: "moderation",
    description: "Banuje użytkownika.",
    usage: "<id | mention>",
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

        if (message.deletable) message.delete();

        if (!args[0]) {
            return message.reply("Wprowadź nazwę użytkownika, którego chcesz zbanować.")
                .then(m => m.delete(5000));
        }

        if (!args[1]) {
            return message.reply("Podaj powód.")
                .then(m => m.delete(5000));
        }

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("Nie masz permisji do tej komendy.")
                .then(m => m.delete(5000));

        }

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("Nie mam wystarczających permisji.")
                .then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!toBan) {
            return message.reply("Nie można znaleźć tego użytkownika.")
                .then(m => m.delete(5000));
        }

        if (toBan.id === message.author.id) {
            return message.reply("Nie możesz siebie zbanować.")
                .then(m => m.delete(5000));
        }

        if (!toBan.bannable) {
            return message.reply("Tego użytkownika nie można zbanować.")
                .then(m => m.delete(5000));
        }

        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(stripIndents`**Zbanowany użytkownik:** ${toBan} (${toBan.id})


            **Powód:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new RichEmbed()
            .setColor("RANDOM")
            .setDescription(`Czy na pewno chcesz zbanować ${toBan}?`)

        await message.channel.send(promptEmbed).then(async msg => {

            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Nie mogłem zbanować tego użytkownika, ponieważ ${err} :<`)
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
