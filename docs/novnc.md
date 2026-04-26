# noVNC Notes

Status: active in this repo by default.

Public builds should not ship personal passwords.

## Default Access

- VNC display: `:1`
- noVNC password: `changeme`
- noVNC web port: `6080`
- VNC backend port: `5901`
- OpenWebRX+ web port: `8073`

## Operator Guidance

1. Start the stack.
2. Open the noVNC URL in a browser.
3. Use the documented default password.
4. Open OpenWebRX+ either directly on port `8073` or from the helper terminal shown in the noVNC session.
5. Change the password after first login.

## Public Release Rule

Never publish private passwords or private internal IP assumptions in this repo.
