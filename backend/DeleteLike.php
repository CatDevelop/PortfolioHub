<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$UserID = $postData["userID"];
	$ProjectID = $postData["projectID"];

	if(empty($UserID))
		ThrowError($Link, 400, "Введите ID пользователя!");

	if(empty($ProjectID))
		ThrowError($Link, 400, "Введите ID проекта!");

	$A1 = $Link->query("SELECT * FROM `Projects` WHERE `ID`='$ProjectID' LIMIT 1");
	if ($A1->num_rows <= 0) 
	   ThrowError($Link, 400, "Проекта не существует!");
	else 
	{
		while($row = $A1->fetch_assoc()) {
			$A2 = $Link->query("UPDATE `Projects` SET `Rating`=" . (string)($row["Rating"]-1) . " WHERE `ID`=$ProjectID"); 	
			$A3 = $Link->query("DELETE FROM  LikedProjects WHERE `UserID`=$UserID AND `ProjectID`=$ProjectID"); 
	    }	
	}

	if($A2 && $A3)
		SendResponse($Link, ["message" => "Вы успешно удалили лайк!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>