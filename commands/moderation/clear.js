const Discord = require("discord.js");

module.exports = {
  name: "c",
  aliases: ["clear", "czyść"],
  description: "Czyszczenie wiadomości.",
  usage: "<number>",
  run: (client, message, args) => {


  if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("Nie masz permisji do tej komendy.").then(m => m.delete(5000));

  if (!args[0])
      return message.reply("Podaj liczbę wiadomości, jaką chcesz usunąć.").then(m => m.delete(5000));

message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Usunięto ${args[0]} wiadomości.`).then(m => m.delete(5000))  ;
})
}
}

module.exports.help = {
  name: "c"
}
