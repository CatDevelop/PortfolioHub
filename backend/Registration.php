<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');


	// use PHPMailer\PHPMailer\PHPMailer;
	// use PHPMailer\PHPMailer\Exception;
	// use PHPMailer\PHPMailer\SMTP;

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 
	include "mail.php"; 
	require 'phpmailer/PHPMailer.php';
	require 'phpmailer/SMTP.php';
	require 'phpmailer/Exception.php';
	// include 'phpmailer/Exception.php';
	// include 'phpmailer/PHPMailer.php';
	// include 'phpmailer/SMTP.php';

	$postData = json_decode(file_get_contents('php://input'), true);

	$email = $postData["email"];
	$login = $postData["login"];
	$password = $postData["password"];

	if(empty($email) or 
		empty($login) or 
		empty($password)
	)
		ThrowError($Link, 400, "Вы ввели не всю информацию, заполните все поля!");

	if(gettype($email) != "string" or 
		gettype($login) != "string" or 
		gettype($password) != "string"
	)
		ThrowError($Link, 400, "Передан неверный тип данных!");

	$A1 = $Link->query("SELECT * FROM `Users` WHERE `Login`='$login'");
	if ($A1->num_rows > 0) 
	   ThrowError($Link, 400, "Логин уже занят!");

	$A2 = $Link->query("SELECT * FROM `Users` WHERE `Email`='$email'");
	if ($A2->num_rows > 0) 
	   ThrowError($Link, 400, "Почта уже занята!");

	$A3 = $Link->query("INSERT INTO Users (Login, Email, Password) VALUES('$login', '$email', '$password')"); 
	$UserID = $Link->insert_id;
	$UniqueLink = uniqid();
	$A4 = $Link->query("INSERT INTO ActivationLink (UserID, Link) VALUES('$UserID', '$UniqueLink')"); 

	$template = addslashes('{"time":1683712612528,"blocks":[{"id":"7WAQHwPGje","type":"header","data":{"text":"Привет! 🤚","level":1},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"_QSg_7Rzs6","type":"header","data":{"text":"Это блочный редактор Portfolio Hub ✒️","level":2},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"TdLo2o09MU","type":"paragraph","data":{"text":"Ты встретишься с ним при редактировании портфолио или информации о проекте. Давай познакомимся ближе, ниже будет представлен шаблон, который расскажет о всех возможностях, ты можешь с ним ознакомиться и удалить, выделив всё содержимое."},"tunes":{"anyTuneName":{"alignment":"center"},"textVariant":""}},{"id":"g6tYUEgwSR","type":"delimiter","data":{}},{"id":"DPfatlhnac","type":"header","data":{"text":"Концепция №1. Всё есть \"блок\"","level":3},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"zPhf79_GIY","type":"paragraph","data":{"text":"Нужно представить, что каждый элемент содержимого, который вы добавляете на страницу - будь то текст, изображение или таблица - это один строительный блок. Любая страница - это стопка блоков. Их можно скомбинировать так, как вы захотите."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"1Cx71voZ_9","type":"paragraph","data":{"text":"Нужно нажать <code class=\"inline-code\">Tab</code> на клавиатуре (или нажмите кнопку + слева от редактора). Так вы увидите все типы разного контента, который можете добавить."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"GFWSiArBk-","type":"header","data":{"text":"Концепция №2. Блоки могут трансформироваться","level":3},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"phIh-2GCGJ","type":"paragraph","data":{"text":"Любой блок информации можно превратить в другой тип блока или же видоизменить."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"e-HfRpi6y0","type":"paragraph","data":{"text":"Это можно сделать выбрав вот такой символ <code class=\"inline-code\">⋮⋮</code> слева от блока, он называется кнопкой блока. В зависимости от типа блока будут доступны разные настройки, подробнее о каждой из них будет написано в описании конкретного блока."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"eLmD25xSKV","type":"header","data":{"text":"Концепция №3. Текст можно модифицировать","level":3},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"risaL4rx6B","type":"paragraph","data":{"text":"При выделении текста в любом блоке, будь то таблица или же цитата, вы можете изменять его оформление. Делать <b>жирным</b>, <i>курсивным</i>, <u class=\"cdx-underline\">подчёркнутым</u>, <s class=\"cdx-strikethrough\">зачёркнутым</s>, <mark class=\"cdx-marker\">выделенным</mark>, <code class=\"inline-code\">внутренним кодом </code>, <a href=\"https://vk.com\">ссылкой</a>, <b><i>или же </i></b><u class=\"cdx-underline\"><s class=\"cdx-strikethrough\"><b><i></i></b>комбинировать все </s></u><code class=\"inline-code\"><b><u class=\"cdx-underline\"><s class=\"cdx-strikethrough\"></s></u>стили</b></code>."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"671S1Zz3qy","type":"delimiter","data":{}},{"id":"OR_x5FhZtN","type":"header","data":{"text":"Описание блоков","level":2},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"1H0UDTql4q","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Текстовый блок</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"1hSbyGDWzx","type":"paragraph","data":{"text":"Это текстовый блок. Вы можете ввести в него столько текста, сколько захотите. Как только вы нажмете <code class=\"inline-code\">Enter</code>, вы создадите разрыв строки и перейдите к новому блоку. С помощью меню блока можно изменить центрирование текста."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"fMzn2WnMze","type":"paragraph","data":{"text":"Совет: Вы можете нажать <code class=\"inline-code\">Shift + Enter</code>, чтобы создать разрывы строк внутри одного текстового блока.<br>Обратите внимание, как я это сделал, чтобы создать эту новую строку внутри того же блока, что и текст выше."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"cv5KySpv84","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Нумерованный и ненумерованный списки</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"gh2HlW4wAH","type":"list","data":{"style":"ordered","items":[{"content":"Я перечисляю пронумерованные вещи","items":[]},{"content":"Могу иметь несколько пунктов","items":[{"content":"И несколько уровней","items":[{"content":"Чтобы сделать вложенный пункт, необходимо нажать <code class=\"inline-code\">Tab</code>","items":[]}]}]}]}},{"id":"4FB-pK-4U5","type":"list","data":{"style":"unordered","items":[{"content":"Порядок меня волнует гораздо меньше.","items":[{"content":"Но я тоже могу иметь несколько уровней","items":[{"content":"Чтобы выйти из редактирования списка, необходимо несколько раз нажать <code class=\"inline-code\">Enter</code>","items":[]}]}]}]}},{"id":"gqaekjJWYm","type":"paragraph","data":{"text":"<br>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"Jfv8pgW4Mo","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Чек лист</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"DYBvCVW7px","type":"checklist","data":{"items":[{"text":"Выполненный элемент","checked":true},{"text":"Невыполненный элемент","checked":false}]}},{"id":"e5DoaRMS7_","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Заголовки</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"Gd_x7Ym-tZ","type":"header","data":{"text":"Заголовок 1 уровня","level":1},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"5PFY2aPKiY","type":"header","data":{"text":"Заголовок 2 уровня","level":2},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"P-6nHuB7wy","type":"header","data":{"text":"Заголовок 3 уровня","level":3},"tunes":{"anyTuneName":{"alignment":"right"}}},{"id":"PKlWUVrOnw","type":"header","data":{"text":"Заголовок 4 уровня","level":4},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"aPFB40maW7","type":"header","data":{"text":"Заголовок 5 уровня","level":5},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"JPpurdBQRm","type":"header","data":{"text":"Заголовок 6 уровня","level":6},"tunes":{"anyTuneName":{"alignment":"right"}}},{"id":"KF250ZeM8r","type":"paragraph","data":{"text":"Как вы могли заметить, заголовки и текст могут быть центрированы 3 способами: слева, посередине и справа."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"bDs-8qw4G9","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Разделитель</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"kl6CueNSSv","type":"delimiter","data":{}},{"id":"JFuhO6vInU","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Таблица</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"SBCuf8a5PO","type":"table","data":{"withHeadings":false,"content":[["1 столбец 1 строка","\n2 столбец 1 строка"],["\n1 столбец 2 строка","\n2 столбец 2 строка"]]}},{"id":"dpDo4_F0p5","type":"paragraph","data":{"text":"В настройках блока можно включить выделение верхней строки, в режиме редактирования она будет выделена жирным, а в режиме просмотра - иметь особое оформление."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"O7pTrmshUH","type":"table","data":{"withHeadings":true,"content":[["1 столбец 1 строка - заголовочная","2 столбец 1 строка - заголовочная","3 столбец 1 строка - заголовочная"],["1 столбец 2 строка","2 столбец 2 строка","3 столбец 2 строка"],["1 столбец 3 строка","2 столбец 3 строка","3 столбец 3 строка"]]}},{"id":"Otij-1ajrM","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Код</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"Tj81fbvP4n","type":"code","data":{"code":"function *calculator(input) {\n    var doubleThat = 2 * (yield (input / 2))\n    var another = yield (doubleThat)\n    return (input * doubleThat * another)\n}\n\n// инициализация со значением 10\nconst calc = calculator(10)\n\n// запуск калькулятора\ncalc.next() "}},{"id":"vy6OZ2hjbB","type":"paragraph","data":{"text":"На данный момент поддерживается только подсветка JavaScript языка, но в будущем будут добавлены и другие языки программирования."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"sEUnyNuES0","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">В разработке</u><br>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"NFiLeoiJQ7","type":"paragraph","data":{"text":"На данный момент в разработке находятся такие блоки, как: "},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"gjQSf9NQj-","type":"list","data":{"style":"unordered","items":[{"content":"Файл","items":[]},{"content":"Ссылка","items":[]},{"content":"Примечание","items":[]},{"content":"Изображение","items":[]},{"content":"Изображение по ссылке","items":[]},{"content":"Цитата","items":[]},{"content":"Кнопка","items":[]}]}}],"version":"2.26.5"}');

	mysqli_set_charset($Link, 'utf8mb4'); 
	$A5 = $Link->query("INSERT INTO Portfolios (UserID, Portfolio) VALUES('$UserID', '$template')"); 

	$mail = new Mail;
	$mail->from('portfoliohub@1gb.ru', 'Portfolio Hub');
	$mail->to($email);

	$mail->subject = 'Активация аккаунта';

	$mail->body = '
		<h1>Здравствуйте, '.$login.'!</h1>
		<p>Для активации вашего аккаунта в сервисе Portfolio Hub необходимо перейти по ссылке</p>
		<a href="https://portfoliohub.ru/activate/'.$UniqueLink.'">https://portfoliohub.ru/activate/'.$UniqueLink.'</a>
	';
	 
	$mail->send();

	if($A3 and $A4)
		// var_dump(fsockopen("ssl://smtp.yandex.ru",465));
		SendResponse($Link, ["message" => "Вы успешно зарегестрировались на сайте", "mail" => $data]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>