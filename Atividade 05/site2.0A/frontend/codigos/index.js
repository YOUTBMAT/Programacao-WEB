console.log("aqui é meu JS rodando!")
const inptNome = document.getElementById("inptNome")
const inptSenha = document.getElementById("inptSenha")
const inptEmail = document.getElementById("inptEmail")
const inptIdade = document.getElementById("inptIdade")
const inptCidade = document.getElementById("inptCidade")
const btnEnviar = document.getElementById("btnEnviar")
const lblId = document.getElementById("lblId")
const lblErro = document.getElementById("lblErro")

// valida os campos antes de mandar
function validarCampos(){
    const campos = [inptNome, inptSenha, inptEmail, inptIdade, inptCidade]
    const vazio = campos.some(campo => campo.value.trim() === "")

    if(vazio){
        lblErro.textContent = "Preencha todos os campos antes de enviar."
        return false
    }

    lblErro.textContent = ""
    return true
}

//funcao anonima
btnEnviar.onclick = function(){
    console.log("Cliquei no botão")

    if(!validarCampos()){
        console.log("Campos inválidos, envio cancelado")
        return
    }

    const data = {
        nome: inptNome.value,
        senha: inptSenha.value,
        email: inptEmail.value,
        idade: inptIdade.value,
        cidade: inptCidade.value
    }

    //adicionar uma chamada para a minha API

     fetch("http://localhost:8000/", {
        method: "POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data) 
    }).then(response => response.json()) 
    .then(data => {
        console.log('Success from PHP:', data);
    })




};
