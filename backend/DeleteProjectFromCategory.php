<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$UserID = $postData["userID"];
	$CategoryID = $postData["categoryID"];
	$ProjectID = $postData["projectID"];

	if(!isset($UserID))
		ThrowError($Link, 400, "Введите ID пользователя");

	if(!isset($CategoryID))
		ThrowError($Link, 400, "Введите ID раздела!");

	if(!isset($ProjectID))
		ThrowError($Link, 400, "Введите ID проекта!");

	$A1 = $Link->query("SELECT * FROM `ProjectsBlocks` WHERE `UserID`='$UserID' LIMIT 1");
	if ($A1->num_rows <= 0) 
	   ThrowError($Link, 400, "пользователя не существует!");
	else 
	{
		while($row = $A1->fetch_assoc()) {
			$b = json_decode($row["Blocks"], JSON_UNESCAPED_UNICODE);
			if(!$b[$CategoryID])
				ThrowError($Link, 400, "Раздела не существует!");
			$b[$CategoryID]["projects"] = array_diff($b[$CategoryID]["projects"], array($ProjectID));
			ksort($b[$CategoryID]["projects"]);
			$b[$CategoryID]["projects"]=array_values($b[$CategoryID]["projects"]);

			$c = $row["ProjectsCount"]-1;

			$A2 = $Link->query("UPDATE `ProjectsBlocks` SET `Blocks`='".json_encode($b, JSON_UNESCAPED_UNICODE)."', `ProjectsCount`=$c  WHERE `UserID`=$UserID"); 
			$A3 = $Link->query("UPDATE `Projects` SET `InCategory`=0 WHERE `ID`=$ProjectID"); 
	    }	
	}

	if($A2)
		SendResponse($Link, ["message" => "Вы успешно удалили проект!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>