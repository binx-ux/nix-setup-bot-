# Website launch updates — apply ON DEPLOY DAY of v1.9.0

When the bot deploys with export/import live, run these changes:

## 1. Update the announcement banner across all 4 pages

Find this block in `index.html`, `changelog.html`, `faq.html`, `requests.html`:

```html
<div class="announcement" id="announcementBanner" data-eta="2026-05-11T16:00:00Z" data-version="v1.9.1">
  <div class="container announcement__inner">
    <span class="announcement__pill">Update</span>
    <span class="announcement__text">
      <strong>Update pushed back to May 11.</strong> Now dropping in
    </span>
    <span class="announcement__eta" id="announcementEta">~3 days</span>
    ...
```

Replace with:

```html
<div class="announcement" id="announcementBanner" data-version="v1.9-live">
  <div class="container announcement__inner">
    <span class="announcement__pill">New</span>
    <span class="announcement__text">
      <strong>v1.9.0 is live</strong> — Server Export & Import is here.
      <a href="changelog.html" style="color: var(--color-purple-light); text-decoration: underline;">See what's new</a>
    </span>
    <button class="announcement__close" id="announcementClose" aria-label="Dismiss announcement">×</button>
  </div>
</div>
```

(Remove the `data-eta` attribute and the countdown `<span class="announcement__eta">` — no longer needed since it's live now.)

You'll also need to remove or simplify the countdown JS since there's no eta to count down to. Just keep the dismiss handler.

## 2. Update meta descriptions on all pages

Search-and-replace across all 4 HTML files:

- "25+ templates" → "45+ templates"
- "Pick from 25+ professionally designed server templates" → "Pick from 45+ templates, or export and share your own"

## 3. Update Open Graph description

In `index.html` head:

```html
<meta property="og:description" content="Pick from 45+ Discord server templates. Or export your own server as a shareable code. Free forever." />
```

## 4. After applying, push to git

```bash
git add index.html changelog.html faq.html requests.html
git commit -m "v1.9.0 launch — banner update + meta refresh"
git push
```

Vercel auto-deploys.
