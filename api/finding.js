import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { metin, sure, asama, tip, kaynak, etkilenen_sistem } = req.body;
      const { data, error } = await supabase
        .from('findings')
        .insert({ metin, kaynak: kaynak || 'gorusme', sure: sure || null, asama: asama || null, tip: tip || 'gozlem', etkilenen_sistem: etkilenen_sistem || null })
        .select()
        .single();
      if (error) throw error;
      res.status(200).json({ ok: true, id: data.id });
    } catch(e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      const { error } = await supabase.from('findings').delete().eq('id', id);
      if (error) throw error;
      res.status(200).json({ ok: true });
    } catch(e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).end();
  }
}
