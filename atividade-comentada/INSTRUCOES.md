# Atividade — Comentar o código (Mural da Turma)

Um site completo e pequeno: **frontend** (HTML/CSS/JS), **backend** (PHP) e
**banco** (MySQL). O código já funciona. **A sua tarefa não é programar — é
entender e comentar.**

## O que você deve fazer

Em todos os arquivos de código há marcações assim:

```
// -> comentar aqui
```

Para **cada** uma delas: apague a marca e escreva, **com suas palavras**, o
que aquela linha (ou aquele bloco logo abaixo) faz. Comente o **máximo
possível** — tanto no frontend quanto no backend.

Um bom comentário explica o **porquê**, não só repete o código. Exemplo:

```js
// ruim:  envia um fetch
// bom:   pede ao backend a lista de recados; o GET é o verbo padrão do fetch
fetch(`${API}/listar.php`)
```

## Arquivos para comentar

**Frontend** (`frontend/`)
- `app.js` — é o principal. GET (listar), POST (cadastrar) e DELETE (excluir).

**Backend** (`backend/`)
- `config/cabecalhos.php` — CORS e preflight OPTIONS
- `config/db.php` — conexão com o banco (PDO + .env)
- `listar.php` — READ (GET)
- `salvar.php` — CREATE (POST)
- `excluir.php` — DELETE (soft delete)

## Boas práticas que já estão no código (saiba apontá-las no seu comentário)

- **CORS + preflight OPTIONS** antes de qualquer resposta
- **Prepared statements** (`prepare` + `execute`) — contra SQL injection
- **Credenciais no `.env`**, fora do código
- **`try/catch`** no acesso ao banco, respondendo sempre em JSON
- **Novo GET após cada mudança** (a tabela se atualiza sozinha)
- **Soft delete**: excluir marca `ativo = 0`, não apaga a linha

## Como rodar (opcional, para testar)

1. Crie o banco: rode `banco/schema.sql` no MySQL.
2. Copie `.env.example` para `.env` e preencha com o seu MySQL.
3. Backend: dentro de `backend/`, rode `php -S localhost:8000`.
4. Frontend: abra `frontend/index.html` no **Live Server**.

## Entrega

Entregue os mesmos arquivos, agora **comentados por você**. Não deixe nenhuma
marca `// -> comentar aqui` para trás.
