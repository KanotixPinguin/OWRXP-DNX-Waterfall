FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

# Placeholder base image workflow.
# The final version should install OpenWebRX+ from the chosen standard package source
# and then apply the public DNX overlays from /opt/owrxp-dnx.

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    bash \
    python3 \
    python3-pip \
    supervisor \
    tini \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /opt/owrxp-dnx

COPY patches/ /opt/owrxp-dnx/patches/
COPY scripts/ /opt/owrxp-dnx/scripts/
COPY docs/ /opt/owrxp-dnx/docs/

RUN chmod +x /opt/owrxp-dnx/scripts/*.sh || true

CMD ["/usr/bin/tini", "--", "/bin/bash", "-lc", "echo 'OWRXP-DNX image skeleton ready'; echo 'Run scripts/apply_live_export_overlay.sh after the OpenWebRX+ base is installed.'; sleep infinity"]
