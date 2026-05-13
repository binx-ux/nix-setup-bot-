// Vercel serverless function — handles template request submissions.
//
// Flow:
//   1. Insert into Supabase template_requests table (status='pending')
//      — NIX Bot polls this table every 15s and posts new rows to Discord
//   2. Send email notification via Formspree (kept for redundancy)
//
// Required Vercel env vars:
//   SUPABASE_URL       — your project URL
//   SUPABASE_ANON_KEY  — public anon key
//   FORMSPREE_ID       — optional, defaults to existing form

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { template_name, category, description, discord_username } = req.body ?? {};

  // Basic validation
  if (!template_name?.trim() || !category?.trim() || !description?.trim()) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Length / spam guards
  if (template_name.length > 120 || description.length > 2000 || category.length > 60) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }

  const newRequest = {
    name:             template_name.trim().slice(0, 80),
    category:         category.trim().slice(0, 40),
    description:      description.trim().slice(0, 1000),
    discord_username: discord_username?.trim().slice(0, 60) || null,
    status:           'pending',
  };

  // ── 1. Insert into Supabase ─────────────────────────────────────────────
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('[SUBMIT] Supabase env vars missing');
    return res.status(500).json({ error: 'Server is misconfigured. Try again later.' });
  }

  try {
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/template_requests`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer':        'return=minimal',
      },
      body: JSON.stringify(newRequest),
    });

    if (!insertRes.ok) {
      const text = await insertRes.text().catch(() => '');
      console.error('[SUBMIT] Supabase insert failed:', insertRes.status, text);
      return res.status(500).json({ error: 'Could not save your request. Try again.' });
    }
  } catch (err) {
    console.error('[SUBMIT] Supabase network error:', err.message);
    return res.status(500).json({ error: 'Network error. Try again.' });
  }

  // ── 2. Email notification via Formspree (best-effort, non-blocking) ─────
  const FORMSPREE_ID = process.env.FORMSPREE_ID ?? 'mdabnnvj';
  try {
    await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        template_name: newRequest.name,
        category:      newRequest.category,
        description:   newRequest.description,
        discord:       newRequest.discord_username ?? 'Not provided',
      }),
    });
  } catch (err) {
    console.error('[SUBMIT] Formspree error:', err.message);
    // Non-fatal — Supabase already has the request
  }

  return res.status(200).json({ ok: true });
}
