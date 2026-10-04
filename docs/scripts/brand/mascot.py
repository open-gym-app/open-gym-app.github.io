# The flat Titan mascot set, generated from one geometry source. Run: python3 mascot.py
# Writes static/brand/svg/; see the Brand page (docs/developers/brand.mdx) for the whole kit.
from pathlib import Path
SVG = Path(__file__).resolve().parents[2] / "static/brand/svg"
INK, ORANGE, CREAM = "#1A1A1A", "#FF5A2B", "#FAFAF7"
KEY, OUT = 5, 8  # ink keyline around the fills, then the cream sticker band

def mirror(d):  # mirror a path in x around 128 (only absolute M/L/H/V/C/Q/Z with numbers)
    import re
    toks = re.findall(r"[MLHVCQZ]|-?\d+(?:\.\d+)?", d)
    out, cmd, i, xy = [], None, 0, 0
    for t in toks:
        if t.isalpha():
            cmd = t; out.append(t); xy = 0; continue
        v = float(t)
        if cmd == "H" or (cmd in "MLCQ" and xy % 2 == 0):
            v = 256 - v
        if cmd in "MLCQ": xy += 1
        out.append(f"{v:g}")
    return " ".join(out)

# ---- geometry (256 grid) ----
head_cream = ("M40 58 Q40 50 48 50 H64 Q70 50 70 56 V66 H186 V56 Q186 50 192 50 H208 Q216 50 216 58 "
              "V126 Q216 134 208 134 H192 Q186 134 186 128 V118 H70 V128 Q70 134 64 134 H48 Q40 134 40 126 Z")
disc_l = "M26 72 Q26 62 36 62 H48 V122 H36 Q26 122 26 112 Z"
torso = "M82 118 H174 V142 L156 150 V206 H100 V150 L82 142 Z"
arm_l = ("M86 122 C56 122 38 146 40 170 C42 192 64 200 86 196 L106 190 V168 L88 174 "
         "C72 177 62 172 62 162 C62 150 72 144 86 144 Z")
leg_l = "M100 200 H120 V238 H74 Q74 222 86 214 Q96 208 100 200 Z"
parts_black = [disc_l, mirror(disc_l), arm_l, mirror(arm_l), leg_l, mirror(leg_l)]

brow_l = "M94 74 L118 84 L116 90 L92 80 Z"
eye_l = (106, 94, 7)
smile = "M116 106 Q128 116 140 106"
rays = ["M128 18 V38", "M100 26 L108 42", "M156 26 L148 42"]

def face(ink):
    s = f'<path d="{brow_l}" fill="{ink}"/><path d="{mirror(brow_l)}" fill="{ink}"/>'
    s += f'<circle cx="{eye_l[0]}" cy="{eye_l[1]}" r="{eye_l[2]}" fill="{ink}"/>'
    s += f'<circle cx="{256-eye_l[0]}" cy="{eye_l[1]}" r="{eye_l[2]}" fill="{ink}"/>'
    s += f'<path d="{smile}" fill="none" stroke="{ink}" stroke-width="6" stroke-linecap="round"/>'
    return s

def outline_layers(paths, ink, cream, sticker):
    s = ""
    for col, w, on in ((cream, 2 * (KEY + OUT), sticker), (ink, 2 * KEY, True)):
        if on:
            s += f'<g fill="{col}" stroke="{col}" stroke-width="{w}" stroke-linejoin="round">'
            s += "".join(f'<path d="{d}"/>' for d in paths) + "</g>"
    return s

def mascot(ink=INK, orange=ORANGE, cream=CREAM, outline=True, with_rays=True, rays_col=None):
    body = parts_black + [torso, head_cream]
    s = ""
    s += outline_layers(body, ink, cream, outline)
    s += "".join(f'<path d="{d}" fill="{ink}"/>' for d in parts_black)
    s += f'<path d="{torso}" fill="{orange}"/>'
    s += f'<path d="{head_cream}" fill="{cream}"/>'
    s += face(ink)
    if with_rays:
        s += "".join(f'<path d="{d}" stroke="{rays_col or orange}" stroke-width="7" stroke-linecap="round"/>' for d in rays)
    return s

