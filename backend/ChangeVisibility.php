<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$userID = $postData["userID"];
	$VisibleStatus = $postData["visible"];

	if(empty($userID))
		ThrowError($Link, 400, "Введить ID пользователя");

	if(empty($VisibleStatus)
	)
		ThrowError($Link, 400, "Вы ввели не всю информацию, заполните все поля!");

	if(gettype($VisibleStatus) != "string"
	)
		ThrowError($Link, 400, "Передан неверный тип данных!");

	$A2 = $Link->query("UPDATE `Users` SET `Visible`='$VisibleStatus' WHERE `ID`=$userID"); 


	if($A2)
		SendResponse($Link, ["message" => "Вы успешно обновили видимость портфолио!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>