import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('settings').select('*').order('kategori').order('sira');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'POST') {
    const { kategori, deger, label, renk, sira } = req.body;
    const { data, error } = await supabase.from('settings').insert({ kategori, deger, label, renk, sira }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'DELETE') {
    const { id } = req.body;
    const { error } = await supabase.from('settings').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
}
