const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const { config } = require("dotenv");
const client = new Discord.Client({disableEveryone: true});
const prefix = require("./prefix.json");
const fs = require("fs");

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

const activities_list = [
    "wpisz /pomoc!",
    "kontakt: @Timmy#9064",
    ];

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 1000);
});

client.on("message", async msg => {

  if(msg.author.bot) return;
  if(msg.channel.type !== "text") return;
  if(msg.content.startsWith(prefix.prefix + "sub")){
  var pv = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**SUBSKRYBUJ!**
    https://www.youtube.com/user/Nierezuelo`)
    .setImage(`https://i.imgur.com/UkICdVR.jpg`)
      .setTimestamp()
  .setFooter(`OdynBot`)
  msg.channel.send(pv);
}
});

client.on("message", async msg => {

  if(msg.author.bot) return;
  if(msg.channel.type !== "text") return;
  if(msg.content.startsWith(prefix.prefix + "live")){
  var pv = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`Tutaj sprawdzisz, czy transmisja na żywo jest zaplanowana, a jeśli tak, to na kiedy:
    https://www.youtube.com/c/Nierezuelo/live`)
      .setTimestamp()
  .setFooter(`OdynBot`)
  msg.channel.send(pv);
}
});

client.on("message", async msg => {

  if(msg.author.bot) return;
  if(msg.channel.type !== "text") return;
  if(msg.content.startsWith(prefix.prefix + "pomoc")){
  var pv = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`**ODYNBOT - KOMENDY**`)
  .setDescription(`/sub - link do kanału OdynLive.

    /live - link do transmisji OdynLive.

    /k **@user** **powód** - wyrzuca daną osobę z serwera.

    /b **@user** **powód** - banuje daną osobę na serwerze.

    /mów **tekst** - bot mówi nasz tekst.

    /c **liczba** - bot czyści daną ilość wiadomości.
    `)
    .setImage(`https://i.imgur.com/UkICdVR.jpg`)
      .setTimestamp()
  .setFooter(`OdynBot`)
  msg.channel.send(pv);
}
});


client.on("message", async msg => {

if(msg.author.bot) return;
  if(msg.channel.type !== "text") return;
  if(msg.content.startsWith(prefix.prefix + "czyrokerpowinienotrzymacrange")){
  var pv = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**NIE**`)
    .setImage(`https://i.imgur.com/4PddGJ3.png`)
      .setTimestamp()
  .setFooter(`OdynBot`)
  msg.channel.send(pv);
}
});

client.on("message", async msg => {
    
if(msg.author.bot) return;
  if(msg.channel.type !== "text") return;
  if(msg.content.startsWith(prefix.prefix + "kdgg")){
  var pv = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**KDGG NA BANA**`)
    .setImage(`https://i.imgur.com/eOQaSfz.png`)
      .setTimestamp()
  .setFooter(`OdynBot`)
  msg.channel.send(pv);
}
});

config({
    path: __dirname + "/.env"
});

client.on("ready", async () => {
  console.log('${client.user.username} jest online!')
  client.user.setGame("")
  client.user.setStatus('dnd')
});

client.on("message", async message => {
    const prefix = "/";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
});

client.login(process.env.TOKEN);
