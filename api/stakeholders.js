import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('stakeholders').select('*').order('created_at');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'POST') {
    const { isim, tip, aciklama, renk } = req.body;
    const { data, error } = await supabase.from('stakeholders').insert({ isim, tip, aciklama, renk }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'DELETE') {
    const { id } = req.body;
    const { error } = await supabase.from('stakeholders').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
