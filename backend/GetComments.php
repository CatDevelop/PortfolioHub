<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8mb4'); 

	$ProjectID = GetGet("projectID");

	if($ProjectID == "projectID")
		ThrowError($Link, 400, "Введите ID проекта!");

	$result = [];
	$comments = [];

	$A1 = $Link->query("SELECT * FROM `Comments` WHERE `ProjectID`= $ProjectID");
	if ($A1->num_rows > 0)
	{
		while($comment = $A1->fetch_assoc()) 
		{	
			$comments[] = [
				"id" => $comment["ID"],
				"email" => $comment["Email"],
				"avatar" => $comment["AvatarSource"],
				"login" => $comment["Login"],
				"text" => $comment["Text"]
			];
		}

		SendResponse($Link, ["comments" => $comments]);
	}
	ThrowError($Link, 400, "Проект не найден!");
?>