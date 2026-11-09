<?php
// ============================================================
// listar.php  —  READ (GET): devolve os recados ATIVOS em JSON
//
// >>> ATIVIDADE <<<  comente onde houver "// -> comentar aqui".
// ============================================================

// Inclui os cabeçalhos de resposta HTTP e as regras de CORS
require __DIR__ . "/config/cabecalhos.php";
// Inclui o arquivo de conexão com o banco de dados (que disponibiliza a variável $pdo)
require __DIR__ . "/config/db.php";

try {
    // Executa uma consulta SQL para buscar o id, autor e mensagem dos recados ativos (ativo = 1), ordenando do mais recente para o mais antigo
    $sql = $pdo->query(
        "SELECT id, autor, mensagem FROM recados WHERE ativo = 1 ORDER BY id DESC"
    );

    // Recupera todos os registros encontrados na consulta como um array associativo
    $recados = $sql->fetchAll(PDO::FETCH_ASSOC);

    // Converte o array de recados para o formato JSON e o envia como resposta para o cliente
    echo json_encode($recados);

} catch (PDOException $e) {
    // Se ocorrer algum erro durante a consulta ao banco, define o código HTTP como 500 (erro interno)
    http_response_code(500);
    echo json_encode(["erro" => "Falha ao listar"]);
}
