# Build Notes

## Purpose

This repo is narrower than `OWRXP-DNX`.

It should patch only the DNX waterfall module into a standard OpenWebRX+ install, not the whole DNX runtime overlay.

## Upstream Base

The public base follows the Ubuntu 24.04 package feed from:

- [luarvique/ppa](https://github.com/luarvique/ppa)

## Patch Target

The waterfall module is injected into:

- `/usr/lib/python3/dist-packages/htdocs/plugins/receiver/init.js`

The script replaces the existing marked block if present, or appends the block if it is missing.

## Public Rule

Keep this repo focused on the waterfall code path only:

- do not add private station settings
- do not add noVNC layers here
- do not add private SDR panel branding here

## Current Honesty Rules

This public repo should stay honest about what is already wired and what is still pending:

- The base package install is now scripted.
- The DNX overlay is now scripted.
- The default compose file is web-only for now.
- The noVNC layer is still a follow-up item, documented but not yet shipped as the default runtime path.
