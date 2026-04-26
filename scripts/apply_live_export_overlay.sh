#!/bin/sh
set -eu

BASE="${1:-/}"
LIVE_DIR="/opt/owrxp-dnx/patches/live-export"

copy_if_present() {
  SRC="$1"
  DST="$2"
  if [ -f "$SRC" ]; then
    mkdir -p "$(dirname "$DST")"
    cp "$SRC" "$DST"
    printf 'copied %s -> %s\n' "$SRC" "$DST"
  else
    printf 'skip missing %s\n' "$SRC"
  fi
}

copy_if_present "$LIVE_DIR/openwebrx.js" "$BASE/usr/lib/python3/dist-packages/htdocs/openwebrx.js"
copy_if_present "$LIVE_DIR/custom.css" "$BASE/usr/lib/python3/dist-packages/htdocs/css/custom.css"
copy_if_present "$LIVE_DIR/init.js" "$BASE/usr/lib/python3/dist-packages/htdocs/plugins/receiver/init.js"
copy_if_present "$LIVE_DIR/dnx_matrix.js" "$BASE/usr/lib/python3/dist-packages/htdocs/plugins/receiver/dnx_matrix/dnx_matrix.js"
copy_if_present "$LIVE_DIR/dnx_matrix.css" "$BASE/usr/lib/python3/dist-packages/htdocs/plugins/receiver/dnx_matrix/dnx_matrix.css"
copy_if_present "/opt/owrxp-dnx/patches/public-template/settings.json" "$BASE/var/lib/openwebrx/settings.json"
