<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 

	$ProjectID = GetGet("projectID");
	if($ProjectID == "projectID")
		ThrowError($Link, 400, "Введите ID проекта!");
	
	if (isset($_FILES['projectImage']) && $_FILES['projectImage']['error'] === UPLOAD_ERR_OK)
	{
		$fileTmpPath = $_FILES['projectImage']['tmp_name'];
	    $fileName = $_FILES['projectImage']['name'];
	    $fileSize = $_FILES['projectImage']['size'];
	    $fileType = $_FILES['projectImage']['type'];
	    $fileNameCmps = explode(".", $fileName);
	    $fileExtension = strtolower(end($fileNameCmps));

	    $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

	    $allowedfileExtensions = array('png', 'jpg', 'jpeg');

	    if (in_array($fileExtension, $allowedfileExtensions))
	    {
	    	$uploadFileDir = './files/projectImages/';
	    	$fullFileDir = 'https://www.ren-design.ru/api/portfolio-hub/1.0/files/projectImages/'. $newFileName;
	      	$dest_path = $uploadFileDir . $newFileName;

	      	if(move_uploaded_file($fileTmpPath, $dest_path)) 
	      	{
	      		$A1 = $Link->query("UPDATE Projects SET Image = '$newFileName' WHERE `ID`=$ProjectID"); 
	      		if($A1)
					SendResponse($Link, ["message" => 'Баннер проекта успешно загружен', "filePath" => $newFileName]);
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