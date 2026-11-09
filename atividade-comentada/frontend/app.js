// ============================================================
// app.js  —  o frontend conversa com o backend (GET, POST, DELETE)
//
// >>> ATIVIDADE <<<
// Comente o MÁXIMO possível deste arquivo. Onde houver
// "// -> comentar aqui", apague essa marca e escreva, com SUAS
// palavras, o que aquela linha ou aquele bloco faz. Capriche:
// quem lê o seu comentário tem que entender o código sem adivinhar.
// ============================================================

// Define o endereço base onde o servidor backend em PHP está rodando
const API = "http://localhost:8000";

// Seleciona os elementos principais da página HTML (tabela, campos de texto e botão de enviar) para uso no script
const tabela = document.getElementById("lista");
const inputAutor = document.getElementById("autor");
const inputMensagem = document.getElementById("mensagem");
const btnEnviar = document.getElementById("btnEnviar");


// ---------- READ · listar (GET) ----------
// Função responsável por buscar todos os recados ativos no backend e exibi-los na tabela
function carregarLista() {
  // Faz uma requisição GET para o endpoint que lista os recados
  fetch(`${API}/listar.php`)
    // Converte a resposta recebida do servidor para o formato JSON
    .then(resp => resp.json())
    // Recebe a lista de recados em formato de array e atualiza a interface
    .then(recados => {
      // Cria dinamicamente as linhas da tabela HTML para cada recado retornado pelo servidor
      tabela.innerHTML = recados.map(r => `
        <tr>
          <td>${r.autor}</td>
          <td>${r.mensagem}</td>
          <td><button onclick="excluir(${r.id})">Excluir</button></td>
        </tr>
      `).join("");
    })
    // Caso ocorra algum erro na requisição, exibe uma mensagem avisando que não foi possível carregar
    .catch(() => {
      tabela.innerHTML = "<tr><td colspan='3'>Não foi possível carregar.</td></tr>";
    });
}


// ---------- CREATE · cadastrar (POST) ----------
// Função acionada ao cadastrar um novo recado
function cadastrar() {
  // Cria um objeto JavaScript recolhendo o texto digitado nos campos de autor e mensagem
  const dados = {
    autor: inputAutor.value,
    mensagem: inputMensagem.value
  };

  // Faz uma requisição POST para o endpoint que salva novos recados
  fetch(`${API}/salvar.php`, {
    // Define o método HTTP como POST (usado para envio/criação de dados)
    method: "POST",
    // Informa ao backend que os dados enviados estão no formato JSON
    headers: { "Content-Type": "application/json" },
    // Converte o objeto de dados em uma string JSON para enviar no corpo da requisição
    body: JSON.stringify(dados)
  })
    .then(resp => resp.json())
    // Executado após o salvamento ser concluído com sucesso
    .then(() => {
      // Limpa os campos do formulário para que fiquem vazios novamente
      inputAutor.value = "";
      inputMensagem.value = "";
      // Atualiza a tabela na tela para mostrar o recado recém-cadastrado
      carregarLista();
    });
}


// ---------- DELETE · excluir (soft delete no backend) ----------
// Função responsável por excluir (inativar) um recado com base no ID recebido
function excluir(id) {
  // Faz uma requisição DELETE para o backend informando qual recado deve ser inativado
  fetch(`${API}/excluir.php`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    // Envia o ID do recado convertido para string JSON no corpo da requisição
    body: JSON.stringify({ id: id })
  })
    .then(resp => resp.json())
    // Após a exclusão ser concluída no servidor, atualiza a tabela da tela
    .then(() => carregarLista());
}


// Configura o botão de envio para chamar a função cadastrar quando for clicado
btnEnviar.onclick = cadastrar;

// Carrega a lista de recados automaticamente assim que a página é aberta no navegador
carregarLista();
