<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["sucesso" => false, "mensagem" => "Método não permitido."]);
    exit();
}

try {
    $stmt = $pdo->prepare("SELECT id, nome, regiao, tipo, descricao, imagem_url, ativo FROM hollow_knight_itens WHERE ativo = 1 ORDER BY id DESC");
    $stmt->execute();
    $itens = $stmt->fetchAll();

    echo json_encode([
        "sucesso" => true,
        "dados" => $itens
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao buscar os itens."
    ]);
}
