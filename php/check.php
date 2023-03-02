<?php
#db接続
//connect.phpの内容取得
include_once("connect.php");

#form
$iconName = $_POST["iconName"];
$iconType = $_POST["iconType"];


$sql = "INSERT INTO iconlist(iconName,iconType) VALUES ('$iconName','$iconType')";

if ($conn->query($sql))echo"
<h3>登録成功</h3>
"; else echo "
<h3>登録失敗</h3>
" ?>
