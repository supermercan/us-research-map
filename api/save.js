import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { error } = await supabase
      .from('platform_state')
      .upsert({ 
        id: '00000000-0000-0000-0000-000000000927',
        proje_id: 'US927', 
        canvas_data: req.body, 
        updated_at: new Date() 
      });
    if (error) throw error;
    res.status(200).json({ ok: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
