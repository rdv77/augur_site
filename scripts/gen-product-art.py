#!/usr/bin/env python3
"""Generate unique 16:9 product illustrations in the Auria palette."""

from __future__ import annotations

import math
import os
import random
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageChops

W, H = 1600, 900
ASSETS = "/workspace/public/assets"
OUT = ASSETS

NAVY = (11, 15, 25)
CYAN = (0, 212, 255)
GOLD = (196, 163, 90)
TEAL = (26, 107, 122)
ORANGE = (232, 93, 74)


def load_cover(path: str, size=(W, H), focus=(0.5, 0.4)) -> Image.Image:
    im = Image.open(path).convert("RGB")
    tw, th = size
    scale = max(tw / im.width, th / im.height)
    nw, nh = int(im.width * scale), int(im.height * scale)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left = int((nw - tw) * focus[0])
    top = int((nh - th) * focus[1])
    left = max(0, min(left, nw - tw))
    top = max(0, min(top, nh - th))
    return im.crop((left, top, left + tw, top + th))


def navy_canvas() -> Image.Image:
    img = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(img, "RGBA")
    for i in range(18):
        x = int(W * 0.55 + i * 28)
        a = 18 - i
        draw.ellipse((x, -80, x + 520, H + 80), fill=(0, 40, 70, a))
    return img


def overlay(base: Image.Image, photo: Image.Image, opacity: float) -> Image.Image:
    photo = ImageEnhance.Brightness(photo).enhance(0.72)
    photo = ImageEnhance.Color(photo).enhance(0.85)
    photo = ImageEnhance.Contrast(photo).enhance(1.08)
    return Image.blend(base, photo, opacity)


def layer() -> tuple[Image.Image, ImageDraw.ImageDraw]:
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    return im, ImageDraw.Draw(im, "RGBA")


def glow(draw: ImageDraw.ImageDraw, xy, r, color, a=90):
    x, y = xy
    draw.ellipse((x - r, y - r, x + r, y + r), fill=(*color, a))


def vignette(img: Image.Image) -> Image.Image:
    v, d = layer()
    d.rectangle((0, 0, W, H), fill=(11, 15, 25, 0))
    for i in range(40):
        a = int(6 + i * 1.4)
        d.rectangle((i * 2, i * 2, W - i * 2, H - i * 2), outline=(11, 15, 25, a))
    left = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(left)
    for i in range(280):
        ld.line([(i, 0), (i, H)], fill=(11, 15, 25, int(160 * (1 - i / 280))))
    img = img.convert("RGBA")
    img = Image.alpha_composite(img, v.filter(ImageFilter.GaussianBlur(24)))
    img = Image.alpha_composite(img, left)
    return img.convert("RGB")


def dots_grid(draw, color=CYAN, step=48, a=28):
    for x in range(0, W, step):
        for y in range(0, H, step):
            draw.ellipse((x, y, x + 2, y + 2), fill=(*color, a))


def save(img: Image.Image, name: str):
    img = vignette(img)
    path = os.path.join(OUT, name)
    img.convert("RGB").save(path, "JPEG", quality=88, optimize=True)
    print("wrote", name, os.path.getsize(path))


def digital_twin():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/city.jpg", focus=(0.5, 0.35))
    img = overlay(base, photo, 0.55)
    L, d = layer()
    dots_grid(d, a=22)
    # isometric district frames
    pts = [(980, 260), (1180, 340), (1080, 480), (860, 420), (1240, 520)]
    for i, (x, y) in enumerate(pts):
        w, h = 110, 70
        d.polygon(
            [(x, y), (x + w, y + 18), (x + w - 10, y + h), (x - 18, y + h - 18)],
            outline=(*CYAN, 160),
        )
        glow(d, (x + 40, y + 30), 26, CYAN, 40)
    # connecting filaments
    for i in range(len(pts) - 1):
        d.line([pts[i], pts[i + 1]], fill=(*CYAN, 90), width=2)
    img = Image.alpha_composite(img.convert("RGBA"), L.filter(ImageFilter.GaussianBlur(0.6)))
    save(img, "product-digital-twin.jpg")


