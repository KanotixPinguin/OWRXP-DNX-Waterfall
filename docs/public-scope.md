# Public Scope

## Included

- public Docker build flow
- public noVNC defaults
- public DNX 3D and receiver-panel customizations
- public themes including DNX Matrix

## Excluded

- LoRa-specific presets and behavior
- personal station URLs
- personal passwords
- private IP assumptions
- machine-local secrets

## Review Rule

Before every public push, check:

1. no credentials are present
2. no private IPs are hardcoded unless explicitly documented as examples
3. no LoRa-only content remains
4. no personal branding is left by accident
