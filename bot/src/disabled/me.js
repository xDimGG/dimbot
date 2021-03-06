const cfg = require('../../../../config');
const Discord = require('discord.js');

exports.run = (msg, args) => {
  if (msg.channel.type !== 'dm') return msg.delete().catch(err => {}).then(() => msg.reply('do NOT try to use that command here, ONLY in DM\'s'));
  if (!args[0]) return msg.reply(`no info provided, please type ${cfg.prefix}me {token}\nIf you don't know how to get your token, check this guide:\n`);
  let token = args[0].replace(/["']/g, '');
  if (!/^[A-Za-z0-9_.-]{59}$/.test(token)) return msg.reply('not a valid token!');
  msg.channel.send('Getting profile...').then(m => {
    const client = new Discord.Client();
    client.on('ready', () => {
      let u = client.user;
      let c = client;
      let text = '';
      let info = {
        Avatar: `[Link to Avatar](${u.avatarURL})`,
        Browser: c.browser ? 'Yes' : 'No',
        Created: u.createdAt,
        Email: u.email,
        Friends: u.friend,
        Guilds: c.guilds.size,
        Id: u.id,
        Mobile_Factor_Authentcation: u.mfaEnabled ? 'Enabled' : 'Disabled',
        Premium: u.premium ? 'Yes' : 'No',
        Presence: u.presence.status,
        Tag: u.tag,
        Used_On_Mobile: u.mobile ? 'Yes' : 'No',
        Verified: u.verified ? 'Yes' : 'No'
      };
      for (let i in info) {
        if (info.hasOwnProperty(i)) {
          text += `${i.replace(/_/g, ' ')}: ${info[i]}\n`;
        }
      }
      m.edit({embed: {
        color: cfg.color,
        description: text,
        footer: {
          text: `Generated by ${cfg.nickname || cfg.username} bot`,
          icon_url: cfg.icon
        },
        title: 'Your Info',
        url: cfg.site
      }});
    });
    client.login(token).catch(err => m.edit('Error getting profile'));
  });
};
