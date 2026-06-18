import { list, head } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const { blobs } = await list({ 
      prefix: 'research-state',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    if (!blobs.length) return res.status(200).json(null);
    const response = await fetch(blobs[0].url);
    const data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(200).json(null);
  }
}
