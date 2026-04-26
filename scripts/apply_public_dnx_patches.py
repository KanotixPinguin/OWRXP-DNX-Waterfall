from pathlib import Path
import shutil
import sys


FILES = {
    "openwebrx.js": Path("/usr/lib/python3/dist-packages/htdocs/openwebrx.js"),
    "custom.css": Path("/usr/lib/python3/dist-packages/htdocs/css/custom.css"),
    "init.js": Path("/usr/lib/python3/dist-packages/htdocs/plugins/receiver/init.js"),
    "dnx_matrix.js": Path("/usr/lib/python3/dist-packages/htdocs/plugins/receiver/dnx_matrix/dnx_matrix.js"),
    "dnx_matrix.css": Path("/usr/lib/python3/dist-packages/htdocs/plugins/receiver/dnx_matrix/dnx_matrix.css"),
}


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("usage: python apply_public_dnx_patches.py <live-export-dir>")

    source_dir = Path(sys.argv[1])
    if not source_dir.exists():
        raise SystemExit(f"source dir not found: {source_dir}")

    for name, target in FILES.items():
        source = source_dir / name
        if not source.exists():
            print(f"skip missing {source}")
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
        print(f"copied {source} -> {target}")


if __name__ == "__main__":
    main()
