#!/bin/sh
set -eu

BASE="${1:-/}"
TARGET="$BASE/usr/lib/python3/dist-packages/htdocs/plugins/receiver/init.js"
PATCH_FILE="/opt/owrxp-dnx-waterfall/patches/waterfall/owrx_3d_waterfall.js"

python3 /opt/owrxp-dnx-waterfall/scripts/patch_waterfall_init.py "$TARGET" "$PATCH_FILE"
