# Build Notes

## Current State

This repo currently captures:

- live-exported runtime files from a working DNX-customized OpenWebRX+ instance
- a public repo layout
- overlay scripts that can copy those files into a base image

## Next Build Step

Replace the placeholder base installation in the Dockerfile with the exact standard OpenWebRX+ package/install flow you want to publish.

After the base is installed, apply the overlay:

```sh
/opt/owrxp-dnx/scripts/apply_live_export_overlay.sh /
```

## Public Release Intention

The first public milestone does not need to be perfect. A good first release can be:

1. a public repo
2. the exported working files
3. clear docs
4. an honest "base install section still being finalized"

Then iterate toward a fully automated image build.
