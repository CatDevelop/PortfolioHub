<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$userID = $postData["userID"];
	$OldPassword = $postData["oldPassword"];
	$NewPassword = $postData["newPassword"];

	if(empty($userID))
		ThrowError($Link, 400, "Введить ID пользователя");

	if(empty($OldPassword) or 
		empty($NewPassword)
	)
		ThrowError($Link, 400, "Вы ввели не всю информацию, заполните все поля!");

	if(gettype($OldPassword) != "string" or 
		gettype($NewPassword) != "string"
	)
		ThrowError($Link, 400, "Передан неверный тип данных!");

	$A1 = $Link->query("SELECT * FROM `Users` WHERE `ID`='$userID' AND `Password`='$OldPassword' LIMIT 1");
	if ($A1->num_rows <= 0) 
	   ThrowError($Link, 400, "Неверные данные!");
	else 
	{
		$A2 = $Link->query("UPDATE `Users` SET `Password`='$NewPassword' WHERE `ID`=$userID"); 
	}

	if($A2)
		SendResponse($Link, ["message" => "Вы успешно обновили пароль!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>