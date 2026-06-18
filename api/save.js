import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const blob = await put('research-state.json', JSON.stringify(req.body), {
    access: 'public',
    allowOverwrite: true,
    token: process.env.BLOB_READ_WRITE_TOKEN
  });
  res.status(200).json({ ok: true });
}
