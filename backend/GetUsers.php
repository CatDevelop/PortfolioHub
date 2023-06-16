<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$limit = GetGet("limit");
	$lastUserID = GetGet("lastUserID");

	if($limit == "limit")
		$limit = 20;
	
	if($lastUserID == "lastUserID")
		$lastUserID = 0;

	$result = [];

	$A1 = $Link->query("SELECT * FROM `Users` WHERE `Activate`=1 AND `Visible`='Public' AND `ID`> $lastUserID LIMIT $limit");
	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{
			if ($row["Tags"] == "[]")
				$t = [];
			else 
				$t = $row["Tags"];

			$A6 = $Link->query("SELECT `ProjectsCount` FROM `ProjectsBlocks` WHERE `UserID`= ".$row["ID"]);
			$projectsCount = $A6->fetch_assoc()["ProjectsCount"];

			$A7 = $Link->query("SELECT SUM(Rating) AS rating FROM `Projects` WHERE `UserID`= ".$row["ID"]);
			$likesCount = $A7->fetch_assoc()["rating"];

			if(!$likesCount)
				$likesCount = "0";

			$result[]  = [
				"id" => (int) $row["ID"],
				"login" => $row["Login"],
				"email" => $row["Email"],
				"surname" => $row["Surname"],
				"name" => $row["Name"],
				"shortDescription" => $row["ShortDescription"],
				"projectsCount" => (int) $projectsCount,
				"likesCount" => (int) $likesCount,
				"avatarSource" => $row["PhotoSource"],
				"tags" => $t,
				"isVisibleEmail" => $row["IsVisibleEmail"],
			];
		}

		SendResponse($Link, $result);
	}
	SendResponse($Link, []);
?>