<?php
// ============================================================
// db.php  —  conexão com o banco (reutilizada pelos endpoints)
//
// >>> ATIVIDADE <<<  comente onde houver "// -> comentar aqui".
// ============================================================

// Lê o arquivo .env localizado na raiz do projeto para carregar as credenciais de acesso de forma segura
$env = parse_ini_file(__DIR__ . "/../../.env");

// Atribui as variáveis de conexão com o banco de dados obtidas do arquivo .env
$host  = $env["DB_HOST"];
$banco = $env["DB_NAME"];
$user  = $env["DB_USER"];
$senha = $env["DB_PASS"];

try {
    // Tenta criar uma nova conexão PDO com o MySQL usando o host, nome do banco e charset utf8mb4
    $pdo = new PDO("mysql:host=$host;dbname=$banco;charset=utf8mb4", $user, $senha);

    // Configura o PDO para disparar exceções (erros) caso aconteça algum problema com os comandos SQL
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    // Se ocorrer algum erro na conexão, define o código de resposta HTTP como 500 (erro interno)
    http_response_code(500);
    // Retorna uma mensagem de erro amigável em formato JSON para o cliente
    echo json_encode(["erro" => "Falha ao conectar no banco"]);
    // Encerra a execução do script para não continuar sem banco de dados
    exit;
}
