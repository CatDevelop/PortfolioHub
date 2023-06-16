<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 

	$postData = json_decode(file_get_contents('php://input'), true);

	$ProjectID = $postData["projectID"];

	if(!isset($ProjectID))
		ThrowError($Link, 400, "Введите ID раздела!");


	$A2 = $Link->query("SELECT * FROM `Projects` WHERE `ID`='$ProjectID' LIMIT 1");

	while($project = $A2->fetch_assoc()) {
		if($project["InCategory"] == 1)
		{
			$UserID = $project["UserID"];
			$A1 = $Link->query("SELECT * FROM `ProjectsBlocks` WHERE `UserID`='$UserID' LIMIT 1");
			if ($A1->num_rows <= 0) 
			   ThrowError($Link, 400, "пользователя не существует!");
			else 
			{
				while($row = $A1->fetch_assoc()) {
					$b = json_decode($row["Blocks"], JSON_UNESCAPED_UNICODE);

					foreach ($b as $key => $value) {
						if(in_array( (int)$ProjectID ,$value["projects"] ))
						{
							$b[$key]["projects"] = array_diff($b[$key]["projects"], array($ProjectID));
							ksort($b[$key]["projects"]);
							$b[$key]["projects"]=array_values($b[$key]["projects"]);

							$c = $row["ProjectsCount"]-1;

							$A3 = $Link->query("UPDATE `ProjectsBlocks` SET `Blocks`='".json_encode($b, JSON_UNESCAPED_UNICODE)."', `ProjectsCount`=$c  WHERE `UserID`=$UserID"); 
							$A4 = $Link->query("UPDATE `Projects` SET `InCategory`=0 WHERE `ID`=$ProjectID"); 
						}
					}
			    }
			}	
		}
    }	


    $A6 = $Link->query("DELETE FROM `Comments` WHERE `ProjectID`=$ProjectID"); 
	$A5 = $Link->query("DELETE FROM `Projects` WHERE `ID`=$ProjectID"); 

	if($A5)
		SendResponse($Link, ["message" => "Вы успешно удалили проект!"]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>