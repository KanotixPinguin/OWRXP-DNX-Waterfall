# GitHub Release Plan

## Public Repo Goal

Create a public repository that others can:

- build locally
- fork
- modify
- use as a starting point for their own OpenWebRX+ custom image

## Public Naming

- Repo: `OWRXP-DNX`
- Suggested image names:
  - `kanotixpinguin/owrxp-dnx`
  - `ghcr.io/kanotixpinguin/owrxp-dnx`

## Publish Checklist

1. Export final working files from the live container.
2. Store them under `patches/live-export/`.
3. Replace placeholder Dockerfile logic with the real base install flow.
4. Add a real patch application script.
5. Test local build from a clean machine.
6. Remove private references:
   - passwords
   - local IP-only assumptions
   - LoRa-specific content
7. Initialize git.
8. Push to GitHub under `KanotixPinguin`.

## Public Documentation Must Include

- what base image/package source is used
- how to build
- how to start
- how to access noVNC
- default password and how to change it
- what DNX custom features are included
- what is intentionally excluded
