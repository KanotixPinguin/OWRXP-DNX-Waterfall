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

## Repository Layout

- [docker/Dockerfile](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/docker/Dockerfile)
- [docker/docker-compose.yml](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/docker/docker-compose.yml)
- [patches/](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/patches)
- [scripts/](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/scripts)
- [docs/](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/docs)

## Build Plan

1. Start from a clean OpenWebRX+ base image using the standard package/repo flow.
2. Copy DNX patch assets into the image.
3. Apply patch scripts to:
   - `htdocs/openwebrx.js`
   - `htdocs/plugins/receiver/init.js`
   - theme/plugin files as needed
4. Add noVNC support with public defaults.
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

Use [scripts/apply_live_export_overlay.sh](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/scripts/apply_live_export_overlay.sh) to apply these files into an already installed OpenWebRX+ image root.

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

This repo skeleton was generated to turn a live patched OWRX+ system into a reproducible public build.
