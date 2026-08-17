console.log("Bom dia mundo em que eu vivo")

const inptNome = document.getElementById("inptNome")
const inptSenha = document.getElementById("inptSenha")
const btnEnviar = document.getElementById("btnEnviar")

//function click(){
//    console.log("Cliquei")
//}

// btnEnviar.onclick(this.click())

// btnEnviar.onclick = function(){
//    console.log("Cliquei")
// }


btnEnviar.onclick(() => {
    console.log("Cliquei")
})