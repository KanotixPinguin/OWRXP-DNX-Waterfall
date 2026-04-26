from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
LIVE = ROOT / "patches" / "live-export"

CHECKS = {
    "private_ipv4": re.compile(r"\b(?:10|127|169\.254|172\.(?:1[6-9]|2\d|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b"),
    "lora_mentions": re.compile(r"\blora\b", re.IGNORECASE),
    "hardcoded_vnc_lite": re.compile(r"vnc_lite\.html", re.IGNORECASE),
    "telegram_links": re.compile(r"https?://t\.me/", re.IGNORECASE),
    "freenode_links": re.compile(r"freenode", re.IGNORECASE),
    "private_password_words": re.compile(r"\b(password|passwd)\b", re.IGNORECASE),
}


def iter_files() -> list[Path]:
    return sorted(p for p in LIVE.iterdir() if p.is_file() and p.name != ".gitkeep")


def main() -> int:
    if not LIVE.exists():
        print(f"missing live export dir: {LIVE}")
        return 1

    findings = 0
    for path in iter_files():
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except OSError as exc:
            print(f"read error {path}: {exc}")
            findings += 1
            continue

        for name, pattern in CHECKS.items():
            for match in pattern.finditer(text):
                line_no = text.count("\n", 0, match.start()) + 1
                snippet = text.splitlines()[line_no - 1].strip()
                print(f"{path.name}:{line_no}: [{name}] {snippet}")
                findings += 1

    if findings:
        print(f"public export check failed with {findings} finding(s)")
        return 1

    print("public export check passed")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