def early_warning():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/monitoring.jpg", focus=(0.55, 0.4))
    img = overlay(base, photo, 0.42)
    L, d = layer()
    hotspots = [(720, 360), (980, 280), (1100, 520), (840, 560), (1240, 400)]
    for i, (x, y) in enumerate(hotspots):
        col = ORANGE if i % 2 == 0 else (255, 140, 80)
        for r, a in ((140, 28), (90, 50), (40, 90)):
            glow(d, (x, y), r, col, a)
        d.ellipse((x - 8, y - 8, x + 8, y + 8), fill=(*col, 200))
        d.ellipse((x - 70, y - 70, x + 70, y + 70), outline=(*col, 110), width=2)
    img = Image.alpha_composite(img.convert("RGBA"), L.filter(ImageFilter.GaussianBlur(1.2)))
    save(img, "product-early-warning.jpg")


def regulatory():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/dashboard.jpg", focus=(0.5, 0.32))
    img = overlay(base, photo, 0.52)
    L, d = layer()
    # glass statute cards
    cards = [(680, 210, 300, 180), (860, 300, 320, 190), (1080, 250, 280, 170)]
    for x, y, w, h in cards:
        d.rounded_rectangle((x, y, x + w, y + h), radius=12, fill=(8, 20, 40, 90), outline=(*CYAN, 130), width=1)
    cx, cy = 1240, 560
    for r in (50, 100, 160):
        d.ellipse((cx - r, cy - r // 2, cx + r, cy + r // 2), outline=(*GOLD, 90), width=2)
    img = Image.alpha_composite(img.convert("RGBA"), L)
    save(img, "product-regulatory.jpg")


def stakeholders():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/agents.jpg", focus=(0.5, 0.45))
    img = overlay(base, photo, 0.5)
    L, d = layer()
    rng = random.Random(8)
    nodes = [(900 + rng.randint(-280, 320), 200 + rng.randint(0, 500)) for _ in range(16)]
    hubs = [(980, 360), (1180, 480), (820, 520)]
    nodes.extend(hubs)
    for a in nodes:
        for b in nodes:
            dist = math.hypot(a[0] - b[0], a[1] - b[1])
            if 80 < dist < 240 and rng.random() > 0.55:
                d.line([a, b], fill=(*GOLD, 70), width=1)
    for x, y in nodes:
        r = 7 if (x, y) not in hubs else 16
        glow(d, (x, y), r * 3, CYAN if r > 7 else GOLD, 50)
        d.ellipse((x - r, y - r, x + r, y + r), fill=(*CYAN, 200) if r > 7 else (*GOLD, 200))
    img = Image.alpha_composite(img.convert("RGBA"), L.filter(ImageFilter.GaussianBlur(0.4)))
    save(img, "product-stakeholders.jpg")


def media_navigator():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/prediction.jpg", focus=(0.6, 0.4))
    img = overlay(base, photo, 0.4)
    L, d = layer()
    panels = [
        (700, 180, 260, 150),
        (1020, 240, 300, 170),
        (820, 430, 240, 140),
        (1160, 480, 280, 160),
        (640, 520, 200, 120),
    ]
    for x, y, w, h in panels:
        d.rounded_rectangle((x, y, x + w, y + h), radius=10, fill=(8, 18, 36, 120), outline=(*CYAN, 150), width=2)
        for i in range(5):
            d.line([(x + 16, y + 28 + i * 18), (x + w - 20, y + 28 + i * 18)], fill=(*CYAN, 50), width=3)
    # stream curves
    for i in range(6):
        pts = []
        for t in range(20):
            px = 500 + t * 55
            py = 120 + i * 90 + int(70 * math.sin(t / 3 + i))
            pts.append((px, py))
        d.line(pts, fill=(*CYAN, 55), width=2)
    img = Image.alpha_composite(img.convert("RGBA"), L)
    save(img, "product-media.jpg")


def ai_lab():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/deep-research.jpg", focus=(0.5, 0.4))
    city = load_cover(f"{ASSETS}/city.jpg", (420, 240), focus=(0.5, 0.3))
    img = overlay(base, photo, 0.35)
    L, d = layer()
    frames = [(640, 200), (980, 170), (820, 470), (1160, 430)]
    for i, (x, y) in enumerate(frames):
        crop = city.resize((360, 200), Image.Resampling.LANCZOS)
        tmp = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        tmp.paste(crop, (x, y))
        L = Image.alpha_composite(L, tmp)
        d = ImageDraw.Draw(L, "RGBA")
        d.rectangle((x, y, x + 360, y + 200), outline=(*CYAN, 180), width=2)
        glow(d, (x + 180, y + 100), 40, CYAN, 25)
    img = Image.alpha_composite(img.convert("RGBA"), L)
    save(img, "product-ai-lab.jpg")


def migration():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/city.jpg", focus=(0.45, 0.45))
    img = overlay(base, photo, 0.4)
    L, d = layer()
    cities = [(620, 520), (860, 300), (1100, 420), (1280, 240), (980, 620), (1400, 520)]
    flows = [(0, 1), (0, 2), (1, 3), (2, 3), (2, 4), (3, 5), (4, 5), (1, 2)]
    for a, b in flows:
        x1, y1 = cities[a]
        x2, y2 = cities[b]
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2 - 50
        pts = []
        for t in range(21):
            u = t / 20
            px = (1 - u) ** 2 * x1 + 2 * (1 - u) * u * mx + u**2 * x2
            py = (1 - u) ** 2 * y1 + 2 * (1 - u) * u * my + u**2 * y2
            pts.append((px, py))
        d.line(pts, fill=(*CYAN, 130), width=3)
        # particles
        for t in (0.3, 0.6, 0.85):
            u = t
            px = (1 - u) ** 2 * x1 + 2 * (1 - u) * u * mx + u**2 * x2
            py = (1 - u) ** 2 * y1 + 2 * (1 - u) * u * my + u**2 * y2
            glow(d, (px, py), 8, CYAN, 160)
    for x, y in cities:
        glow(d, (x, y), 28, GOLD, 70)
        d.ellipse((x - 7, y - 7, x + 7, y + 7), fill=(*GOLD, 230))
    img = Image.alpha_composite(img.convert("RGBA"), L.filter(ImageFilter.GaussianBlur(0.5)))
    save(img, "product-migration.jpg")


def generative():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/dashboard.jpg", focus=(0.62, 0.28))
    img = overlay(base, photo, 0.55)
    L, d = layer()
    for i, (x, y, w, h) in enumerate([(720, 160, 240, 160), (980, 210, 280, 180), (860, 430, 260, 150)]):
        d.rounded_rectangle((x, y, x + w, y + h), radius=10, fill=(6, 16, 32, 80), outline=(*CYAN, 120), width=1)
        d.line([(x + 18, y + 28), (x + w - 18, y + 28)], fill=(*GOLD, 90), width=2)
    img = Image.alpha_composite(img.convert("RGBA"), L)
    save(img, "product-generative.jpg")


def strategist():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/circuit.jpg", focus=(0.55, 0.4))
    img = overlay(base, photo, 0.4)
    L, d = layer()
    # hex grid tokens
    hexes = [(820, 280), (980, 280), (1140, 280), (900, 420), (1060, 420), (1220, 420), (980, 560), (1140, 560)]
    for i, (x, y) in enumerate(hexes):
        r = 46
        pts = [(x + r * math.cos(math.pi / 3 * k), y + r * math.sin(math.pi / 3 * k)) for k in range(6)]
        d.polygon(pts, outline=(*CYAN, 140), fill=(0, 40, 70, 50))
        if i in (1, 4, 6):
            glow(d, (x, y), 18, GOLD, 140)
            d.ellipse((x - 8, y - 8, x + 8, y + 8), fill=(*GOLD, 230))
        else:
            d.ellipse((x - 5, y - 5, x + 5, y + 5), fill=(*CYAN, 180))
    d.line([(980, 280), (1060, 420), (980, 560)], fill=(*GOLD, 150), width=3)
    img = Image.alpha_composite(img.convert("RGBA"), L)
    save(img, "product-strategist.jpg")


def electoral():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/prediction.jpg", focus=(0.5, 0.45))
    img = overlay(base, photo, 0.45)
    L, d = layer()
    # choropleth blobs
    regions = [
        (780, 320, 90, (0, 180, 220)),
        (980, 280, 120, (0, 212, 255)),
        (1160, 400, 100, (20, 90, 140)),
        (900, 500, 110, (0, 150, 190)),
        (1240, 560, 80, (0, 212, 255)),
        (700, 540, 70, (30, 70, 110)),
    ]
    for x, y, r, col in regions:
        glow(d, (x, y), r, col, 70)
        d.ellipse((x - r * 0.55, y - r * 0.4, x + r * 0.55, y + r * 0.4), outline=(*CYAN, 90), width=2)
    # forecast ribbon
    pts = []
    for t in range(30):
        px = 640 + t * 30
        py = 200 + int(80 * math.sin(t / 4)) + t * 4
        pts.append((px, py))
    d.line(pts, fill=(*GOLD, 160), width=3)
    img = Image.alpha_composite(img.convert("RGBA"), L.filter(ImageFilter.GaussianBlur(0.8)))
    save(img, "product-electoral.jpg")


def sparring():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/agents.jpg", focus=(0.5, 0.48))
    img = overlay(base, photo, 0.5)
    # split tone
    tint = Image.new("RGB", (W, H), NAVY)
    left = Image.new("L", (W, H), 0)
    ld = ImageDraw.Draw(left)
    for x in range(W):
        v = 180 if x < W * 0.48 else (0 if x > W * 0.52 else int(180 * (1 - (x - W * 0.48) / (W * 0.04))))
        ld.line([(x, 0), (x, H)], fill=v)
    cyan_t = Image.new("RGB", (W, H), (0, 40, 70))
    gold_t = Image.new("RGB", (W, H), (50, 40, 18))
    img = Image.composite(Image.blend(img, cyan_t, 0.22), img, left)
    right = ImageChops.invert(left)
    img = Image.composite(Image.blend(img, gold_t, 0.22), img, right)
    L, d = layer()
    glow(d, (W // 2, H // 2), 80, CYAN, 70)
    d.line([(W // 2, 120), (W // 2, H - 120)], fill=(*CYAN, 80), width=2)
    img = Image.alpha_composite(img.convert("RGBA"), L.filter(ImageFilter.GaussianBlur(1.2)))
    save(img, "product-sparring.jpg")


def political_risk():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/monitoring.jpg", focus=(0.45, 0.5))
    img = overlay(base, photo, 0.38)
    img = ImageEnhance.Color(img).enhance(0.7)
    L, d = layer()
    # storm clouds
    for x, y, r in ((880, 180, 140), (1100, 140, 160), (1280, 220, 120)):
        glow(d, (x, y), r, (40, 50, 80), 110)
    # radar sweep
    cx, cy = 1080, 520
    for r in (80, 150, 230, 320):
        d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=(*CYAN, 70), width=2)
    d.pieslice((cx - 230, cy - 230, cx + 230, cy + 230), start=-20, end=35, fill=(0, 212, 255, 25))
    for x, y in ((980, 400), (1220, 360), (1180, 620)):
        glow(d, (x, y), 24, ORANGE, 140)
    img = Image.alpha_composite(img.convert("RGBA"), L.filter(ImageFilter.GaussianBlur(1.0)))
    save(img, "product-political-risk.jpg")


def program_builder():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/deep-research.jpg", focus=(0.55, 0.32))
    img = overlay(base, photo, 0.48)
    L, d = layer()
    # faint architectural wireframe of a program structure
    origin = (780, 620)
    levels = [3, 5, 4]
    y = origin[1]
    xs = [860, 1020, 1180]
    for i, n in enumerate(levels):
        y = 560 - i * 130
        row = [(760 + k * 160, y) for k in range(n)]
        for x, yy in row:
            d.rectangle((x, yy, x + 110, yy + 70), outline=(*CYAN, 130), width=1)
            d.line([(x + 12, yy + 22), (x + 98, yy + 22)], fill=(*GOLD, 70), width=2)
        if i > 0:
            prev_y = 560 - (i - 1) * 130
            d.line([(920, prev_y), (920, y + 70)], fill=(*CYAN, 70), width=1)
    img = Image.alpha_composite(img.convert("RGBA"), L)
    save(img, "product-program.jpg")


def coalition():
    base = navy_canvas()
    photo = load_cover(f"{ASSETS}/agents.jpg", focus=(0.6, 0.4))
    img = overlay(base, photo, 0.36)
    L, d = layer()
    center = (1040, 430)
    orbs = [
        (740, 260, GOLD),
        (780, 620, CYAN),
        (1280, 240, CYAN),
        (1320, 600, GOLD),
        (980, 180, TEAL),
    ]
    glow(d, center, 70, CYAN, 90)
    d.ellipse((center[0] - 22, center[1] - 22, center[0] + 22, center[1] + 22), fill=(*CYAN, 230))
    for x, y, col in orbs:
        d.line([center, (x, y)], fill=(*col, 120), width=3)
        glow(d, (x, y), 36, col, 100)
        d.ellipse((x - 14, y - 14, x + 14, y + 14), fill=(*col, 230))
    img = Image.alpha_composite(img.convert("RGBA"), L.filter(ImageFilter.GaussianBlur(0.5)))
    save(img, "product-coalition.jpg")


if __name__ == "__main__":
    digital_twin()
    early_warning()
    regulatory()
    stakeholders()
    media_navigator()
    ai_lab()
    migration()
    generative()
    strategist()
    electoral()
    sparring()
    political_risk()
    program_builder()
    coalition()
