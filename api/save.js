import { put } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { blob } = await put('research-state.json', JSON.stringify(req.body), {
    access: 'public',
    allowOverwrite: true
  });
  res.status(200).json({ ok: true, url: blob.url });
}
