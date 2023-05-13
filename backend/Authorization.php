<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 

	$postData = json_decode(file_get_contents('php://input'), true);

	$authData = $postData["email"]; // Логин или почта
	$password = $postData["password"];

	if(empty($authData) or 
		empty($password)
	)
		ThrowError($Link, 400, "Вы ввели не всю информацию, заполните все поля!");

	if(gettype($authData) != "string" or 
		gettype($password) != "string"
	)
		ThrowError($Link, 400, "Передан неверный тип данных!");

	$A1 = $Link->query("SELECT * FROM `Users` WHERE (`Login`='$authData' OR `Email`='$authData') AND `Password`='$password' LIMIT 1");
	if ($A1->num_rows <= 0) 
	   ThrowError($Link, 400, "Неверные данные!");
	else 
	{
		while($row = $A1->fetch_assoc()) {
			SendResponse($Link, ["id" => $row["ID"], "email" => $row["Email"], "activate" => $row["Activate"]]);
	    }	
	}

	mysqli_close($Link);
?>