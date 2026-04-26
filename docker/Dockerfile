FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
ENV OWRXP_DNX_VNC_DISPLAY=:1
ENV OWRXP_DNX_VNC_PASSWORD=changeme
ENV OWRXP_DNX_NOVNC_PORT=6080
ENV OWRXP_DNX_VNC_PORT=5901
ENV OWRXP_DNX_WEB_PORT=8073

WORKDIR /opt/owrxp-dnx

COPY patches/ /opt/owrxp-dnx/patches/
COPY scripts/ /opt/owrxp-dnx/scripts/
COPY docs/ /opt/owrxp-dnx/docs/

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    curl \
    fluxbox \
    gnupg \
    novnc \
    net-tools \
    python3 \
    python3-websockify \
    tini \
    x11vnc \
    xterm \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

RUN chmod +x /opt/owrxp-dnx/scripts/*.sh || true

RUN /opt/owrxp-dnx/scripts/install_openwebrx_plus_base.sh
RUN /opt/owrxp-dnx/scripts/apply_live_export_overlay.sh /

EXPOSE 8073 6080 5901

CMD ["/usr/bin/tini", "--", "/opt/owrxp-dnx/scripts/start_owrxp_dnx_novnc.sh"]
