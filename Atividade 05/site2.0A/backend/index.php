<?php

// configs de seguranca
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// pegar dados do POST
$jsonInput = file_get_contents('php://input');
// transformar dados em array
$data = json_decode($jsonInput, true);

// Colocando dados em variaveis
$username = $data['nome'] ?? 'sem nome';
$password = $data['senha'] ?? 'sem senha';
$email = $data['email'] ?? 'sem email';
$idade = $data['idade'] ?? 'sem idade';
$cidade = $data['cidade'] ?? 'sem cidade';


date_default_timezone_set('America/Sao_Paulo');
$timestamp = date("Y-m-d H:i:s");

$novoRegistro = [
    "timestamp" => $timestamp,
    "username" => $username,
    "password" => sha1($password),
    "email" => $email,
    "idade" => $idade,
    "cidade" => $cidade
];

// pega o que ja tem no arquivo pra nao perder os registros antigos
$registrosExistentes = [];
if (file_exists('dados.json')) {
    $conteudoAtual = file_get_contents('dados.json');
    $decodificado = json_decode($conteudoAtual, true);
    if (is_array($decodificado)) {
        $registrosExistentes = array_key_exists(0, $decodificado) ? $decodificado : [$decodificado];
    }
}

$registrosExistentes[] = $novoRegistro;

// transforma array de valores em um json
$jsonString = json_encode($registrosExistentes, JSON_PRETTY_PRINT);
// salvo o json no meu dados.json
file_put_contents('dados.json', $jsonString);




// devolve a resposta pro JS
echo json_encode([
    "status" => "success",
    "message" => "Hello $username, your password is $password."
]);
?>
