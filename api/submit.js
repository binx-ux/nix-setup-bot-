// Vercel serverless function — handles template request submissions
// 1. Sends an email notification via Formspree
// 2. Appends the new request to data/requests.json in the GitHub repo
//    so it shows up immediately in the Browse tab without manual edits.
//
// Required Vercel env vars:
//   GITHUB_TOKEN  — GitHub PAT with contents:write on binx-ux/nix-setup-bot-
//   FORMSPREE_ID  — mdabnnvj (your Formspree form ID)

const OWNER = 'binx-ux';
const REPO  = 'nix-setup-bot-';
const PATH  = 'data/requests.json';

export default async function handler(req, res) {
  // CORS headers (needed if called from browser)
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

  const newRequest = {
    name:        template_name.trim().slice(0, 80),
    category:    category.trim(),
    description: description.trim().slice(0, 600),
    discord:     discord_username?.trim() || null,
    status:      'pending',
    date:        new Date().toISOString().split('T')[0],
  };

  // ── 1. Email notification via Formspree ──────────────────────────────────
  const FORMSPREE_ID = process.env.FORMSPREE_ID ?? 'mdabnnvj';
  try {
    await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify({
        template_name: newRequest.name,
        category:      newRequest.category,
        description:   newRequest.description,
        discord:       newRequest.discord ?? 'Not provided',
      }),
    });
  } catch (err) {
    console.error('[SUBMIT] Formspree error:', err.message);
    // Non-fatal — continue to GitHub update
  }

  // ── 2. Append to data/requests.json via GitHub API ───────────────────────
  const TOKEN = process.env.GITHUB_TOKEN;
  if (!TOKEN) {
    console.warn('[SUBMIT] GITHUB_TOKEN not set — skipping repo update');
    return res.status(200).json({ ok: true, note: 'email sent, repo not updated (no token)' });
  }

  const ghHeaders = {
    'Authorization': `Bearer ${TOKEN}`,
    'Accept':        'application/vnd.github+json',
    'Content-Type':  'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    // Get current file content + sha
    const getRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,
      { headers: ghHeaders }
    );
    if (!getRes.ok) throw new Error(`GitHub GET ${getRes.status}`);
    const fileData = await getRes.json();

    const current = JSON.parse(
      Buffer.from(fileData.content.replace(/\n/g, ''), 'base64').toString('utf8')
    );
    current.push(newRequest);

    // Commit updated file
    const putRes = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,
      {
        method:  'PUT',
        headers: ghHeaders,
        body: JSON.stringify({
          message: `chore: add template request — ${newRequest.name}`,
          content: Buffer.from(JSON.stringify(current, null, 2) + '\n').toString('base64'),
          sha:     fileData.sha,
        }),
      }
    );
    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(`GitHub PUT ${putRes.status}: ${err.message}`);
    }
  } catch (err) {
    console.error('[SUBMIT] GitHub error:', err.message);
    // Still return ok — email was sent
    return res.status(200).json({ ok: true, note: 'email sent, repo update failed' });
  }

  return res.status(200).json({ ok: true });
}
