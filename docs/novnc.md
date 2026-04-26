# noVNC Notes

Status: planned public follow-up layer, not yet wired into the default `docker-compose.yml`.

Public builds should not ship personal passwords.

## Default Access

- VNC display: `:1`
- noVNC password: `changeme`
- noVNC web port: `6080`
- VNC backend port: `5901`

## Operator Guidance

1. Start the stack.
2. If the image includes the optional noVNC layer, open the published noVNC URL in a browser.
3. Use the documented default password.
4. Change the password after first login.

## Public Release Rule

Never publish private passwords or private internal IP assumptions in this repo.
