// Fallback e resolução de imagens da wiki oficial do Hollow Knight (hollowknight.wiki / cdn.wikimg.net)
// Os assets oficiais são servidos diretamente pela CDN (cdn.wikimg.net).
// Caso uma imagem não carregue ou venha de um link legado (Fandom / Special:FilePath),
// este script redireciona para o link oficial correspondente na CDN ou exibe a imagem padrão.

const IMAGEM_PADRAO = "data:image/svg+xml;utf8," + encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>" +
    "<rect width='200' height='200' fill='#0b0e1c'/>" +
    "<path d='M100 36c-31 0-54 23-54 58 0 36 21 68 54 68s54-32 54-68c0-35-23-58-54-58z' " +
    "fill='none' stroke='#94a3b8' stroke-width='6'/>" +
    "<ellipse cx='78' cy='98' rx='10' ry='19' fill='#94a3b8'/>" +
    "<ellipse cx='122' cy='98' rx='10' ry='19' fill='#94a3b8'/>" +
    "</svg>"
);

const WIKI_MAPA = {
    "Aluba.png": "https://cdn.wikimg.net/en/hkwiki/images/c/ce/B_Aluba.png",
    "Bardoon.png": "https://cdn.wikimg.net/en/hkwiki/images/2/24/Bardoon.png",
    "Blue_Child_Joni.png": "https://cdn.wikimg.net/en/hkwiki/images/9/96/Joni.png",
    "Bretta.png": "https://cdn.wikimg.net/en/hkwiki/images/9/96/Bretta.png",
    "Broken_Vessel.png": "https://cdn.wikimg.net/en/hkwiki/images/0/05/Broken_Vessel.png",
    "Brooding_Mawlek.png": "https://cdn.wikimg.net/en/hkwiki/images/b/b3/Brooding_Mawlek.png",
    "Brumm.png": "https://cdn.wikimg.net/en/hkwiki/images/5/5f/Brumm.png",
    "Charm_Lover_Salubra.png": "https://cdn.wikimg.net/en/hkwiki/images/e/ea/Salubra.png",
    "Cloth.png": "https://cdn.wikimg.net/en/hkwiki/images/5/51/Cloth.png",
    "Confessor_Jiji.png": "https://cdn.wikimg.net/en/hkwiki/images/6/65/Confessor_Jiji.png",
    "Cornifer.png": "https://cdn.wikimg.net/en/hkwiki/images/f/ff/Cornifer.png",
    "Crystal_Crawler.png": "https://cdn.wikimg.net/en/hkwiki/images/6/6e/B_Crystal_Crawler.png",
    "Crystal_Guardian.png": "https://cdn.wikimg.net/en/hkwiki/images/0/02/B_Crystal_Guardian.png",
    "Divine.png": "https://cdn.wikimg.net/en/hkwiki/images/f/f9/Divine.png",
    "Dung_Defender.png": "https://cdn.wikimg.net/en/hkwiki/images/0/0e/B_Dung_Defender.png",
    "Elder_Baldur.png": "https://cdn.wikimg.net/en/hkwiki/images/5/52/B_Elder_Baldur.png",
    "Elder_Hu.png": "https://cdn.wikimg.net/en/hkwiki/images/e/ed/B_Elder_Hu.png",
    "Elderbug.png": "https://cdn.wikimg.net/en/hkwiki/images/4/40/Elderbug.png",
    "Eternal_Emilitia.png": "https://cdn.wikimg.net/en/hkwiki/images/d/d7/Eternal_Emilitia.png",
    "False_Knight.png": "https://cdn.wikimg.net/en/hkwiki/images/9/98/B_False_Knight.png",
    "Fluke_Hermit.png": "https://cdn.wikimg.net/en/hkwiki/images/0/06/Fluke_Hermit.png",
    "Flukemarm.png": "https://cdn.wikimg.net/en/hkwiki/images/1/1b/B_Flukemarm.png",
    "Flukemon.png": "https://cdn.wikimg.net/en/hkwiki/images/f/f3/B_Flukemon.png",
    "Fool_Eater.png": "https://cdn.wikimg.net/en/hkwiki/images/c/ce/B_Fool_Eater.png",
    "Godseeker.png": "https://cdn.wikimg.net/en/hkwiki/images/d/d2/Godseeker.png",
    "Gorb.png": "https://cdn.wikimg.net/en/hkwiki/images/6/6c/B_Gorb.png",
    "Grey_Mourner.png": "https://cdn.wikimg.net/en/hkwiki/images/3/3d/Grey_Mourner.png",
    "Grimm.png": "https://cdn.wikimg.net/en/hkwiki/images/5/5b/B_Grimm.png",
    "Grubfather.png": "https://cdn.wikimg.net/en/hkwiki/images/b/be/Grubfather.png",
    "Gruz_Mother.png": "https://cdn.wikimg.net/en/hkwiki/images/9/9f/B_Gruz_Mother.png",
    "Herrah_the_Beast.png": "https://cdn.wikimg.net/en/hkwiki/images/b/bc/Herrah.png",
    "Hive_Guardian.png": "https://cdn.wikimg.net/en/hkwiki/images/f/f1/B_Hive_Guardian.png",
    "Hive_Knight.png": "https://cdn.wikimg.net/en/hkwiki/images/f/fd/Hive_Knight.png",
    "Hornet.png": "https://cdn.wikimg.net/en/hkwiki/images/8/89/B_Hornet.png",
    "Hunter.png": "https://cdn.wikimg.net/en/hkwiki/images/4/4b/Hunter.png",
    "Iselda.png": "https://cdn.wikimg.net/en/hkwiki/images/5/50/Iselda.png",
    "Leg_Eater.png": "https://cdn.wikimg.net/en/hkwiki/images/4/4a/Leg_Eater.png",
    "Lesser_Mawlek.png": "https://cdn.wikimg.net/en/hkwiki/images/9/90/B_Lesser_Mawlek.png",
    "Little_Fool.png": "https://cdn.wikimg.net/en/hkwiki/images/4/44/Little_Fool.png",
    "Little_Weaver.png": "https://cdn.wikimg.net/en/hkwiki/images/5/5b/B_Little_Weaver.png",
    "Lurien_the_Watcher.png": "https://cdn.wikimg.net/en/hkwiki/images/7/77/Lurien.png",
    "Mantis_Lords.png": "https://cdn.wikimg.net/en/hkwiki/images/d/d6/B_Mantis_Lords.png",
    "Mantis_Petra.png": "https://cdn.wikimg.net/en/hkwiki/images/a/ae/B_Mantis_Petra.png",
    "Mantis_Warrior.png": "https://cdn.wikimg.net/en/hkwiki/images/a/ae/B_Mantis_Warrior.png",
    "Marissa.png": "https://cdn.wikimg.net/en/hkwiki/images/d/d5/Marissa.png",
    "Maskfly.png": "https://cdn.wikimg.net/en/hkwiki/images/2/2a/B_Maskfly.png",
    "Massive_Moss_Charger.png": "https://cdn.wikimg.net/en/hkwiki/images/6/63/B_Massive_Moss_Charger.png",
    "Mato.png": "https://cdn.wikimg.net/en/hkwiki/images/6/61/Mato.png",
    "Midwife.png": "https://cdn.wikimg.net/en/hkwiki/images/e/ed/Midwife.png",
    "Millibelle_the_Banker.png": "https://cdn.wikimg.net/en/hkwiki/images/2/24/Millibelle.png",
    "Mister_Mushroom.png": "https://cdn.wikimg.net/en/hkwiki/images/f/fc/Mister_Mushroom.png",
    "Monomon_the_Teacher.png": "https://cdn.wikimg.net/en/hkwiki/images/1/14/Monomon.png",
    "Moss_Prophet.png": "https://cdn.wikimg.net/en/hkwiki/images/8/8b/Moss_Prophet.png",
    "Mosscreep.png": "https://cdn.wikimg.net/en/hkwiki/images/c/c1/B_Mosscreep.png",
    "Mosskin.png": "https://cdn.wikimg.net/en/hkwiki/images/f/fe/Mosskin.png",
    "Myla.png": "https://cdn.wikimg.net/en/hkwiki/images/b/b0/Myla.png",
    "Nailsmith.png": "https://cdn.wikimg.net/en/hkwiki/images/f/f6/Nailsmith_2.png",
    "No_Eyes.png": "https://cdn.wikimg.net/en/hkwiki/images/3/3b/B_No_Eyes.png",
    "Nosk.png": "https://cdn.wikimg.net/en/hkwiki/images/a/a8/B_Nosk.png",
    "Ooma.png": "https://cdn.wikimg.net/en/hkwiki/images/7/7e/B_Ooma.png",
    "Oro.png": "https://cdn.wikimg.net/en/hkwiki/images/4/4e/Oro.png",
    "Pale_King.png": "https://cdn.wikimg.net/en/hkwiki/images/3/32/Pale-King.png",
    "Poggy_Thorax.png": "https://cdn.wikimg.net/en/hkwiki/images/0/02/Poggy-Thorax.png",
    "Primal_Aspid.png": "https://cdn.wikimg.net/en/hkwiki/images/a/a8/B_Primal_Aspid.png",
    "Quirrel.png": "https://cdn.wikimg.net/en/hkwiki/images/c/cd/Quirrel_Idle.png",
    "Relic_Seeker_Lemm.png": "https://cdn.wikimg.net/en/hkwiki/images/b/be/Relic_Seeker_Lemm.png",
    "Royal_Retainer.png": "https://cdn.wikimg.net/en/hkwiki/images/8/87/B_Royal_Retainer.png",
    "Seer.png": "https://cdn.wikimg.net/en/hkwiki/images/e/ee/Seer.png",
    "Shadow_Creeper.png": "https://cdn.wikimg.net/en/hkwiki/images/b/bf/B_Shadow_Creeper.png",
    "Sheo.png": "https://cdn.wikimg.net/en/hkwiki/images/7/75/Nailmaster_Sheo.png",
    "Sly.png": "https://cdn.wikimg.net/en/hkwiki/images/f/f9/Sly.png",
    "Snail_Shaman.png": "https://cdn.wikimg.net/en/hkwiki/images/3/38/Snail_Shaman.png",
    "Soul_Master.png": "https://cdn.wikimg.net/en/hkwiki/images/7/72/B_Soul_Master.png",
    "Spore_Shroom.png": "https://cdn.wikimg.net/en/hkwiki/images/7/78/Spore_Shroom.png",
    "Squit.png": "https://cdn.wikimg.net/en/hkwiki/images/0/05/B_Squit.png",
    "Stalking_Devout.png": "https://cdn.wikimg.net/en/hkwiki/images/0/09/B_Stalking_Devout.png",
    "The_Last_Stag.png": "https://cdn.wikimg.net/en/hkwiki/images/a/af/Last_Stag.png",
    "Tiso.png": "https://cdn.wikimg.net/en/hkwiki/images/b/b1/Tiso.png",
    "Traitor_Lord.png": "https://cdn.wikimg.net/en/hkwiki/images/2/2c/B_Traitor_Lord.png",
    "Tuk.png": "https://cdn.wikimg.net/en/hkwiki/images/a/a1/Tuk.png",
    "Unn.png": "https://cdn.wikimg.net/en/hkwiki/images/b/ba/Unn.png",
    "Uoma.png": "https://cdn.wikimg.net/en/hkwiki/images/8/88/B_Uoma.png",
    "Uumuu.png": "https://cdn.wikimg.net/en/hkwiki/images/4/49/B_Uumuu.png",
    "Vengefly_King.png": "https://cdn.wikimg.net/en/hkwiki/images/4/41/B_Vengefly_King.png",
    "Vespa.png": "https://cdn.wikimg.net/en/hkwiki/images/f/f1/Vespa.png",
    "Void.png": "https://cdn.wikimg.net/en/hkwiki/images/4/49/Screenshot_HK_Void_Tendrils_01.png",
    "Void_Tendrils.png": "https://cdn.wikimg.net/en/hkwiki/images/b/b3/B_Void_Tendrils.png",
    "Watcher_Knight.png": "https://cdn.wikimg.net/en/hkwiki/images/1/1c/Watcher_Knight.png",
    "White_Lady.png": "https://cdn.wikimg.net/en/hkwiki/images/9/97/White_Lady_Full.png",
    "Willoh.png": "https://cdn.wikimg.net/en/hkwiki/images/4/43/Willoh.png",
    "Xero.png": "https://cdn.wikimg.net/en/hkwiki/images/e/ed/B_Xero.png",
    "Zote.png": "https://cdn.wikimg.net/en/hkwiki/images/5/5a/B_Zote.png",
    "Buzzer.png": "https://cdn.wikimg.net/en/hkwiki/images/e/e2/B_Vengefly.png",
    "Crystallized_Husk.png": "https://cdn.wikimg.net/en/hkwiki/images/f/f6/B_Crystallised_Husk.png",
    "Moss_Flyer.png": "https://cdn.wikimg.net/en/hkwiki/images/a/af/B_Mossfly.png",
    "Shade_Creeper.png": "https://cdn.wikimg.net/en/hkwiki/images/b/b3/B_Sibling.png",
    "Skeeter.png": "https://cdn.wikimg.net/en/hkwiki/images/6/65/B_Entombed_Husk.png",
    "Void_Bowl.png": "https://cdn.wikimg.net/en/hkwiki/images/4/4f/Screenshot_HK_Abyss_07.png"
};

