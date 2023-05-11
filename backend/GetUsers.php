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

	$A1 = $Link->query("SELECT * FROM `Users` WHERE `ID`> $lastUserID LIMIT $limit");
	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{
			$positions = [];
			$A2 = $Link->query("SELECT Position FROM `Positions` WHERE `UserID`= ".$row["ID"]);
			if ($A2->num_rows > 0)
			{
				while($position = $A2->fetch_assoc()) 
				{
					$positions[] = $position["Position"];
				}
			}

			$result[]  = [
				"id" => $row["ID"],
				"login" => $row["Login"],
				"email" => $row["Email"],
				"phone" => $row["Phone"]
				"surname" => $row["Surname"],
				"name" => $row["Name"],
				"shortDescription" => $row["ShortDescription"],
				"photoSource" => $row["PhotoSource"],
				"cvSource" => $row["CVSource"],
				"positions" => $positions
			];
		}

		SendResponse($Link, $result);
	}
	SendResponse($Link, []);
?>