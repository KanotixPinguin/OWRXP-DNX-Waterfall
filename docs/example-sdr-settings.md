# Example SDR Settings

The public image ships with a neutral example receiver in:

- [patches/public-template/settings.json](C:/Users/ich/Documents/OWRX%20Codex/OWRXP-DNX/patches/public-template/settings.json)

This is intentionally generic:

- SDR type: `rtlsdr`
- profile name: `Example FM`
- center frequency: `100000000`
- start frequency: `99900000`
- modulation: `wfm`

Replace this example with your own hardware configuration after first start.

Good public defaults:

- keep `receiver_name` generic
- remove private contact addresses if you publish your own fork
- do not commit private keys, local IPs, or personal VNC helper links
