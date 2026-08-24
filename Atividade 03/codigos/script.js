function verificarMaior() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);
  let resultado = document.getElementById("resultado");

  if (n1 > n2) {
    resultado.innerText = "O maior valor é: " + n1;
    resultado.style.color = "#4ade80";
  } else if (n2 > n1) {
    resultado.innerText = "O maior valor é: " + n2;
    resultado.style.color = "#4ade80";
  } else {
    resultado.innerText = "Os dois valores são iguais";
    resultado.style.color = "#facc15";
  }
}

function somar() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);
  alert("Soma: " + (n1 + n2));
}

function subtrair() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);
  alert("Subtração: " + (n1 - n2));
}

function multiplicar() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);
  alert("Multiplicação: " + (n1 * n2));
}

function dividir() {
  let n1 = Number(document.getElementById("num1").value);
  let n2 = Number(document.getElementById("num2").value);
  alert("Divisão: " + (n1 / n2));
}

function limpar() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("resultado").innerText = "";
}