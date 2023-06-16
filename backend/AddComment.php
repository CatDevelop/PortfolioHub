<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$ProjectID = $postData["projectID"];
	$UserID = $postData["userID"];
	$Email = $postData["email"];
	$Text = $postData["text"];

	if(empty($ProjectID))
		ThrowError($Link, 400, "Введите ID проекта");

	if(empty($Text))
		ThrowError($Link, 400, "Введите комментарий!");

	if(empty($UserID) && empty($Email))
		ThrowError($Link, 400, "Введите почту пользователя!");

	if(!empty($UserID))
	{
		$A1 = $Link->query("SELECT * FROM `Users` WHERE `ID`=$UserID LIMIT 1");
		if ($A1->num_rows > 0)
		{
			while($row = $A1->fetch_assoc()) 
			{
				$Email = $row["Email"];
				$Avatar = $row["PhotoSource"];
				$Login = $row["Surname"] . " " . $row["Name"];
			}
		}
	}

	if(empty($UserID))
	{
		$Avatar = "plumb.png";
		$Login = $Email;
	}

	$A1 = $Link->query("INSERT INTO Comments (ProjectID, Email, AvatarSource, Login, Text) VALUES('$ProjectID', '$Email', '$Avatar', '$Login', '$Text')"); 

	if($A1)
		SendResponse($Link, ["message" => "Вы успешно отправили комментарий!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>