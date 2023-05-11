<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	/*$data = '{ "content": [ 
    {"0": "1984", "1": "Born in Osaka, Japan."},
    {"0":"2010", "1":"Completed the Masters Program in the Information Science at Nara Institute"},
    {"0": "2010", "1": "Worked at Yahoo! Japan"}
  ]
}';*/

	//$A3 = $Link->query("INSERT INTO InformationBlockTable (Content) VALUES ('$data')");
	//$postData = json_decode(file_get_contents('php://input'), true);

	//$authData = $postData["email"]; // Логин или почта
	//$password = $postData["password"];

	$userID = GetGet("UserID");

	if($userID == "UserID")
		ThrowError($Link, 400, "Введите ID пользователя!");

	$blocks = [];
	$result  = [];

	$A1 = $Link->query("SELECT * FROM `ProjectsBlocks` WHERE `UserID`= $userID");
	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{
			$projects = [];
			$A2 = $Link->query("SELECT * FROM `Projects` WHERE `ProjectsBlockID`= ".$row["ID"]);
			if ($A2->num_rows > 0)
			{
				while($project = $A2->fetch_assoc()) 
				{
					$projects[] = [
						"id" => $project["ID"],
						"name" => $project["Name"],
						"shortDescription" => $project["ShortDescription"],
						"previewSource" => $project["PreviewSource"],
						"likesCount" => $project["Rating"]
					];
				}
			}

			$blocks[] = [
				"id" => $row["ID"],
				"name" => $row["BlockTitle"],
				"projects" => $projects
			];
		}
		$result["categories"] = $blocks;

		SendResponse($Link, $result);
	}

	if ($A3->num_rows > 0)
	{
		SendResponse($Link, ["categories" => []]);
	} else 
		ThrowError($Link, 400, "Пользователь не найден!");
?>