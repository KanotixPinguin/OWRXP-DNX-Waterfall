# Build Notes

## Current State

This repo currently captures:

- live-exported runtime files from a working DNX-customized OpenWebRX+ instance
- a public repo layout
- overlay scripts that can copy those files into a base image
- an automated Ubuntu 24.04 package-install step based on `luarvique/ppa`

## Upstream Base

The public base for this repo should follow the Ubuntu 24.04 instructions from:

- [luarvique/ppa](https://github.com/luarvique/ppa)
- [OpenWebRX+ Package Repository](https://luarvique.github.io/ppa/)

The key upstream commands are:

```sh
curl -s https://luarvique.github.io/ppa/openwebrx-plus.gpg | sudo gpg --yes --dearmor -o /etc/apt/trusted.gpg.d/openwebrx-plus.gpg
sudo tee /etc/apt/sources.list.d/openwebrx-plus.list <<<"deb [signed-by=/etc/apt/trusted.gpg.d/openwebrx-plus.gpg] https://luarvique.github.io/ppa/noble ./"
sudo apt update
sudo apt install openwebrx
```

## Overlay Step

After the base is installed, apply the DNX overlay:

```sh
/opt/owrxp-dnx/scripts/apply_live_export_overlay.sh /
```

## Public Safety Check

Before pushing a new live-export update, run:

```sh
python3 scripts/check_public_export.py
```

This is meant to catch obvious public-release mistakes such as:

- private `192.168.x.x` addresses
- LoRa references
- old VNC helper links
- stale Telegram/Freenode links

## Current Honesty Rules

This public repo should stay honest about what is already wired and what is still pending:

- The base package install is now scripted.
- The DNX overlay is now scripted.
- The default compose file is web-only for now.
- The noVNC layer is still a follow-up item, documented but not yet shipped as the default runtime path.
