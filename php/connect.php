<?php
$server = "localhost:5500";
$user = "root";
$passward = "root";
$dbname = "test";

$conn = new mysqli($server, $user, $passward, $dbname);

if ($conn->connect_error) echo "<h2>連結失敗</h2>";
else echo "<h2>連結成功</h2>"
?>