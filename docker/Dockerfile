FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /opt/owrxp-dnx-waterfall

COPY patches/ /opt/owrxp-dnx-waterfall/patches/
COPY scripts/ /opt/owrxp-dnx-waterfall/scripts/
COPY docs/ /opt/owrxp-dnx-waterfall/docs/

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    curl \
    gnupg \
    python3 \
    tini \
    && rm -rf /var/lib/apt/lists/*

RUN chmod +x /opt/owrxp-dnx-waterfall/scripts/*.sh || true

RUN /opt/owrxp-dnx-waterfall/scripts/install_openwebrx_plus_base.sh
RUN /opt/owrxp-dnx-waterfall/scripts/apply_waterfall_module.sh /

EXPOSE 8073

CMD ["/usr/bin/tini", "--", "/bin/bash", "-lc", "if [ -x /usr/bin/openwebrx.py ]; then exec python3 /usr/bin/openwebrx.py; elif [ -x /usr/bin/openwebrx ]; then exec /usr/bin/openwebrx; else echo 'OpenWebRX+ installed, but no known start command was found in this image.'; echo 'Inspect the package layout and adjust docker/Dockerfile CMD if needed.'; sleep infinity; fi"]
