# OWRXP-DNX-noVNC

Public OpenWebRX+ DNX image variant with an integrated noVNC desktop layer.

This repo is the companion image to:

- [OWRXP-DNX](https://github.com/KanotixPinguin/OWRXP-DNX) for the lean web-only build

Use this repo if you want the DNX OpenWebRX+ overlay plus a public noVNC access layer with documented default credentials.

## Scope

- public OpenWebRX+ base from `luarvique/ppa`
- DNX overlay from the public `OWRXP-DNX` project structure
- integrated X11/VNC/noVNC stack
- documented default noVNC password
- no private LoRa station data

## Default Ports

- OpenWebRX web UI: `8073`
- noVNC web UI: `6080`
- raw VNC: `5901`

## Default noVNC Access

- VNC display: `:1`
- default password: `changeme`

Change the password after first start.

## What This Variant Adds

Compared with the base `OWRXP-DNX` repo, this image adds:

- `Xvfb`
- `x11vnc`
- `noVNC`
- a lightweight X11 session
- a helper terminal inside the VNC desktop

## Public Safety

This repo keeps the same public restrictions as the base project:

- no private IPs
- no private receiver keys
- no LoRa-specific private station configuration
- no personal VNC passwords

## Build

```sh
docker build -f docker/Dockerfile -t owrxp-dnx-novnc:test .
```

## Run

```sh
docker run --rm -p 8073:8073 -p 6080:6080 -p 5901:5901 \
  -e OWRXP_DNX_VNC_PASSWORD=changeme \
  --name owrxp-dnx-novnc \
  owrxp-dnx-novnc:test
```

Then open:

- OpenWebRX+: `http://SERVER-IP:8073`
- noVNC: `http://SERVER-IP:6080`

## Status

This repo is the public noVNC companion variant. It is intentionally separate so users can choose:

- base image without noVNC
- noVNC image with the extra desktop layer
