console.log("JS rodando")
const tabelaCorpo = document.getElementById("tabelaCorpo")


function getData(){
    console.log("Pegando dados")
    // fetch, usando o verbo GET, get-dados.php
    fetch("https://localhost:8000/get-dados.php")
    .then(Response)
}