#!/usr/bin/env python3
"""Génère sitemap.xml et robots.txt. Usage : python scripts/build_seo.py [URL_DE_BASE]
L'URL de base doit se terminer par « / » (par défaut : GitHub Pages du dépôt)."""
import json, sys, datetime, pathlib
base = (sys.argv[1] if len(sys.argv) > 1 else "https://josoavj.github.io/restPeacePUBGM/").rstrip("/") + "/"
root = pathlib.Path(__file__).resolve().parent.parent
pages = ["", "joueur.html", "results.html", "news.html", "about.html", "partners.html", "contact.html", "inscription.html", "legal.html"]
ids = [p["id"] for p in json.load(open(root / "data/players-data.json", encoding="utf-8"))["players"]]
urls = pages + [f"player-detail.html?id={i}" for i in ids]
today = datetime.date.today().isoformat()
xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
xml += [f"  <url><loc>{base}{u}</loc><lastmod>{today}</lastmod></url>" for u in urls]
(root / "sitemap.xml").write_text("\n".join(xml + ["</urlset>", ""]), encoding="utf-8")
(root / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {base}sitemap.xml\n", encoding="utf-8")
print(f"{len(urls)} URLs -> sitemap.xml, robots.txt ({base})")
