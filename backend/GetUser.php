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
	$positions = [];
	$informationBlocks = [];
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

			$A2 = $Link->query("SELECT Position FROM `Positions` WHERE `UserID`= ".$row["ID"]);
			if ($A2->num_rows > 0)
			{
				while($position = $A2->fetch_assoc()) 
				{
					$positions[] = $position["Position"];
				}
			}

			$A3 = $Link->query("SELECT `ID`, `BlockType`, `BlockTitle`, `Content` FROM `InformationBlocks` JOIN `InformationBlockText` ON InformationBlocks.`ContentID` = InformationBlockText.ContentID WHERE `UserID`= ".$row["ID"]." AND `BlockType`='Text'");
			if ($A3->num_rows > 0)
			{
				while($informationBlockText = $A3->fetch_assoc()) 
				{
					$informationBlocks[] = [
						"id" => $informationBlockText["ID"],
						"blockType" => $informationBlockText["BlockType"],
						"blockTitle" => $informationBlockText["BlockTitle"],
						"content" => $informationBlockText["Content"]
					];
				}
			}


			$A4 = $Link->query("SELECT `ID`, `BlockType`, `BlockTitle`, `Content` FROM `InformationBlocks` JOIN `InformationBlockTable` ON InformationBlocks.`ContentID` = InformationBlockTable.ContentID WHERE `UserID`= ".$row["ID"]." AND `BlockType`='Table'");
			if ($A4->num_rows > 0)
			{
				while($informationBlockTable = $A4->fetch_assoc()) 
				{
					$informationBlocks[] = [
						"id" => $informationBlockTable["ID"],
						"blockType" => $informationBlockTable["BlockType"],
						"blockTitle" => $informationBlockTable["BlockTitle"],
						"content" => json_decode($informationBlockTable["Content"])->content
					];
				}
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

			$result  = [
				"id" => $row["ID"],
				"login" => $row["Login"],
				"email" => $row["Email"],
				"phone" => $row["Phone"],
				"surname" => $row["Surname"],
				"name" => $row["Name"],
				"shortDescription" => $row["ShortDescription"],
				"logoSource" => $row["LogoSource"],
				"photoSource" => $row["PhotoSource"],
				"cvSource" => $row["CVSource"],
				"activate" => $row["Activate"],
				"visible" => $row["Visible"],
				"tags" => $t,
				"positions" => $positions,
				"informationBlocks" => $informationBlocks,
				"links" => $links
			];
		}

		SendResponse($Link, $result);
	}
	ThrowError($Link, 400, "Пользователь не найден!");
?>