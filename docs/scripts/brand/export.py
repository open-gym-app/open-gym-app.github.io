# Renders the PNG exports and favicon.ico from static/brand/svg/. Run after mascot.py / icon.py.
#
#     python3 export.py                 # static/brand/png/, favicon.ico, and the site's own logo and favicon
#     python3 export.py --app ../titan  # ...and the app's Play Store icon
#
# Needs headless Chromium (or Chrome) and ImageMagick on PATH; set CHROME to use another binary.
import argparse, os, re, shutil, subprocess
from pathlib import Path

SITE = Path(__file__).resolve().parents[2]
BRAND = SITE / "static/brand"
SVG, PNG, IMG = BRAND / "svg", BRAND / "png", SITE / "static/img"

# (svg, output height in px, ...); width follows the viewBox.
EXPORTS = {
    "titan-mascot.svg": (256, 512, 1024),
    "titan-mascot-on-dark.svg": (1024,),
    "titan-mascot-no-outline.svg": (512,),
    "titan-mascot-mono-black.svg": (512,),
    "titan-head.svg": (512,),
    "titan-lockup-dark.svg": (256, 512),
    "titan-lockup-light.svg": (256, 512),
    "titan-play-icon.svg": (512,),  # Play Store listing icon
    "titan-favicon.svg": (16, 32, 48, 64, 180, 192, 512),
}

# Play rejects a listing icon with an alpha channel, even a fully opaque one.
OPAQUE = {"titan-play-icon-512.png"}

# Copies the site itself serves. The app's README loads img/logo.png from the live site, so
# that path stays.
SITE_COPIES = {
    "titan-mascot-256.png": IMG / "logo.png",
    "titan-favicon-64.png": IMG / "favicon.png",
}

# Copies written into the app checkout given with --app.
APP_COPIES = {
    "titan-play-icon-512.png": "release/store-assets/titan-play-icon-512.png",
}

def browser():
    if os.environ.get("CHROME"):
        return os.environ["CHROME"]
    for b in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable"):
        if shutil.which(b):
            return b
    raise SystemExit("needs Chromium or Chrome on PATH, or its path in CHROME")

def size(src: Path, height: int):
    vb = re.search(r'viewBox="([\d. -]+)"', src.read_text()).group(1).split()
    return round(height * float(vb[2]) / float(vb[3])), height

def render():
    # Every export goes on one page, captured in a single screenshot and cropped apart:
    # one browser launch instead of twenty, which a snap-confined Chromium otherwise hangs on.
    jobs, y, gap = [], 0, 8
    for name, heights in EXPORTS.items():
        for h in heights:
            w, h = size(SVG / name, h)
            jobs.append((SVG / name, PNG / f"{Path(name).stem}-{h}.png", w, h, y))
            y += h + gap
    width = max(j[2] for j in jobs)
    imgs = "".join(f'<img src="{src.as_uri()}" width="{w}" height="{h}" '
                   f'style="position:absolute;left:0;top:{top}px">' for src, _, w, h, top in jobs)
    PNG.mkdir(exist_ok=True)
    # Not /tmp and not a dotfile: a snap-confined Chromium can reach neither. Both files are
    # deleted below, even when the browser fails, so neither is ever committed.
    page, sheet = BRAND / "export-sheet.html", BRAND / "export-sheet.png"
    page.write_text(f'<html><body style="margin:0">{imgs}</body></html>')
    cmd = [browser(), "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
           "--default-background-color=00000000", f"--window-size={width},{y}",
           f"--screenshot={sheet}", page.as_uri()]
    try:
        for attempt in range(3):  # headless Chromium occasionally hangs on start-up; a retry clears it
            try:
                subprocess.run(cmd, check=True, capture_output=True, timeout=60)
                break
            except subprocess.TimeoutExpired:
                if attempt == 2:
                    raise
        for _, out, w, h, top in jobs:
            alpha = ["-background", "white", "-alpha", "remove", "-alpha", "off"] if out.name in OPAQUE else []
            subprocess.run(["magick", str(sheet), "-crop", f"{w}x{h}+0+{top}", "+repage", *alpha, str(out)],
                           check=True)
            print(out.relative_to(SITE))
    finally:
        page.unlink(missing_ok=True)
        sheet.unlink(missing_ok=True)
    fav = [PNG / f"titan-favicon-{s}.png" for s in (16, 32, 48)]
    for ico in (BRAND / "favicon.ico", IMG / "favicon.ico"):
        subprocess.run(["magick", *map(str, fav), str(ico)], check=True)
        print(ico.relative_to(SITE))

def copy(copies, root: Path):
    for name, dest in copies.items():
        dest = root / dest
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(PNG / name, dest)
        print(dest)

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--app", type=Path, help="a Titan app checkout to write the store assets into")
    args = ap.parse_args()
    if args.app and not (args.app / "app/src/main/AndroidManifest.xml").is_file():
        raise SystemExit(f"{args.app} is not a Titan checkout")
    render()
    copy(SITE_COPIES, SITE)
    if args.app:
        copy(APP_COPIES, args.app)
