<?php
// ============================================================
// salvar.php  —  CREATE (POST): grava um novo recado no banco
//
// >>> ATIVIDADE <<<  comente onde houver "// -> comentar aqui".
// ============================================================

require __DIR__ . "/config/cabecalhos.php";
require __DIR__ . "/config/db.php";

// Lê os dados enviados no corpo da requisição HTTP (em formato JSON) e os transforma em um array associativo
$body = json_decode(file_get_contents("php://input"), true);

// Extrai e limpa os campos autor e mensagem (removendo espaços extras nas pontas), definindo uma string vazia caso não existam
$autor    = trim($body["autor"] ?? "");
$mensagem = trim($body["mensagem"] ?? "");

// Verifica se o autor ou a mensagem foram deixados em branco
if ($autor === "" || $mensagem === "") {
    // Retorna o código HTTP 400 (Requisição Inválida) informando que os campos obrigatórios precisam ser preenchidos
    http_response_code(400);
    echo json_encode(["erro" => "Preencha autor e mensagem"]);
    exit;
}

try {
    // Prepara a instrução SQL de inserção utilizando placeholders (?) para prevenir ataques de SQL Injection
    $sql = $pdo->prepare("INSERT INTO recados (autor, mensagem) VALUES (?, ?)");

    // Executa a query preparada enviando os valores validados do autor e da mensagem
    $sql->execute([$autor, $mensagem]);

    // Retorna uma resposta em JSON indicando sucesso e informando o ID gerado para o novo recado
    echo json_encode(["status" => "ok", "id" => $pdo->lastInsertId()]);

} catch (PDOException $e) {
    // Se ocorrer algum erro ao salvar no banco, define o código HTTP 500 e retorna uma mensagem de erro
    http_response_code(500);
    echo json_encode(["erro" => "Falha ao salvar"]);
}
