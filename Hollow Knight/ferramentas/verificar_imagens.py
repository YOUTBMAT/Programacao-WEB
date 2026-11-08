# Verifica quais links de imagem do banco/páginas funcionam. Rode no seu PC (com internet):
#   python ferramentas/verificar_imagens.py
# Imagens oficiais vêm da CDN da wiki oficial (cdn.wikimg.net).
import re, urllib.request, urllib.error, pathlib

raiz = pathlib.Path(__file__).resolve().parent.parent
urls = set()
for arq in list((raiz / "paginas").rglob("*.html")) + [raiz / "backend" / "database.sql"]:
    texto = arq.read_text(encoding="utf8")
    urls |= set(re.findall(r"https?://[^\s\"')>]+\.(?:png|jpg|jpeg|webp|gif|svg)", texto))

ruins = []
for u in sorted(urls):
    try:
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as r:
            if r.status != 200:
                ruins.append((u, f"HTTP {r.status}"))
    except Exception as e:
        ruins.append((u, str(e)))

print(f"{len(urls) - len(ruins)} ok | {len(ruins)} com problema (Total: {len(urls)})")
for u, e in ruins:
    print(" ✗", u, "-", e)
