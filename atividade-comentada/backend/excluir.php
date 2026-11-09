<?php
// ============================================================
// excluir.php  —  DELETE: faz SOFT DELETE (marca ativo = 0)
// O registro NÃO é apagado de verdade: ele só some da listagem.
//
// >>> ATIVIDADE <<<  comente onde houver "// -> comentar aqui".
// ============================================================

require __DIR__ . "/config/cabecalhos.php";
require __DIR__ . "/config/db.php";

// Lê os dados enviados no corpo da requisição HTTP (em formato JSON) e converte em array
$body = json_decode(file_get_contents("php://input"), true);

// Obtém o ID do recado que será excluído (definindo 0 se o ID não for enviado)
$id = $body["id"] ?? 0;

try {
    // Prepara a query SQL para atualizar o status do recado para inativo (ativo = 0) em vez de apagá-lo definitivamente (soft delete)
    $sql = $pdo->prepare("UPDATE recados SET ativo = 0 WHERE id = ?");

    // Executa a query enviando o ID do recado de forma segura contra SQL Injection
    $sql->execute([$id]);

    // Retorna uma resposta em JSON confirmando o sucesso da exclusão
    echo json_encode(["status" => "ok"]);

} catch (PDOException $e) {
    // Se ocorrer algum erro ao atualizar o registro, define o código HTTP 500 e retorna uma mensagem de erro
    http_response_code(500);
    echo json_encode(["erro" => "Falha ao excluir"]);
}
