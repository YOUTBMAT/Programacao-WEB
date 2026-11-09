<?php
// ============================================================
// cabecalhos.php  —  cabeçalhos de resposta e CORS
// Incluído por TODOS os endpoints (listar, salvar, excluir).
//
// >>> ATIVIDADE <<<  comente onde houver "// -> comentar aqui".
// ============================================================

// Libera o acesso à API para qualquer site ou origem (CORS), permitindo requisições de outros domínios/portas
header("Access-Control-Allow-Origin: *");
// Permite que o cabeçalho Content-Type seja enviado nas requisições (necessário para enviar dados em JSON)
header("Access-Control-Allow-Headers: Content-Type");
// Define quais métodos HTTP são aceitos pela API (consultar, cadastrar, excluir e a verificação prévia)
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
// Define que a resposta enviada pelo servidor será no formato JSON com codificação UTF-8
header("Content-Type: application/json; charset=utf-8");

// Verifica se o navegador enviou uma requisição do tipo OPTIONS (chamada de preflight para teste de CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    // Retorna o código HTTP 204 (sem conteúdo), informando que a requisição prévia foi aprovada
    http_response_code(204);
    // Para a execução do script aqui para não processar mais nada na requisição OPTIONS
    exit;
}
