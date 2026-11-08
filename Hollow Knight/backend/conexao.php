<?php
// Configuração de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Tratamento de Preflight Request (OPTIONS)
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = "127.0.0.1";
$port = 3306;
$dbname = "hollow_knight_db";
$username = "root";
$password = "";

try {
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    // rowCount() passa a contar as linhas encontradas (e não só as alteradas),
    // assim um UPDATE com os mesmos valores não vira "não encontrado"
    if (defined('PDO::MYSQL_ATTR_FOUND_ROWS')) {
        $options[PDO::MYSQL_ATTR_FOUND_ROWS] = true;
    }

    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $username, $password, $options);

    // Se o script for acessado diretamente (teste no navegador ou curl)
    if (isset($_SERVER['SCRIPT_FILENAME']) && basename($_SERVER['SCRIPT_FILENAME']) === basename(__FILE__)) {
        echo json_encode([
            "sucesso" => true,
            "mensagem" => "Conexão com o banco de dados realizada com sucesso!"
        ]);
        exit();
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "mensagem" => "Erro interno ao conectar ao banco de dados.",
        "detalhe" => $e->getMessage()
    ]);
    exit();
}