function resolverImagemLegada(url) {
    if (!url) return null;
    const match = url.match(/Special:FilePath\/([^\s"'?>]+)/i) || url.match(/\/([^\/?#]+\.(?:png|jpg|jpeg|webp|gif))(?:\?|#|$)/i);
    if (match) {
        const nome = decodeURIComponent(match[1]);
        if (WIKI_MAPA[nome]) return WIKI_MAPA[nome];
        const nomeUnderline = nome.replace(/ /g, "_");
        if (WIKI_MAPA[nomeUnderline]) return WIKI_MAPA[nomeUnderline];
    }
    return null;
}

function trocarImagem(img) {
    if (img.dataset.padrao === "1") return;

    if (!img.dataset.resolvida) {
        img.dataset.resolvida = "1";
        const cdnUrl = resolverImagemLegada(img.src);
        if (cdnUrl && cdnUrl !== img.src) {
            img.src = cdnUrl;
            return;
        }
    }

    img.dataset.padrao = "1";
    img.src = IMAGEM_PADRAO;
}

// "error" não borbulha, então escutamos na fase de captura
document.addEventListener("error", (e) => {
    if (e.target.tagName === "IMG" && !e.target.closest(".mapa")) {
        trocarImagem(e.target);
    }
}, true);

// Imagens que já falharam antes deste script carregar
window.addEventListener("load", () => {
    document.querySelectorAll("img").forEach((img) => {
        if (!img.closest(".mapa") && img.complete && img.naturalWidth === 0) {
            trocarImagem(img);
        }
    });
});
