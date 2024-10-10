const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.login(process.env.DISCORD_BOT_TOKEN);

const fetchRoles = async (guildId, userId) => {
  try {
    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch(userId);
    return member.roles.cache.map(role => role.name);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
};

module.exports = fetchRoles;
