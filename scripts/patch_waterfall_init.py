from pathlib import Path
import sys


START = "/* OWRX_3D_WATERFALL_START */"
END = "/* OWRX_3D_WATERFALL_END */"


def main() -> int:
    if len(sys.argv) != 3:
        raise SystemExit("usage: python patch_waterfall_init.py <init.js> <waterfall-block.js>")

    init_path = Path(sys.argv[1])
    block_path = Path(sys.argv[2])

    text = init_path.read_text(encoding="utf-8", errors="ignore")
    block = block_path.read_text(encoding="utf-8", errors="ignore").strip() + "\n"

    start = text.find(START)
    end = text.find(END)

    if start != -1 and end != -1 and end > start:
      end += len(END)
      text = text[:start] + block + text[end:]
    else:
      if not text.endswith("\n"):
          text += "\n"
      text += "\n" + block

    init_path.write_text(text, encoding="utf-8")
    print(f"patched waterfall block into {init_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
