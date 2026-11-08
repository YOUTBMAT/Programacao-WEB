<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["sucesso" => false, "mensagem" => "Método não permitido."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// Campos obrigatórios (a imagem é opcional)
if (!is_array($data) || trim($data['nome'] ?? '') === '' || trim($data['regiao'] ?? '') === ''
    || trim($data['tipo'] ?? '') === '' || trim($data['descricao'] ?? '') === '') {
    http_response_code(400);
    echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos."]);
    exit();
}

try {
    $stmt = $pdo->prepare("INSERT INTO hollow_knight_itens (nome, regiao, tipo, descricao, imagem_url, ativo) VALUES (:nome, :regiao, :tipo, :descricao, :imagem_url, 1)");
    $stmt->execute([
        ':nome' => trim($data['nome']),
        ':regiao' => trim($data['regiao']),
        ':tipo' => trim($data['tipo']),
        ':descricao' => trim($data['descricao']),
        ':imagem_url' => trim($data['imagem_url'] ?? '')
    ]);

    http_response_code(201);
    echo json_encode([
        "sucesso" => true,
        "mensagem" => "Item criado com sucesso.",
        "id" => $pdo->lastInsertId()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao criar o item."
    ]);
}
