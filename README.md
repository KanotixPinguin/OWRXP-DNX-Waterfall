# OWRXP-DNX

Public OpenWebRX+ customization project based on the standard OWRX+ package flow, with DNX UI work, modern/old 3D waterfall variants, noVNC helpers, and reproducible patching.

This public repo intentionally excludes LoRa-specific profiles, private credentials, and private network assumptions.

## Scope

- Base OpenWebRX+ install from the standard package/repo flow
- DNX receiver panel customizations
- 3D waterfall modes:
  - `Standard`
  - `3D-Modern`
  - `Std/3DM`
  - `3D-Old`
- Theme support including `DNX Matrix`
- noVNC integration with documented default access

## Not Included

- LoRa-specific presets
- Private passwords
- Private LAN-only assumptions
- Personal station branding that should not be published

## noVNC Defaults

This project is intended to document and ship standard access details instead of reusing personal passwords.

Current documented defaults should be set in the image and repeated in the final docs:

- noVNC host: `127.0.0.1` inside container
- exported web endpoint: container/service port mapping from compose
- VNC display: `:1`
- default noVNC password: `changeme`

These defaults should be changed by operators after first start.

At the current public stage, these values are documented for the planned noVNC layer. The default `docker-compose.yml` in this repo currently publishes only the OpenWebRX+ web UI on port `8073`.

## Repository Layout

- [docker/Dockerfile](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/docker/Dockerfile)
- [docker/docker-compose.yml](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/docker/docker-compose.yml)
- [patches/](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/patches)
- [scripts/](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/scripts)
- [docs/](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/docs)

## Build Plan

1. Install the public OpenWebRX+ base from the [luarvique/ppa](https://github.com/luarvique/ppa) Ubuntu 24.04 package feed.
2. Copy DNX patch assets into the image.
3. Apply overlay scripts to:
   - `htdocs/openwebrx.js`
   - `htdocs/plugins/receiver/init.js`
   - theme/plugin files as needed
4. Add noVNC support with public defaults as a follow-up layer.
5. Publish:
   - source repo to GitHub
   - optionally Docker image to a registry

## Overlay Target Paths

The current public export is treated as a direct overlay for the standard OpenWebRX+ filesystem:

- `patches/live-export/openwebrx.js` -> `/usr/lib/python3/dist-packages/htdocs/openwebrx.js`
- `patches/live-export/custom.css` -> `/usr/lib/python3/dist-packages/htdocs/css/custom.css`
- `patches/live-export/init.js` -> `/usr/lib/python3/dist-packages/htdocs/plugins/receiver/init.js`
- `patches/live-export/dnx_matrix.js` -> `/usr/lib/python3/dist-packages/htdocs/plugins/receiver/dnx_matrix/dnx_matrix.js`
- `patches/live-export/dnx_matrix.css` -> `/usr/lib/python3/dist-packages/htdocs/plugins/receiver/dnx_matrix/dnx_matrix.css`
- `patches/public-template/settings.json` -> `/var/lib/openwebrx/settings.json`

Use [scripts/apply_live_export_overlay.sh](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/scripts/apply_live_export_overlay.sh) to apply these files into an already installed OpenWebRX+ image root.

Before publishing new live exports, run:

```sh
python3 scripts/check_public_export.py
```

This catches the most obvious private leftovers such as private IPs, LoRa mentions, and old VNC helper links.

## Public Settings Policy

The live DNX JavaScript and CSS exports are public-safe enough to ship after review, but the live `settings.json` from a private station is not.

This repo therefore ships a separate public template:

- [patches/public-template/settings.json](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/patches/public-template/settings.json)

That template intentionally excludes:

- private IP addresses
- personal GPS/location data
- receiver keys and magic keys
- private admin email
- embedded SDRangel/SDRuno/noVNC station links
- LoRa-specific station text

Operators should create their own SDR device definitions and profiles after first start.

## Live System Export

If the live container already contains the final working DNX state, export these files from the running container and commit them into this repo:

- `htdocs/openwebrx.js`
- `htdocs/css/custom.css`
- `htdocs/plugins/receiver/init.js`
- `htdocs/plugins/receiver/dnx_matrix/dnx_matrix.js`
- optionally `htdocs/plugins/receiver/dnx_matrix/dnx_matrix.css`

Recommended export target inside this repo:

- [patches/live-export/openwebrx.js](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/patches/live-export/openwebrx.js)
- [patches/live-export/custom.css](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/patches/live-export/custom.css)
- [patches/live-export/init.js](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/patches/live-export/init.js)
- [patches/live-export/dnx_matrix.js](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/patches/live-export/dnx_matrix.js)

## GitHub Target

- GitHub account: [KanotixPinguin](https://github.com/KanotixPinguin)

## Status

This repo now contains:

- a live-exported DNX overlay
- an automated Ubuntu 24.04 `luarvique` base install step
- a public export checker for obvious private leftovers

The next step is to verify the image runtime path and then add the public noVNC layer on top.
