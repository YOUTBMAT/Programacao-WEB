<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(["sucesso" => false, "mensagem" => "Método não permitido."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// O id identifica o registro; os demais campos são os novos valores
if (!is_array($data) || !filter_var($data['id'] ?? null, FILTER_VALIDATE_INT) || trim($data['nome'] ?? '') === ''
    || trim($data['regiao'] ?? '') === '' || trim($data['tipo'] ?? '') === '' || trim($data['descricao'] ?? '') === '') {
    http_response_code(400);
    echo json_encode(["sucesso" => false, "mensagem" => "Dados incompletos."]);
    exit();
}

try {
    $stmt = $pdo->prepare("UPDATE hollow_knight_itens SET nome = :nome, regiao = :regiao, tipo = :tipo, descricao = :descricao, imagem_url = :imagem_url WHERE id = :id AND ativo = 1");
    $stmt->execute([
        ':id' => $data['id'],
        ':nome' => trim($data['nome']),
        ':regiao' => trim($data['regiao']),
        ':tipo' => trim($data['tipo']),
        ':descricao' => trim($data['descricao']),
        ':imagem_url' => trim($data['imagem_url'] ?? '')
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "sucesso" => true,
            "mensagem" => "Item atualizado com sucesso."
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Item não encontrado ou inativo."
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao atualizar o item."
    ]);
}
