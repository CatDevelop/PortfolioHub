<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$userID = $postData["userID"];
	$Name = $postData["name"];
	$Surname = $postData["surname"];
	$Email = $postData["email"];
	$Phone = $postData["phone"];
	$ShortDescription = $postData["shortDescription"];
	$Tags = $postData["tags"];
	$Resume = $postData["resume"];
	$Avatar = $postData["avatar"];
	$CVSource = $postData["cvSource"];
	$IsVisibleEmail = $postData["isVisibleEmail"];

	if(empty($userID))
		ThrowError($Link, 400, "Введить ID пользователя");

	$fields = [];
	$values = [];
	$A1 = $Link->query("SELECT * FROM `Users` WHERE `ID`=$userID LIMIT 1");

	if ($A1->num_rows > 0)
	{
		while($row = $A1->fetch_assoc()) 
		{

			if(isset($IsVisibleEmail))
				if($row['IsVisibleEmail'] != $IsVisibleEmail) {
					$fields[] = 'IsVisibleEmail';
					$values[] = $IsVisibleEmail;
				}


			if(!empty($Name))
				if($row['Name'] != $Name) {
					$fields[] = 'Name';
					$values[] = $Name;
				}

			if(!empty($Surname))
				if($row['Surname'] != $Surname) {
					$fields[] = 'Surname';
					$values[] = $Surname;
				}

			if(!empty($Email))
				if($row['Email'] != $Email) {
					$fields[] = 'Email';
					$values[] = $Email;
				}

			if(!empty($Phone))
				if($row['Phone'] != $Phone) {
					$fields[] = 'Phone';
					$values[] = $Phone;
				}

			if(isset($ShortDescription))
				if($row['ShortDescription'] != $ShortDescription) {
					$fields[] = 'ShortDescription';
					$values[] = addslashes($ShortDescription);
				}

			if(isset($Tags))
				if($row['Tags'] != $Tags) {
					$fields[] = 'Tags';
					$values[] = $Tags;
				}

			// if(!empty($Tags))
			// 	if($row['ShortDescription'] != $ShortDescription)
			// 		$fields[] = 'ShortDescription'
			// 	$fields .= 'Tags'

			// SocialLinks

			if(isset($Resume))
				if($row['CVSource'] != $Resume) {
					$fields[] = 'CVSource';
					$values[] = $Resume;
				}

			if(isset($Avatar))
				if($row['PhotoSource'] != $Avatar) {
					$fields[] = 'PhotoSource';
					$values[] = $Avatar;
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
		$A2 = $Link->query("UPDATE `Users` SET $stringArr WHERE `ID`=$userID"); 
		SendResponse($Link, ["message" => 'Информация успешно изменена']);
	} else {
		ThrowError($Link, 400, "Нет полей для изменений!");
	}
?>