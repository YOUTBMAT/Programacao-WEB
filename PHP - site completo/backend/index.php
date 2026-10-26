<?php

header("Acess-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "localhost";
$banco = "escola";
$user = "root";
$senha = "";

$pdo = new PDO("mysql:host=$host;dbname=$banco",$user,$senha);
$sql = $pdo->query("SELECT * FROM escola.Alunos;");
$dados = $sql->fetchAll(PDO::FETCH_ASS0C);
echo json_encode($dados);

?>