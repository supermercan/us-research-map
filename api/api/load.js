import { list } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const { blobs } = await list({ prefix: 'research-state' });
  if (!blobs.length) return res.status(200).json(null);
  const response = await fetch(blobs[0].url);
  const data = await response.json();
  res.status(200).json(data);
}
