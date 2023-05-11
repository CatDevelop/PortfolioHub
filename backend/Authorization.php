<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 

	$postData = json_decode(file_get_contents('php://input'), true);

	$authData = $postData["email"]; // Логин или почта
	$password = $postData["password"];

	if(empty($authData) or 
		empty($password)
	)
		ThrowError($Link, 400, "Вы ввели не всю информацию, заполните все поля!");

	if(gettype($authData) != "string" or 
		gettype($password) != "string"
	)
		ThrowError($Link, 400, "Передан неверный тип данных!");

	$A1 = $Link->query("SELECT * FROM `Users` WHERE (`Login`='$authData' OR `Email`='$authData') AND `Password`='$password' LIMIT 1");
	if ($A1->num_rows <= 0) 
	   ThrowError($Link, 400, "Неверные данные!");
	else 
	{
		while($row = $A1->fetch_assoc()) {
			SendResponse($Link, ["id" => $row["ID"], "email" => $row["Email"], "activate" => $row["Activate"]]);
	    }	
	}
		

	/*if(!preg_match("/^[0-9]{3}$/i", $cardCVC))
		ThrowError(400, "CVC код должен быть 3-x значным числом!");

	if(!preg_match("/^[0-9]{2}\/[0-9]{2}$/i", $cardDate))
		ThrowError(400, "Неверный формат срока действия карты!");

	$cardDateExplode = explode('/', $cardDate);

	if((int)$cardDateExplode[0]>12 || (int)$cardDateExplode[0]<0)
		ThrowError(400, "Неверный формат срока действия карты!");

	if((int)$cardDateExplode[1]>99 || (int)$cardDateExplode[1]<0)
		ThrowError(400, "Неверный формат срока действия карты!");

	if(!preg_match("/^[a-zA-Z]+ [a-zA-Z]+$/i", $cardName))
		ThrowError(400, "Неверный формат имени держателя карты!");

	if(!preg_match("/^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/i", $cardNumber))
		ThrowError(400, "Неверный формат номера карты!");

	if(!preg_match("/^[0-6]{1}$/i", $day))
		ThrowError(400, "Номер дня недели должен быть числом от 0 до 6!");

	if($week < 0 || $week > 52)
		ThrowError(400, "Номер недели должен быть числом от 0 до 52!");

	if($durationCount < 1)
		ThrowError(400, "Необходимо забронировать минимум на 45 минут");

	if($durationCount > 9)
		ThrowError(400, "Можно забронировать не больше, чем на 6 часов");

	if(!preg_match("/^[0-9]{11}$/i", $phone))
		ThrowError(400, "Неверный формат номера телефона!");

	if($seatsCount < 1)
		ThrowError(400, "Необходимо забронировать минимум 1 дорожку");

	if($seatsCount > 6)
		ThrowError(400, "Можно забронировать не больше 6 дорожек");

	if(!preg_match("/^[0-9]{1,2}\:[0-9]{2}$/i", $startTime))
		ThrowError(400, "Неверный формат времени начала бронирования!");

	$timeExplode = explode(':', $startTime);

	if((int)$timeExplode[0]>23 || (int)$timeExplode[0]<0)
		ThrowError(400, "Неверный формат времени начала бронирования!");

	if((int)$timeExplode[1]>59 || (int)$timeExplode[1]<0)
		ThrowError(400, "Неверный формат времени начала бронирования!");

	$time = [
		"6:30" => 0,
	  	"7:15" => 1,
		"8:00" => 2,
		"8:45" => 3,
		"9:30" => 4,
		"10:15" => 5,
		"11:00" => 6,
		"11:45" => 7,
		"12:30" => 8,
		"13:15" => 9,
		"14:00" => 10,
		"14:45" => 11,
		"15:30" => 12,
		"16:15" => 13,
		"17:00" => 14,
		"17:45" => 15,
		"18:30" => 16,
		"19:15" => 17,
		"20:00" => 18,
		"20:45" => 19,
		"21:30" => 20
	];
	$startTimeNumber = $time[$startTime];

	if($startTimeNumber+$durationCount > 21)
		ThrowError(400, "Не достаточно свободных дорожек в выбранном промежутке времени!");

	$data = [];
	foreach ($time as &$t) {
    	$data[$t] = [6, 6, 6, 6, 6, 6, 6];
	}
	
	$A1 = $Link->query("SELECT * FROM `bookings` WHERE `week`=".$week);
	if ($A1->num_rows > 0) {
	    while($row = $A1->fetch_assoc()) {
	    	for ($i = 0; $i < $row["durationCount"]; $i++) {
			    $data[$row["startTime"]+$i][$row["day"]] = $data[$row["startTime"]+$i][$row["day"]]-$row["seatsCount"];
			}
	    }
	}

	for ($i = 0; $i < $durationCount; $i++) {
		if($data[$startTimeNumber+$i][$day]-$seatsCount < 0)
			ThrowError(400, "Не достаточно свободных дорожек в выбранном промежутке времени!");
	}*/


	//$A3 = $Link->query("INSERT INTO Users (Login, Email, Password) VALUES('$login', '$email', '$password')"); 

	/*if($A3)
		SendResponse("Вы успешно зарегестрировались на сайте");
	else
		ThrowError(500, "Ошибка сервера! Обратитесь к администратору.");*/

	mysqli_close($Link);
?>