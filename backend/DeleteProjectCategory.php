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

	if(!isset($UserID))
		ThrowError($Link, 400, "Введите ID пользователя");

	if(!isset($CategoryID))
		ThrowError($Link, 400, "Введите ID раздела!");

	$A1 = $Link->query("SELECT * FROM `ProjectsBlocks` WHERE `UserID`='$UserID' LIMIT 1");
	if ($A1->num_rows <= 0) 
	   ThrowError($Link, 400, "пользователя не существует!");
	else 
	{
		while($row = $A1->fetch_assoc()) {
			$c = 0;
			$b = json_decode($row["Blocks"], JSON_UNESCAPED_UNICODE);
			foreach ($b[$CategoryID]["projects"] as $key => $value) {
				$A2 = $Link->query("UPDATE `Projects` SET `InCategory`=0 WHERE `ID`=$value"); 
				$c = $c + 1;
			}
			unset($b[$CategoryID]);
			ksort($b);
			$b=array_values($b);
			$count = $row["ProjectsCount"] - $c;

			$A2 = $Link->query("UPDATE `ProjectsBlocks` SET `Blocks`='".json_encode($b, JSON_UNESCAPED_UNICODE)."', `ProjectsCount`=$count WHERE `UserID`=$UserID"); 
	    }	
	}

	if($A2)
		SendResponse($Link, ["message" => "Вы успешно удалили раздел!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>