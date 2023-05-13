<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$userID = $postData["userID"];
	$Portfolio = $postData["portfolio"];

	if(empty($userID))
		ThrowError($Link, 400, "Введить ID пользователя");

	if(empty($Portfolio))
		ThrowError($Link, 400, "Нет полей для изменений!");

	$A1 = $Link->query("INSERT INTO Portfolios (UserID, Blocks) VALUES('$userID', '$Portfolio')"); 

	if($A1)
		SendResponse($Link, ["message" => "Вы успешно изменили портфолио!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>