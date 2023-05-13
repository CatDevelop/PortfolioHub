<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$UserID = $postData["userID"];
	$CategoryName = $postData["categoryName"];

	if(empty($UserID))
		ThrowError($Link, 400, "Введите ID пользователя");

	if(empty($CategoryName))
		ThrowError($Link, 400, "Введите название раздела!");

	$A1 = $Link->query("SELECT * FROM `ProjectsBlocks` WHERE `UserID`='$UserID' LIMIT 1");
	if ($A1->num_rows <= 0) 
	   ThrowError($Link, 400, "пользователя не существует!");
	else 
	{
		while($row = $A1->fetch_assoc()) {
			$b = json_decode($row["Blocks"], JSON_UNESCAPED_UNICODE);
			$object = new stdClass();
			$object->blockTitle = $CategoryName; 
			$object->projects = []; 
			$b[] = $object;

			$A2 = $Link->query("UPDATE `ProjectsBlocks` SET `Blocks`='".json_encode($b, JSON_UNESCAPED_UNICODE)."' WHERE `UserID`=$UserID"); 
	    }	
	}

	if($A2)
		SendResponse($Link, ["message" => "Вы успешно добавили раздел!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>