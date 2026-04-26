#!/bin/sh
set -eu

apt-get update
apt-get install -y --no-install-recommends ca-certificates curl gnupg

curl -s https://luarvique.github.io/ppa/openwebrx-plus.gpg \
  | gpg --yes --dearmor -o /etc/apt/trusted.gpg.d/openwebrx-plus.gpg

cat >/etc/apt/sources.list.d/openwebrx-plus.list <<'EOF'
deb [signed-by=/etc/apt/trusted.gpg.d/openwebrx-plus.gpg] https://luarvique.github.io/ppa/noble ./
EOF

apt-get update
apt-get install -y --no-install-recommends openwebrx
rm -rf /var/lib/apt/lists/*
