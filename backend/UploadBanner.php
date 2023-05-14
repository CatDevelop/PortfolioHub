<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 

	$UserID = GetGet("userID");
	if($UserID == "userID")
		ThrowError($Link, 400, "Введите ID пользователя!");
	
	if (isset($_FILES['banner']) && $_FILES['banner']['error'] === UPLOAD_ERR_OK)
	{
		$fileTmpPath = $_FILES['banner']['tmp_name'];
	    $fileName = $_FILES['banner']['name'];
	    $fileSize = $_FILES['banner']['size'];
	    $fileType = $_FILES['banner']['type'];
	    $fileNameCmps = explode(".", $fileName);
	    $fileExtension = strtolower(end($fileNameCmps));

	    $newFileName = $UserID . '.' . $fileExtension;

	    $allowedfileExtensions = array('png', 'jpg', 'jpeg');

	    if (in_array($fileExtension, $allowedfileExtensions))
	    {
	    	$uploadFileDir = './files/banners/';
	    	$fullFileDir = 'https://www.ren-design.ru/api/portfolio-hub/1.0/files/banners/'. $newFileName;
	      	$dest_path = $uploadFileDir . $newFileName;

	      	if(move_uploaded_file($fileTmpPath, $dest_path)) 
	      	{
	      		$A1 = $Link->query("UPDATE Users SET PhotoSource = '$newFileName' WHERE `ID`=$UserID"); 
	      		if($A1)
					SendResponse($Link, ["message" => 'Аватар успешно загружен', "filePath" => $newFileName]);
				else
					ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
	      	}
	      	else 
	      		ThrowError($Link, 400, "There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.");
	    } else {
	    	ThrowError($Link, 400, "Неверный формат файла!");
	    }
	} else {
		ThrowError($Link, 500, "Не удалось загрузить файл!");
	}
?>