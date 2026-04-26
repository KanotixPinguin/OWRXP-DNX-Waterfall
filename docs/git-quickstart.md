# Git Quickstart

## Suggested Repo

- Owner: `KanotixPinguin`
- Repo: `OWRXP-DNX`

## Local Git Setup

Run in:

- `C:\Users\ich\Documents\OWRX Codex\OWRXP-DNX`

Commands:

```powershell
git init
git branch -M main
git add .
git commit -m "Initial public OWRXP-DNX skeleton"
git remote add origin https://github.com/KanotixPinguin/OWRXP-DNX.git
git push -u origin main
```

## After Live Export

Once the final working files are exported into `patches/live-export/`, commit again:

```powershell
git add patches/live-export
git commit -m "Add live exported DNX runtime files"
git push
```

## Suggested Next Branches

- `codex/public-build`
- `codex/docker-base`
- `codex/docs`
