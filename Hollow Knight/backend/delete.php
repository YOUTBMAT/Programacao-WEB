<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(["sucesso" => false, "mensagem" => "Método não permitido."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'] ?? $_GET['id'] ?? null;

if (!filter_var($id, FILTER_VALIDATE_INT)) {
    http_response_code(400);
    echo json_encode(["sucesso" => false, "mensagem" => "ID inválido ou não informado."]);
    exit();
}

try {
    $stmt = $pdo->prepare("UPDATE hollow_knight_itens SET ativo = 0 WHERE id = :id AND ativo = 1");
    $stmt->execute([':id' => $id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "sucesso" => true,
            "mensagem" => "Item desativado com sucesso (soft delete)."
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "sucesso" => false,
            "mensagem" => "Item não encontrado ou já inativo."
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro ao desativar o item."
    ]);
}
