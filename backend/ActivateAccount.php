<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 

	$postData = json_decode(file_get_contents('php://input'), true);

	$activationLink = $postData["link"];

	if(empty($activationLink))
		ThrowError($Link, 400, "Вы ввели не всю информацию, заполните все поля!");

	if(gettype($activationLink) != "string"
	)
		ThrowError($Link, 400, "Передан неверный тип данных!");

	$A1 = $Link->query("SELECT * FROM `ActivationLink` WHERE `Link`='$activationLink'");
	if ($A1->num_rows <= 0) 
	   ThrowError($Link, 400, "Ссылка не активна!");
	else {
		$ID = $A1->fetch_assoc()['UserID'];
		$A2 = $Link->query("DELETE FROM `ActivationLink` WHERE `Link`='$activationLink'");
		$A3 = $Link->query("UPDATE Users SET Activate = 1 WHERE `ID`=$ID"); 

		if($A2 and $A3)
			SendResponse($Link, ["message" => "Ваш аккаунт успешно активирован!", "userID" => $ID]);
		else
			ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
	}
?>