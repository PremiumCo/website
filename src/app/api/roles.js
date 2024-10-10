import fetchRoles from '../../fetchRoles';

export default async function handler(req, res) {
  const { guildId, userId } = req.query;

  if (!guildId || !userId) {
    return res.status(400).json({ error: 'Missing guildId or userId' });
  }

  const roles = await fetchRoles(guildId, userId);
  res.status(200).json({ roles });
}
