<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$userID = GetGet("userID");

	if($userID == "ID")
		ThrowError($Link, 400, "Введите ID пользователя!");

	$projects = [];

	$favoriteProjects = [];




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

			$A8 = $Link->query("SELECT * FROM `LikedProjects` WHERE `UserID`= ".$row["ID"]);
			if ($A8->num_rows > 0)
			{
				while($project = $A8->fetch_assoc()) 
				{
					$A3 = $Link->query("SELECT * FROM `Projects` WHERE `ID`= ".$project["ProjectID"]);
					if ($A3->num_rows > 0)
					{
						while($project1 = $A3->fetch_assoc()) 
						{
							$projects[] = [
								"id" => $project1["ID"],
								"userId" => $project1["UserID"],
								"name" => $project1["Name"],
								"shortDescription" => $project1["ShortDescription"],
								"previewSource" => $project1["PreviewSource"],
								"likesCount" => $project1["Rating"]
							];
						}
					}

					$favoriteProjects[] = $project["ProjectID"];
				}
			}


			$result  = [
				"ids" => $favoriteProjects,
				"projects" => $projects
			];
		}

		SendResponse($Link, $result);
	}
	ThrowError($Link, 400, "Пользователь не найден!");
?>