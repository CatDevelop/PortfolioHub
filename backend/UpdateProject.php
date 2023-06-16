<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8mb4'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$projectID = $postData["projectID"];

	$Name = $postData["name"];
	$Year = $postData["year"];
	$ShortDescription = $postData["shortDescription"];
	$Image = $postData["image"];
	$Preview = $postData["preview"];
	$Blocks = $postData["blocks"];
	
	if(empty($projectID))
		ThrowError($Link, 400, "Введить ID проекта");

	$fields = [];
	$values = [];
	$A1 = $Link->query("SELECT * FROM `Projects` WHERE `ID`=$projectID LIMIT 1");

	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{
			if(!empty($Name))
				if($row['Name'] != $Name) {
					$fields[] = 'Name';
					$values[] = $Name;
				}

			if(isset($Year))
				if($row['Year'] != $Year) {
					$fields[] = 'Year';
					$values[] = $Year;
				}

			if(!empty($ShortDescription))
				if($row['ShortDescription'] != $ShortDescription) {
					$fields[] = 'ShortDescription';
					$values[] = $ShortDescription;
				}

			if(isset($Image))
				if($row['Image'] != $Image) {
					$fields[] = 'Image';
					$values[] = $Image;
				}

			if(isset($Preview))
				if($row['PreviewSource'] != $Preview) {
					$fields[] = 'PreviewSource';
					$values[] = $Preview;
				}

			if(isset($Blocks))
				if($row['Blocks'] != $Blocks) {
					$fields[] = 'Blocks';
					$values[] = addslashes($Blocks);
				}
		}
	}


	if(count($fields) != 0) {
		$arr = [];
		foreach ($fields as $key => $value) {
			if($values[$key])
				$arr[] = $value . " = '" . $values[$key] . "'";
			else
				$arr[] = $value . " = null";
		}
		$stringArr = implode(', ', $arr);
		$A2 = $Link->query("UPDATE `Projects` SET $stringArr WHERE `ID`=$projectID"); 
		SendResponse($Link, ["message" => 'Информация успешно изменена!']);
	} else {
		ThrowError($Link, 400, "Нет полей для изменений!");
	}
	ThrowError($Link, 500, "Ошибка на сервере!");
?>