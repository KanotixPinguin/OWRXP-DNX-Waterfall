#!/bin/sh
set -eu

DISPLAY_NUM="${OWRXP_DNX_VNC_DISPLAY:-:1}"
NOVNC_PORT="${OWRXP_DNX_NOVNC_PORT:-6080}"
VNC_PORT="${OWRXP_DNX_VNC_PORT:-5901}"
WEB_PORT="${OWRXP_DNX_WEB_PORT:-8073}"
VNC_PASSWORD="${OWRXP_DNX_VNC_PASSWORD:-changeme}"

mkdir -p /root/.vnc
x11vnc -storepasswd "$VNC_PASSWORD" /root/.vnc/passwd >/dev/null

cat >/root/.xinit_owrxp_dnx.sh <<EOF
#!/bin/sh
xsetroot -solid "#1f2430"
xterm -fa Monospace -fs 11 -geometry 120x24+20+20 -T "OWRXP-DNX noVNC" -hold -e sh -lc 'echo "OWRXP-DNX noVNC"; echo; echo "OpenWebRX+: http://127.0.0.1:${WEB_PORT}"; echo "Change the default VNC password after first start."; echo; echo "This desktop layer is intentionally generic for the public image.";'
exec fluxbox
EOF
chmod +x /root/.xinit_owrxp_dnx.sh

Xvfb "$DISPLAY_NUM" -screen 0 1280x720x24 &
XVFB_PID=$!
sleep 1

DISPLAY="$DISPLAY_NUM" /root/.xinit_owrxp_dnx.sh &
XSESSION_PID=$!

x11vnc \
  -display "$DISPLAY_NUM" \
  -rfbport "$VNC_PORT" \
  -rfbauth /root/.vnc/passwd \
  -forever \
  -shared \
  -localhost \
  >/tmp/x11vnc.log 2>&1 &
X11VNC_PID=$!

websockify --web /usr/share/novnc/ "$NOVNC_PORT" "localhost:${VNC_PORT}" >/tmp/novnc.log 2>&1 &
NOVNC_PID=$!

if [ -x /usr/bin/openwebrx.py ]; then
  python3 /usr/bin/openwebrx.py &
elif [ -x /usr/bin/openwebrx ]; then
  /usr/bin/openwebrx &
else
  echo "OpenWebRX+ installed, but no known start command was found in this image."
  echo "Inspect the package layout and adjust scripts/start_owrxp_dnx_novnc.sh."
  tail -f /dev/null &
fi
OWRXP_PID=$!

cleanup() {
  kill "$OWRXP_PID" "$NOVNC_PID" "$X11VNC_PID" "$XSESSION_PID" "$XVFB_PID" 2>/dev/null || true
}

trap cleanup INT TERM
wait "$OWRXP_PID"
