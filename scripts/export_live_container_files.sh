#!/bin/sh
set -eu

CONTAINER="${1:-owrxp}"
OUTDIR="${2:-/tmp/owrxp-dnx-export}"

mkdir -p "$OUTDIR"

docker exec "$CONTAINER" sh -lc 'cat /usr/lib/python3/dist-packages/htdocs/openwebrx.js' > "$OUTDIR/openwebrx.js"
docker exec "$CONTAINER" sh -lc 'cat /usr/lib/python3/dist-packages/htdocs/css/custom.css' > "$OUTDIR/custom.css"
docker exec "$CONTAINER" sh -lc 'cat /usr/lib/python3/dist-packages/htdocs/plugins/receiver/init.js' > "$OUTDIR/init.js"
docker exec "$CONTAINER" sh -lc 'cat /usr/lib/python3/dist-packages/htdocs/plugins/receiver/dnx_matrix/dnx_matrix.js' > "$OUTDIR/dnx_matrix.js"

if docker exec "$CONTAINER" sh -lc 'test -f /usr/lib/python3/dist-packages/htdocs/plugins/receiver/dnx_matrix/dnx_matrix.css'; then
  docker exec "$CONTAINER" sh -lc 'cat /usr/lib/python3/dist-packages/htdocs/plugins/receiver/dnx_matrix/dnx_matrix.css' > "$OUTDIR/dnx_matrix.css"
fi

printf 'Exported live files to %s\n' "$OUTDIR"
