<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 

	$userID = GetGet("userID");
	if($userID == "userID")
		ThrowError($Link, 400, "Введите ID пользователя!");
	
	if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK)
	{
		$fileTmpPath = $_FILES['resume']['tmp_name'];
	    $fileName = $_FILES['resume']['name'];
	    $fileSize = $_FILES['resume']['size'];
	    $fileType = $_FILES['resume']['type'];
	    $fileNameCmps = explode(".", $fileName);
	    $fileExtension = strtolower(end($fileNameCmps));

	    $newFileName = md5(time() . $fileName) . '.' . $fileExtension;

	    $allowedfileExtensions = array('txt', 'pdf', 'doc', 'docx');

	    if (in_array($fileExtension, $allowedfileExtensions))
	    {
	    	$uploadFileDir = './files/resumes/';
	    	$fullFileDir = 'https://www.ren-design.ru/api/portfolio-hub/1.0/files/resumes/'. $newFileName;
	      	$dest_path = $uploadFileDir . $newFileName;

	      	if(move_uploaded_file($fileTmpPath, $dest_path)) 
	      	{
	      		$A1 = $Link->query("UPDATE Users SET CVSource = '$fullFileDir' WHERE `ID`=$userID"); 
	      		if($A1)
					SendResponse($Link, ["message" => 'Резюме успешно загружено', "filePath" => $fullFileDir]);
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