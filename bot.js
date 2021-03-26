const { Client, Discord, MessageEmbed, Collection, WebhookClient } = require('discord.js');
const client = global.client = new Client({fetchAllMembers: true});
const qdb = require('quick.db');
const db = new qdb.table("ayarlar");
const fs = require("fs");
const conf = require("./ayarlar.json");
global.conf = conf; // guildMemberAdd, userUpdate gibi etkinliklerde işimiz kolaylaşsın.

const commands = new Map();
global.commands = commands;
const aliases = new Map();
global.aliases = aliases;
global.client = client;
fs.readdir("./Commands", (err, files) => {
    if(err) return console.error(err);
    files = files.filter(file => file.endsWith(".js"));
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(file => {
        let prop = require(`./Commands/${file}`);
        if(!prop.configuration) return;
        console.log(`${prop.configuration.name} komutu yükleniyor!`);
        if(typeof prop.onLoad === "function") prop.onLoad(client);
        commands.set(prop.configuration.name, prop);
        if(prop.configuration.aliases) prop.configuration.aliases.forEach(aliase => aliases.set(aliase, prop));
    });
});

fs.readdir("./Events", (err, files) => {
    if(err) return console.error(err);
    files.filter(file => file.endsWith(".js")).forEach(file => {
        let prop = require(`./Events/${file}`);
        if(!prop.configuration) return;
        client.on(prop.configuration.name, prop);
    });
});

client.emoji = function(x) {
  return client.emojis.cache.get(client.emojiler[x]);
};
const emoji = global.emoji;

const sayiEmojiler = {
  0: "804836562650136598",
  1: "804836562650136598",
  2: "804836561698291782",
  3: "804836814443380737",
  4: "804836561392107571",
  5: "804836562251677717",
  6: "804836562495995916",
  7: "804835008484343809",
  8: "804836563497779210",
  9: "804836563057115208"
};

client.emojiSayi = function(sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi);
  for (var x = 0; x < arr.length; x++) {
    yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
  }
  return yeniMetin;
};

client.sayilariCevir = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

lient.on("guildMemberAdd", member => {
    const moment = require('moment');
  const kanal = ayarlar.giriskanal;
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const tarih = new Date().getTime() - user.createdAt.getTime();
  const embed = new Discord.MessageEmbed()
  let rol = ayarlar.kayıtsızROL
 member.roles.add(rol)//splashen

  var kontrol;
if (tarih < 1296000000) kontrol = '<a:no:802465615498706954> Bu Kullanıcı **Şüpheli**'
if (tarih > 1296000000) kontrol = '<a:on:802465614605844520> Bu Kullanıcı **Güvenli**'
  moment.locale("tr");
  let kanal1 = client.channels.cache.find(x => x.id === kanal);
    let giris = new Discord.MessageEmbed()
    .setDescription(`
 » • <a:ta:75694615293879922> Hoşgeldin <a:ta:75694615293879922> ${member}

 » • <a:sonsuzgalp:802458939417427969> Seninle birlikte **${member.guild.memberCount}** kişiyiz.

 » • <a:yldz1:802458968201887745> <@&Kayıt Yetkilisi> rolündekiler seninle ilgilenecektir.

 » •   ${kontrol}

 » • <a:loading:811590320110305302> Hesabın Oluşturulma Tarihi: \n • \` ${moment(member.user.createdAt).format("YYYY DD MMMM dddd (hh:mm:ss)")} \`

 » • <a:ses:804834986095411271> Ses teyit odasında kaydınızı yaptırabilirsiniz.

`)
    .setImage('https://i.pinimg.com/originals/8c/9a/07/8c9a079986a4ce112882fea6db3ffdee.gif')
    .setTimestamp()

      client.channels.cache.find(x => x.id === kanal).send(`<@&${ayarlar.yetkiliROL}>`)
client.channels.cache.find(x => x.id === kanal).send(giris)

  });

client.on("guildMemberAdd", member =>{
    const hg = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(member.guild.name + 'Sunucusuna Hoşgeldin!')
    .setDescription(`Sunucumuza katıldığın için teşekkürler :)`)
    .setFooter('Hoşgeldin')
    .setTimestamp()
    member.send(hg)
})

client.login(conf.token).then(console.log("Bot başarılı bir şekilde giriş yaptı.")).catch(err => console.error("Bot giriş yapamadı | Hata: " + err));
