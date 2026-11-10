const API = window.location.port === "3000" ? "/backend" : "http://localhost:8000";
const TIPOS = ["NPC", "Espírito", "Região", "Lore"];

const corpoTabela = document.getElementById("corpoTabela");
const divMensagem = document.getElementById("mensagem");


// Mostra uma mensagem de sucesso (verde) ou de erro (vermelha)
function mostrarMensagem(texto, erro = false) {
    divMensagem.textContent = texto;
    divMensagem.className = erro ? "mensagem erro" : "mensagem sucesso";
}

// Evita que texto vindo do banco seja interpretado como HTML (XSS)
function escapar(texto) {
    return String(texto ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Monta uma linha da tabela. O id do registro fica na própria linha (data-id)
// e é ele que vai nas chamadas de PUT e DELETE.
function montarLinha(item) {
    const opcoesTipo = TIPOS.map((t) =>
        `<option value="${escapar(t)}" ${t === item.tipo ? "selected" : ""}>${escapar(t)}</option>`
    ).join("");

    return `
        <tr data-id="${item.id}">
            <td class="col-id">${item.id}</td>
            <td class="col-imagem">
                <img src="${escapar(item.imagem_url)}" alt="${escapar(item.nome)}" loading="lazy">
            </td>
            <td><input type="text" class="campo-nome" value="${escapar(item.nome)}" maxlength="100"></td>
            <td><input type="text" class="campo-regiao" list="listaRegioes" value="${escapar(item.regiao)}" maxlength="100"></td>
            <td><select class="campo-tipo">${opcoesTipo}</select></td>
            <td>
                <textarea class="campo-descricao" rows="3">${escapar(item.descricao)}</textarea>
                <input type="url" class="campo-imagem" value="${escapar(item.imagem_url)}" maxlength="500" placeholder="URL da imagem">
            </td>
            <td class="col-acoes">
                <button type="button" class="botao botao-atualizar" onclick="atualizar(${item.id})">Atualizar</button>
                <button type="button" class="botao botao-excluir" onclick="excluir(${item.id})">Excluir</button>
            </td>
        </tr>`;
}

// ---------- READ: GET ----------
function listar() {
    return fetch(`${API}/read.php`)               // GET é o método padrão do fetch
        .then((resposta) => resposta.json())
        .then((resultado) => {
            if (!resultado.sucesso) {
                throw new Error(resultado.mensagem);
            }
            // map: transforma cada registro do banco em uma linha <tr>
            corpoTabela.innerHTML = resultado.dados.map(montarLinha).join("");
            if (resultado.dados.length === 0) {
                corpoTabela.innerHTML = `<tr><td colspan="7" class="vazio">Nenhum registro encontrado.</td></tr>`;
            }
        })
        .catch(() => {
            mostrarMensagem("Não foi possível carregar os registros. O backend (PHP) está rodando?", true);
        });
}

// ---------- CREATE: POST ----------
function cadastrar() {
    const novo = {
        nome: document.getElementById("nome").value,
        regiao: document.getElementById("regiao").value,
        tipo: document.getElementById("tipo").value,
        descricao: document.getElementById("descricao").value,
        imagem_url: document.getElementById("imagem_url").value
    };

    if (!novo.nome.trim() || !novo.regiao.trim() || !novo.descricao.trim()) {
        mostrarMensagem("Preencha nome, região e descrição.", true);
        return;
    }

    fetch(`${API}/create.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo)
    })
        .then((resposta) => resposta.json())
        .then((resultado) => {
            mostrarMensagem(resultado.mensagem, !resultado.sucesso);
            if (resultado.sucesso) {
                document.getElementById("nome").value = "";
                document.getElementById("regiao").value = "";
                document.getElementById("descricao").value = "";
                document.getElementById("imagem_url").value = "";
                listar();                           // novo GET após modificar o banco
            }
        })
        .catch(() => mostrarMensagem("Erro de comunicação com o servidor.", true));
}

// ---------- UPDATE: PUT ----------
// O usuário edita os campos da própria linha e clica em "Atualizar".
// Lemos os valores dessa linha (localizada pelo id) e enviamos com PUT.
function atualizar(id) {
    const linha = document.querySelector(`tr[data-id="${id}"]`);

    const alterado = {
        id: id,
        nome: linha.querySelector(".campo-nome").value,
        regiao: linha.querySelector(".campo-regiao").value,
        tipo: linha.querySelector(".campo-tipo").value,
        descricao: linha.querySelector(".campo-descricao").value,
        imagem_url: linha.querySelector(".campo-imagem").value
    };

    fetch(`${API}/update.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alterado)
    })
        .then((resposta) => resposta.json())
        .then((resultado) => {
            mostrarMensagem(resultado.mensagem, !resultado.sucesso);
            listar();                               // novo GET (também desfaz edições inválidas)
        })
        .catch(() => mostrarMensagem("Erro de comunicação com o servidor.", true));
}

// ---------- DELETE: DELETE (soft delete no banco) ----------
function excluir(id) {
    if (!confirm("Deseja excluir este registro?")) {
        return;
    }

    fetch(`${API}/delete.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    })
        .then((resposta) => resposta.json())
        .then((resultado) => {
            mostrarMensagem(resultado.mensagem, !resultado.sucesso);
            listar();                               // novo GET: o registro some da tabela
        })
        .catch(() => mostrarMensagem("Erro de comunicação com o servidor.", true));
}

// ---------- início ----------
document.getElementById("btnCadastrar").addEventListener("click", cadastrar);
listar();                                            // lista assim que a página carrega
