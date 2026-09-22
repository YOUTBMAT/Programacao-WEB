console.log("CARREGANDO JOJO PARTS...");

let jojoParts = [
    {
        "partNumber": "Parte 1",
        "title": "Phantom Blood",
        "protagonista": "Jonathan Joestar",
        "villain": "Dio Brando"
    },
    {
        "partNumber": "Parte 2",
        "title": "Battle Tendency",
        "protagonista": "Joseph Joestar",
        "villain": "Kars"
    },
    {
        "partNumber": "Parte 3",
        "title": "Stardust Crusaders",
        "protagonista": "Jotaro Kujo",
        "villain": "DIO"
    },
    {
        "partNumber": "Parte 4",
        "title": "Diamond is Unbreakable",
        "protagonista": "Josuke Higashikata",
        "villain": "Yoshikage Kira"
    },
    {
        "partNumber": "Parte 5",
        "title": "Golden Wind",
        "protagonista": "Giorno Giovanna",
        "villain": "Diavolo"
    },
    {
        "partNumber": "Parte 6",
        "title": "Stone Ocean",
        "protagonista": "Jolyne Cujoh",
        "villain": "Enrico Pucci"
    }
];

const tabelaCorpo = document.getElementById("tabelaCorpo");

let renderRows = jojoParts.map(item => `
    <tr>
        <td>${item.partNumber}</td>
        <td>${item.title}</td>
        <td>${item.protagonista}</td>
        <td>${item.villain}</td>
    </tr>
`).join("");

console.log(renderRows);

tabelaCorpo.innerHTML = renderRows;