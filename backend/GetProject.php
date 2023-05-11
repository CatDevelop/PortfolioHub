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

	$projectID = GetGet("ID");

	if($projectID == "ID")
		ThrowError($Link, 400, "Введите ID проекта!");

	$result = [];
	
	$informationBlocks = [];
	$screenshots = [];
	$comments = [];

	$A1 = $Link->query("SELECT * FROM `Projects` WHERE `ID`= $projectID LIMIT 1");
	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{	
			$A2 = $Link->query("SELECT * FROM `ProjectInformationBlocks` WHERE `ProjectID`= ".$projectID);
			if ($A2->num_rows > 0)
			{
				while($informationBlock = $A2->fetch_assoc()) 
				{
					$informationBlocks[] = [
						"id" => $informationBlock["ID"],
						"blockType" => $informationBlock["BlockType"],
						"blockTitle" => $informationBlock["BlockTitle"],
						"content" => $informationBlock["Сontent"]
					];
				}
			}

			$A3 = $Link->query("SELECT * FROM `ProjectScreenshot` WHERE `ProjectID`= ".$projectID);
			if ($A3->num_rows > 0)
			{
				while($screenshot = $A3->fetch_assoc()) 
				{
					$screenshots[] = [
						"id" => $screenshot["ID"],
						"screenshotSource" => $screenshot["ScreenshotSource"],
						"description" => $screenshot["Description"]
					];
				}
			}

			$A4 = $Link->query("SELECT * FROM `Comments` WHERE `ProjectID`= ".$projectID);
			if ($A4->num_rows > 0)
			{
				while($comment = $A4->fetch_assoc()) 
				{
					$comments[] = [
						"id" => $comment["ID"],
						"email" => $comment["Email"],
						"login" => $comment["Login"],
						"text" => $comment["Text"]
					];
				}
			}

			$result = [
				"id" => $row["ID"],
				"name" => $row["Name"],
				"year" => $row["Year"],
				"description" => $row["Description"],
				"rating" => $row["Rating"],
				"informationBlocks" => $informationBlocks,
				"screenshots" => $screenshots,
				"comments" => $comments
			];
		}

		SendResponse($Link, $result);
	}
	ThrowError($Link, 400, "Проект не найден!");
?>