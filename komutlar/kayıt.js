onst Discord = require("discord.js");
const db = require('quick.db');
exports.run = (client, message, args) => {
  const kayıtlı = message.guild.roles.cache.find(r => r.id === "802249067279024199");
  const kayıtsız = message.guild.roles.cache.find(r => r.id === "802249067450990592");
  if(!message.member.roles.cache.get("802253180669919272") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().addField(`Yetersiz Yetki` , `Yeterli Yetkiniz Olmadığı için Bu Komutu Kullanamazsınız`).setColor("RANDOM").setTimestamp()).then(m => m.delete(5000));
  else {
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').addField("Hatalı Kullanım",`Lütfen Bir Kullanıcı Etiketleyiniz`).setFooter(message.author.username, message.author.avatarURL())).then(m => m.delete(10000));
    const kullanıcı = message.guild.member(member)
    const isim = args[1];
    const yas = args[2];
      if(!isim)
        return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').addField("Hatalı Kullanım",`Lütfen Bir İsim Yazınız`).setFooter(message.author.username, message.author.avatarURL())).then(m => m.delete(10000));
      if(!yas)
        return message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').addField("Hatalı Kullanım",`Lütfen Bir Yaş Yazınız`).setFooter(message.author.username, message.author.avatarURL())).then(m => m.delete(10000));
    kullanıcı.roles.add(kayıtlı)
    kullanıcı.roles.remove(kayıtsız)
    kullanıcı.setNickname(` ★ ${isim} | ${yas}`)
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField(" <a:developer:804833677157990411> Kayıt Başarılı", `<@!${kullanıcı.user.id}> Kullanıcısına ${kayıtlı} Rolünü Verdim ve Adını \` ★ ${isim} | ${yas}\` Olarak Düzenledim`)
    .setFooter('Reyis Code / Kayıt Botu')
    message.channel.send(embed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k"],
  permLevel: 0
};
exports.help = {
  name: "k",
  description: "Kullanıcıyı Kayıt Eder",
  usage: "k"
};
