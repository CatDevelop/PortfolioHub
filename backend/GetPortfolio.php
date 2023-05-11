<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, GET');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8mb4'); 

	$userID = GetGet("UserID");

	if($userID == "UserID")
		ThrowError($Link, 400, "Введите ID пользователя!");

	$A1 = $Link->query("SELECT * FROM `Portfolios` WHERE `UserID`=$userID LIMIT 1");
	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{
			$result  = [
				"id" => $row["ID"],
				"portfolio" => $row["Portfolio"],
				"updateDate" => $row["UpdateDate"]
			];

			SendResponse($Link, $result);
		}
	}
	ThrowError($Link, 400, "Пользователь не найден!");
?>