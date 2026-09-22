const emailCred = "coolguy@gmail.com";
const anoNascimentoCred = 2008

const inptEmail = document.getElementById("inptEmail");
const inptAnoNascimento = document.getElementById("anoNascimento");
const button = document.getElementById("button");

button.onclick = () => {
    validade(inptEmail.value, inptAnoNascimento.value);
}

function validade(email, anoNascimento) {
    if (email === emailCred && anoNascimento <= anoNascimentoCred) {
        alert("Login bem-sucedido!");
    } else {
        alert("Email incorreto ou menor de dezoito anos. Tente novamente.");
    }
}