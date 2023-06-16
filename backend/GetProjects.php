<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$userID = GetGet("UserID");

	if($userID == "UserID")
		ThrowError($Link, 400, "Введите ID пользователя!");

	$blocks = [];
	$result  = [];

	$catProjects = [];

	$A1 = $Link->query("SELECT * FROM `Users` WHERE ID=$userID LIMIT 1");
	if ($A1->num_rows <= 0)
		ThrowError($Link, 400, "Пользователь не найден!");

	$A2 = $Link->query("SELECT * FROM `ProjectsBlocks` WHERE `UserID`= $userID LIMIT 1");
	if ($A2->num_rows > 0)
	{
		while($row = $A2->fetch_assoc()) 
		{
			$b = json_decode($row["Blocks"]);

			foreach ($b as $id => $block) {
				$projects = [];
				foreach ($block->projects as $project1) {
					$A3 = $Link->query("SELECT * FROM `Projects` WHERE `ID`= ".$project1);
					if ($A3->num_rows > 0)
					{
						while($project = $A3->fetch_assoc()) 
						{
							$catProjects[] = $project["ID"];
							$projects[] = [
								"id" => $project["ID"],
								"userId" => $project["UserID"],
								"name" => $project["Name"],
								"shortDescription" => $project["ShortDescription"],
								"previewSource" => $project["PreviewSource"],
								"likesCount" => $project["Rating"]
							];
						}
					}
				}
				$blocks[] = [
					"id" => "$id",
					"name" => $block->blockTitle,
					"projects" => $projects
				];
			}
		}
		$result["projectsBlocks"] = $blocks;
	}

	$catProjectsString = implode(',', $catProjects);
	$uncategorizedProjects = [];

	if($catProjectsString == "")
		$A4 = $Link->query("SELECT * FROM `Projects` WHERE `UserID`= $userID AND `ID` NOT IN ('')");
	else
		$A4 = $Link->query("SELECT * FROM `Projects` WHERE `UserID`= $userID AND `ID` NOT IN ($catProjectsString)");

	if ($A4->num_rows > 0)
	{
		while($row = $A4->fetch_assoc()) 
		{
			$uncategorizedProjects[] = [
				"id" => $row["ID"],
				"userId" => $userID,
				"name" => $row["Name"],
				"shortDescription" => $row["ShortDescription"],
				"previewSource" => $row["PreviewSource"],
				"likesCount" => $row["Rating"]
			];
		}
	}
	$result["uncategorizedProjects"] = $uncategorizedProjects;

	SendResponse($Link, $result);

	if ($A2->num_rows > 0)
	{
		SendResponse($Link, ["projectsBlocks" => ["id" => $row["ID"], "name" => $row["BlockTitle"], "projects" =>[]]]);
	} else 
		SendResponse($Link, ["projectsBlocks" => []]);
?>