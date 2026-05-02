# NIX Setup Bot

> Your Discord server, built in seconds.

![Discord Bot](https://img.shields.io/badge/Discord-Bot-5865F2?style=flat&logo=discord&logoColor=white)
![Free Forever](https://img.shields.io/badge/Price-Free%20Forever-4ade80?style=flat)
![License](https://img.shields.io/badge/License-Custom%20(see%20LICENSE)-a855f7?style=flat)

NIX Setup Bot is a Discord utility bot built for server owners who want a professional,
fully-structured server without spending hours on manual setup. Run one command, pick
a template, and NIX creates every role, channel, and category for you — instantly.
When it's done, NIX can leave your server and stay out of the way. It's free, forever.

---

## Features

- Run `/setup` to launch an interactive template picker with 25+ options
- Roles, channels, and categories created automatically from the selected template
- Permission tiers configured correctly out of the box — no manual editing required
- Sends the server owner a DM with a full setup summary and recommended next steps
- Includes invite links for Carl-bot and Arcane directly in the DM summary
- NIX can leave the server automatically after setup for a clean bot list
- The Code / AI template includes a live AI news feed channel
- Zero configuration required — one command is all it takes
- Completely free, with no paywalls, premium tiers, or feature locks

---

## Templates

### Development / Tech
- Code / AI Community

### Gaming — Battle Royale / Shooter
- Fortnite
- CoD / Warzone
- Apex Legends
- CS2
- Valorant
- Overwatch 2

### Gaming — MOBA / Competitive
- League of Legends
- Rocket League

### Gaming — Survival / Sandbox
- Minecraft
- Garry's Mod

### Gaming — Roleplay / Simulation
- GTA FiveM RP
- Arma Reforger
- War Thunder
- ERLC

### Gaming — Gacha / Anime
- Genshin Impact
- Zenless Zone Zero (ZZZ)
- MiSide

### Roblox
- Roblox General
- Roblox RP
- Roblox Condo
- Roblox Trading
- Roblox Anime

### General
- General Gaming
- Music / Artist

---

## Quick Start

1. **Add NIX to your server:**
   [Add to Server](https://discord.com/oauth2/authorize?client_id=1477367299706060810&permissions=8&integration_type=0&scope=bot)

2. **Run the setup command in any channel:**
   ```
   /setup
   ```

3. **Choose a template from the dropdown and confirm.**

NIX will build your entire server structure and DM you a summary with next steps.

---

## How It Works

1. Invite NIX to your Discord server using the link above.
2. Run `/setup` in any channel — a dropdown appears with all available templates.
3. Select the template that fits your community.
4. NIX creates all roles, channels, and categories instantly.
5. You receive a DM summary with what was created, along with optional invite links
   for Carl-bot and Arcane.
6. NIX can leave the server automatically, keeping your bot list clean.

---

## Self-Hosting

If you want to run your own instance of NIX Setup Bot:

1. Clone the repository:
   ```bash
   git clone https://github.com/binx-ux/nix-setup-bot-.git
   cd nix-setup-bot-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables by copying the example file:
   ```bash
   cp .env.example .env
   ```
   Then fill in your bot token and any required values in `.env`.

4. Start the bot:
   ```bash
   node index.js
   ```

> Note: Self-hosting is intended for developers and contributors. For regular use,
> just add the public bot — it's free.

---

## License

See the [LICENSE](./LICENSE) file for details.

---

## Credits

Built by **binxix**.

- GitHub: [github.com/binx-ux/nix-setup-bot-](https://github.com/binx-ux/nix-setup-bot-)
- Bot Invite: [Add NIX to your server](https://discord.com/oauth2/authorize?client_id=1477367299706060810&permissions=8&integration_type=0&scope=bot)