def head(ink=INK, cream=CREAM, outline=True):
    s = ""
    s += outline_layers([disc_l, mirror(disc_l), head_cream], ink, cream, outline)
    s += f'<path d="{disc_l}" fill="{ink}"/><path d="{mirror(disc_l)}" fill="{ink}"/>'
    s += f'<path d="{head_cream}" fill="{cream}"/>' + face(ink)
    return s

def svg(inner, vb="0 0 256 256", bg=None, title="Titan"):
    w, h = vb.split()[2:]
    b = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="{w}" height="{h}">'
            f'<title>{title}</title>{b}{inner}</svg>\n')

# Wordmark TITAN built from rectangles/polygons (cap height 72, stroke 16)
def wordmark(fill, x0, y0):
    H, S = 72, 16
    def T(x): return f'M{x} {y0} H{x+52} V{y0+S} H{x+34} V{y0+H} H{x+18} V{y0+S} H{x} Z'
    def I(x): return f'M{x} {y0} H{x+40} V{y0+S} H{x+28} V{y0+H-S} H{x+40} V{y0+H} H{x} V{y0+H-S} H{x+12} V{y0+S} H{x} Z'
    def A(x): return (f'M{x+18} {y0} H{x+38} L{x+56} {y0+H} H{x+40} L{x+36} {y0+H-16} H{x+20} L{x+16} {y0+H} H{x} Z '
                      f'M{x+23} {y0+H-30} H{x+33} L{x+28} {y0+20} Z')
    def N(x): return f'M{x} {y0} H{x+16} L{x+36} {y0+40} V{y0} H{x+52} V{y0+H} H{x+36} L{x+16} {y0+32} V{y0+H} H{x} Z'
    xs, d = x0, []
    for f, w in ((T, 52), (I, 40), (T, 52), (A, 56), (N, 52)):
        d.append(f(xs)); xs += w + 12
    return f'<path fill-rule="evenodd" d="{" ".join(d)}" fill="{fill}"/>', xs - 12

def lockup_art(dark=True):  # the lockup's drawing and its right edge, without a frame
    txt = CREAM if dark else INK
    wm, end = wordmark(txt, 280, 84)
    under = f'<rect x="280" y="176" width="{end-280}" height="10" rx="2" fill="{ORANGE}"/>'
    return mascot() + wm + under, end

def lockup(dark=True):
    inner, end = lockup_art(dark)
    return svg(inner, f"0 0 {int(end)+24} 256", bg=INK if dark else None, title="Titan logo")

# GitHub's social preview: 1280x640, opaque, with a 40 px border it may crop. The lockup is
# centred on its drawn extent (x 13..580, the sticker band to the wordmark; y 14..251, the
# rays to the feet), not on its viewBox, which is padded unevenly.
def banner(dark=True):
    inner, _ = lockup_art(dark)
    s, cx, cy = 1.8, 296.5, 132.5
    g = f'<g transform="translate({640 - cx * s:g} {320 - cy * s:g}) scale({s:g})">{inner}</g>'
    return svg(g, "0 0 1280 640", bg=INK if dark else CREAM, title="Titan banner")

files = {
    "titan-mascot.svg": svg(mascot()),
    "titan-mascot-on-dark.svg": svg(mascot(), bg=INK),
    "titan-mascot-no-outline.svg": svg(mascot(outline=False)),
    "titan-mascot-mono-black.svg": svg(mascot(ink="#000", orange="#fff", cream="#fff", outline=False, rays_col="#000")),
    "titan-head.svg": svg(f'<g transform="translate(0 38)">{head()}</g>'),
    "titan-lockup-dark.svg": lockup(True),
    "titan-lockup-light.svg": lockup(False),
    "titan-banner-dark.svg": banner(True),
    "titan-banner-light.svg": banner(False),
}
for n, c in files.items():
    (SVG / n).write_text(c)
