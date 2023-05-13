<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$userID = GetGet("ID");

	if($userID == "ID")
		ThrowError($Link, 400, "Введите ID пользователя!");

	$result = [];
	$links = [];

	$A1 = $Link->query("SELECT * FROM `Users` WHERE `ID`=$userID LIMIT 1");
	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{
			if($row["Activate"] == 0)
			{
				$result  = [
					"id" => $row["ID"],
					"email" => $row["Email"],
					"activate" => $row["Activate"]
				];
				SendResponse($Link, $result);
			}

			$A5 = $Link->query("SELECT * FROM `Links` WHERE `UserID`= ".$row["ID"]);
			if ($A5->num_rows > 0)
			{
				while($link = $A5->fetch_assoc()) 
				{
					$links[] = [
						"id" => $link["ID"],
						"linkType" =>  $link["LinkType"],
						"link" => $link["Link"]
					];
				}
			}

			if ($row["Tags"] == "[]")
				$t = [];
			else 
				$t = $row["Tags"];

			$A6 = $Link->query("SELECT COUNT(UserID) AS count FROM `Projects` WHERE `UserID`= ".$row["ID"]." AND `InCategory`=1");
			$projectsCount = $A6->fetch_assoc()["count"];

			$A7 = $Link->query("SELECT SUM(Rating) AS rating FROM `Projects` WHERE `UserID`= ".$row["ID"]." AND `InCategory`=1");
			$likesCount = $A7->fetch_assoc()["rating"];

			if(!$likesCount)
				$likesCount = "0";


			$result  = [
				"id" => $row["ID"],
				"login" => $row["Login"],
				"email" => $row["Email"],
				"phone" => $row["Phone"],
				"surname" => $row["Surname"],
				"name" => $row["Name"],
				"shortDescription" => $row["ShortDescription"],
				"projectsCount" => $projectsCount,
				"likesCount" => $likesCount,
				"logoSource" => $row["LogoSource"],
				"photoSource" => $row["PhotoSource"],
				"cvSource" => $row["CVSource"],
				"activate" => $row["Activate"],
				"visible" => $row["Visible"],
				"tags" => $t,
				"links" => $links
			];
		}

		SendResponse($Link, $result);
	}
	ThrowError($Link, 400, "Пользователь не найден!");
?>