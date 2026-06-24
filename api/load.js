import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const { data, error } = await supabase
      .from('platform_state')
      .select('canvas_data')
      .eq('id', 'us927')
      .single();
    if (error || !data) return res.status(200).json(null);
    res.status(200).json(data.canvas_data);
  } catch(e) {
    res.status(200).json(null);
  }
}
