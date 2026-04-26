FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /opt/owrxp-dnx

COPY patches/ /opt/owrxp-dnx/patches/
COPY scripts/ /opt/owrxp-dnx/scripts/
COPY docs/ /opt/owrxp-dnx/docs/

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    curl \
    gnupg \
    python3 \
    tini \
    && rm -rf /var/lib/apt/lists/*

RUN chmod +x /opt/owrxp-dnx/scripts/*.sh || true

# Install the public OpenWebRX+ base from the luarvique package feed for Ubuntu 24.04,
# then overlay the currently exported DNX files on top of that base.
RUN /opt/owrxp-dnx/scripts/install_openwebrx_plus_base.sh
RUN /opt/owrxp-dnx/scripts/apply_live_export_overlay.sh /

EXPOSE 8073

CMD ["/usr/bin/tini", "--", "/bin/bash", "-lc", "if [ -x /usr/bin/openwebrx.py ]; then exec python3 /usr/bin/openwebrx.py; elif [ -x /usr/bin/openwebrx ]; then exec /usr/bin/openwebrx; else echo 'OpenWebRX+ installed, but no known start command was found in this image.'; echo 'Inspect the package layout and adjust docker/Dockerfile CMD if needed.'; sleep infinity; fi"]
