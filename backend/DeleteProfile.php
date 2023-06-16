<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$UserID = $postData["userID"];

	if(!isset($UserID))
		ThrowError($Link, 400, "Введите ID пользователя!");

	$A1 = $Link->query("DELETE FROM `ProjectsBlocks` WHERE `UserID`=$UserID"); 
	$A2 = $Link->query("DELETE FROM `Projects` WHERE `UserID`=$UserID"); 
	$A3 = $Link->query("DELETE FROM `Portfolios` WHERE `UserID`=$UserID"); 
	$A4 = $Link->query("DELETE FROM `LikedProjects` WHERE `UserID`=$UserID"); 
	$A5 = $Link->query("DELETE FROM `ActivationLink` WHERE `UserID`=$UserID"); 
	$A6 = $Link->query("DELETE FROM `Users` WHERE `ID`=$UserID"); 

	if($A1 && $A2 && $A3 && $A4 && $A5 && $A6)
		SendResponse($Link, ["message" => "Вы успешно удалили аккаунт!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>