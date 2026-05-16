# NIX Bot Family

> Your Discord server, built in seconds. Now split across 3 focused bots.

![Discord Bots](https://img.shields.io/badge/Discord-3%20Bots-5865F2?style=flat&logo=discord&logoColor=white)
![Free Forever](https://img.shields.io/badge/Price-Free%20Forever-4ade80?style=flat)
![Templates](https://img.shields.io/badge/Templates-49%2B-e91e63?style=flat)
![Commands](https://img.shields.io/badge/Commands-30%2B-a855f7?style=flat)
![License](https://img.shields.io/badge/License-Custom%20(see%20LICENSE)-a855f7?style=flat)


NIX is a family of three Discord bots built for server owners and communities.
Free forever, no paywalls, no premium tiers.

---

## The Bots

### 🛠️ NIX Setup
The original. Builds your entire server from a template in under a minute.
- **49+ templates** across 17 picker categories (gaming, anime, roleplay, streaming, dev, etc.)
- `/setup`, `/export`, `/import`, `/undo`, `/welcome`, `/customcmd`
- Export your server layout as a shareable code
- Configurable welcome flow with auto-role
- Per-server custom `!` text commands
- [Add NIX Setup →](https://discord.com/oauth2/authorize?client_id=1477367299706060810&permissions=8&integration_type=0&scope=bot)

### 🌸 NIX Anime
Daily-use community bot for anime servers.
- `/anime`, `/manga`, `/character`, `/seiyuu`, `/randomanime`, `/streaming`, `/compare`
- `/tierlist` — build S/A/B/C/D/F tier lists with auto MAL lookup
- `/anilist link/show` — AniList account integration with full profile stats
- `/quiz` + `/quizleaderboard` — anime quiz mini-game with 3 modes
- `/remindme` — get DMed when a new episode airs
- `/watchparty schedule` — create Discord scheduled events with anime cover banners
- `/animeroles` — auto-build a genre role picker
- **Auto:** Episode release feed (Jikan), daily trending digest, seasonal channel rename
- [Add NIX Anime →](https://discord.com/oauth2/authorize?client_id=1505277689165119771&permissions=320243616784&integration_type=0&scope=bot+applications.commands)

### 📊 NIX Tools
Monitoring + utilities for every server.
- `/monitor add/remove/list/channel/ping` — track website uptime per server
- `/scan` + automatic file scanning with VirusTotal (70+ engines)
- `/avatar`, `/banner`, `/afk`, `/ping`, `/uptime`, `/serverinfo`, `/meme`
- **Auto:** AI news from 12 sources (OpenAI, Anthropic, Google AI, Hugging Face, etc.)
- **Auto:** Per-guild site monitor with state-transition pings (@everyone/role/none)
- **Auto:** Status channel rename on bot lifecycle
- [Add NIX Tools →](https://discord.com/oauth2/authorize?client_id=1505277765035753502&permissions=2147740752&integration_type=0&scope=bot+applications.commands)

---

## Quick Start

1. **Pick the bots you need** from the 3 above. Most servers want all three.
2. **Click any "Add" link** above to invite the bot.
3. **Setup bot:** run `/setup` to build your server from a template.
4. **Anime bot:** create a channel called `#new-episodes` and the release feed auto-posts.
5. **Tools bot:** run `/monitor add <url>` to track a website's uptime.

No accounts, no dashboard, no payment. Each bot DMs the server owner with onboarding info on join.

---

## Why Three Bots?

The original NIX Bot grew to 30+ commands and started doing too much. Splitting into three:
- **Smaller permission scopes** — admins grant each bot only what it needs
- **Failure isolation** — one bot crashing doesn't take down the others
- **Cleaner help** — each bot's `/help` shows just its own commands
- **Install what you want** — don't need anime stuff? Skip NIX Anime

---

## Tech Stack

- **discord.js v14** — slash commands, components, modals
- **Node.js 20** — ES modules, no TypeScript
- **npm workspaces (monorepo)** — three apps + one shared utilities package
- **Fly.io** — each bot runs in its own microVM with persistent volume
- **Supabase** — Postgres for changelog, ratings, requests, bot stats, site status, quiz scores
- **Jikan API** — MyAnimeList data (anime, manga, characters, seiyuu, releases)
- **AniList GraphQL** — user profiles for `/anilist`
- **VirusTotal API** — automatic file scanning, 70+ engines
- **Reddit JSON + RSS** — memes and AI news feeds
- **GitHub Pages** — this website, static HTML/CSS/JS, no build step

---

## Repository Layout

| Repo | What's there |
|---|---|
| [nix-bot](https://github.com/binx-ux/nix-bot) | The monorepo — Setup + Anime + Tools + shared package |
| [nix-setup-bot-](https://github.com/binx-ux/nix-setup-bot-) | This repo — the public website at [binx-ux.github.io/NIX](https://binx-ux.github.io/NIX/) |
