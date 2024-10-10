// pages/api/guildMembers.js

import axios from 'axios';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

export default async function handler(req, res) {
  const { guildId } = req.query;

  if (!guildId) {
    return res.status(400).json({ error: 'Guild ID is required' });
  }

  try {
    const response = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/members`, {
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      },
      params: {
        limit: 1000,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching guild members:", error);
    res.status(500).json({ error: 'Failed to fetch guild members' });
  }
}
