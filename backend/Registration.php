<?php
	header('Access-Control-Allow-Origin: *');  
	header('Access-Control-Allow-Methods: OPTIONS, POST');
	header("Access-Control-Allow-Headers: Content-Type");
	header('Content-Type: application/json; charset=utf-8');

	include "URFUPortfolioHubLibrary.php"; 
	mysqli_set_charset($Link, 'utf8'); 
	include "mail.php"; 
	require 'phpmailer/PHPMailer.php';
	require 'phpmailer/SMTP.php';
	require 'phpmailer/Exception.php';


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

	$template = addslashes('{"time":1683810238831,"blocks":[{"id":"7WAQHwPGje","type":"header","data":{"text":"Привет! 🤚","level":1},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"_QSg_7Rzs6","type":"header","data":{"text":"Это блочный редактор Portfolio Hub ✒️","level":2},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"TdLo2o09MU","type":"paragraph","data":{"text":"Ты встретишься с ним при редактировании портфолио или информации о проекте. Давай познакомимся ближе, ниже будет представлен шаблон, который расскажет о всех возможностях, ты можешь с ним ознакомиться и удалить, выделив всё содержимое."},"tunes":{"anyTuneName":{"alignment":"center"},"textVariant":""}},{"id":"g6tYUEgwSR","type":"delimiter","data":{}},{"id":"DPfatlhnac","type":"header","data":{"text":"Концепция №1. Всё есть \"блок\"","level":3},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"zPhf79_GIY","type":"paragraph","data":{"text":"Нужно представить, что каждый элемент содержимого, который вы добавляете на страницу - будь то текст, изображение или таблица - это один строительный блок. Любая страница - это стопка блоков. Их можно скомбинировать так, как вы захотите."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"1Cx71voZ_9","type":"paragraph","data":{"text":"Нужно нажать <code class=\"inline-code\">Tab</code> на клавиатуре (или нажмите кнопку + слева от редактора). Так вы увидите все типы разного контента, который можете добавить."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"rE9pXEbKjh","type":"paragraph","data":{"text":""},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"GFWSiArBk-","type":"header","data":{"text":"Концепция №2. Блоки могут трансформироваться","level":3},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"phIh-2GCGJ","type":"paragraph","data":{"text":"Любой блок информации можно превратить в другой тип блока или же видоизменить."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"e-HfRpi6y0","type":"paragraph","data":{"text":"Это можно сделать выбрав вот такой символ <code class=\"inline-code\">⋮⋮</code> слева от блока, он называется кнопкой блока. В зависимости от типа блока будут доступны разные настройки, подробнее о каждой из них будет написано в описании конкретного блока."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"09E9On96Ob","type":"paragraph","data":{"text":""},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"eLmD25xSKV","type":"header","data":{"text":"Концепция №3. Текст можно модифицировать","level":3},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"risaL4rx6B","type":"paragraph","data":{"text":"При выделении текста в любом блоке, будь то таблица или же цитата, вы можете изменять его оформление. Делать <b>жирным</b>, <i>курсивным</i>, <u class=\"cdx-underline\">подчёркнутым</u>, <s class=\"cdx-strikethrough\">зачёркнутым</s>, <mark class=\"cdx-marker\">выделенным</mark>, <code class=\"inline-code\">внутренним кодом </code>, <a href=\"https://vk.com\">ссылкой</a>, <b><i>или же </i></b><u class=\"cdx-underline\"><s class=\"cdx-strikethrough\"><b><i></i></b>комбинировать все </s></u><code class=\"inline-code\"><b><u class=\"cdx-underline\"><s class=\"cdx-strikethrough\"></s></u>стили</b></code>."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"671S1Zz3qy","type":"delimiter","data":{}},{"id":"OR_x5FhZtN","type":"header","data":{"text":"Описание блоков","level":2},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"1H0UDTql4q","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Текстовый блок</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"1hSbyGDWzx","type":"paragraph","data":{"text":"Это текстовый блок. Вы можете ввести в него столько текста, сколько захотите. Как только вы нажмете <code class=\"inline-code\">Enter</code>, вы создадите разрыв строки и перейдите к новому блоку. С помощью меню блока можно изменить центрирование текста."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"fMzn2WnMze","type":"paragraph","data":{"text":"Совет: Вы можете нажать <code class=\"inline-code\">Shift + Enter</code>, чтобы создать разрывы строк внутри одного текстового блока.<br>Обратите внимание, как я это сделал, чтобы создать эту новую строку внутри того же блока, что и текст выше."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"2JoXYR0ju5","type":"paragraph","data":{"text":""},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"cv5KySpv84","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Нумерованный и ненумерованный списки</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"gh2HlW4wAH","type":"list","data":{"style":"ordered","items":[{"content":"Я перечисляю пронумерованные вещи","items":[]},{"content":"Могу иметь несколько пунктов","items":[{"content":"И несколько уровней","items":[{"content":"Чтобы сделать вложенный пункт, необходимо нажать <code class=\"inline-code\">Tab</code>","items":[]}]}]}]}},{"id":"4FB-pK-4U5","type":"list","data":{"style":"unordered","items":[{"content":"Порядок меня волнует гораздо меньше.","items":[{"content":"Но я тоже могу иметь несколько уровней","items":[{"content":"Чтобы выйти из редактирования списка, необходимо несколько раз нажать <code class=\"inline-code\">Enter</code>","items":[]}]}]}]}},{"id":"gqaekjJWYm","type":"paragraph","data":{"text":"<br>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"Jfv8pgW4Mo","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Чек лист</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"DYBvCVW7px","type":"checklist","data":{"items":[{"text":"Выполненный элемент","checked":true},{"text":"Невыполненный элемент","checked":false}]}},{"id":"pDTjAchG8_","type":"paragraph","data":{"text":""},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"e5DoaRMS7_","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Заголовки</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"Gd_x7Ym-tZ","type":"header","data":{"text":"Заголовок 1 уровня","level":1},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"5PFY2aPKiY","type":"header","data":{"text":"Заголовок 2 уровня","level":2},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"P-6nHuB7wy","type":"header","data":{"text":"Заголовок 3 уровня","level":3},"tunes":{"anyTuneName":{"alignment":"right"}}},{"id":"PKlWUVrOnw","type":"header","data":{"text":"Заголовок 4 уровня","level":4},"tunes":{"anyTuneName":{"alignment":"left"}}},{"id":"aPFB40maW7","type":"header","data":{"text":"Заголовок 5 уровня","level":5},"tunes":{"anyTuneName":{"alignment":"center"}}},{"id":"JPpurdBQRm","type":"header","data":{"text":"Заголовок 6 уровня","level":6},"tunes":{"anyTuneName":{"alignment":"right"}}},{"id":"KF250ZeM8r","type":"paragraph","data":{"text":"Как вы могли заметить, заголовки и текст могут быть центрированы 3 способами: слева, посередине и справа."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"T0CfQD7hn3","type":"paragraph","data":{"text":""},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"bDs-8qw4G9","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Разделитель</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"kl6CueNSSv","type":"delimiter","data":{}},{"id":"x0E_Fu26xk","type":"paragraph","data":{"text":""},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"JFuhO6vInU","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Таблица</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"SBCuf8a5PO","type":"table","data":{"withHeadings":false,"content":[["1 столбец 1 строка","\n2 столбец 1 строка"],["\n1 столбец 2 строка","\n2 столбец 2 строка"]]}},{"id":"dpDo4_F0p5","type":"paragraph","data":{"text":"В настройках блока можно включить выделение верхней строки, в режиме редактирования она будет выделена жирным, а в режиме просмотра - иметь особое оформление."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"cHRazjRq2h","type":"table","data":{"withHeadings":true,"content":[["Game","Platform","Type","Notes"],["Dance Dance Revolution","Arcade","Rhythm","I may or may not have spent $2400 on metal dance pads for my house..."],["Celeste","Switch","Platformer","<mark>I still haven\'t beaten the C Sides.</mark>"],["Hollow Knight","Switch","Metroidvania","Path of Pain is my favorite part 💗"],["Overwatch","PC","First Person Shooter","Main: <mark>Pharah!</mark>"],["Hades","Switch","Roguelike","Max-crit % bow builds for life 🏹"],["Portal 2","PC","Puzzle","Caroline."],["Assassin\'s Creed Revelations","Xbox 360","Action RPG","<code>I just love the linear sections so much.</code>"],["Slay the Spire","PC","Roguelike Deckbuilder","I literally always play <a href=\"https://www.youtube.com/watch?v=Fc-9zqtoFa0\">The Silent</a>"],["The Legend of Zelda: Breath of the Wild","Switch","Action RPG","Note to self: <a href=\"https://www.notion.so/Replay-Breath-of-the-Wild-f6e4ff51404b41dea9a45ad0a9748d4c\">🩳Replay Breath of the Wild</a> "],["Enter the Gungeon","Switch","Roguelike","Pew pew"]]}},{"id":"k0KBmNOVgi","type":"paragraph","data":{"text":""},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"Otij-1ajrM","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">Код</u>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"Tj81fbvP4n","type":"code","data":{"code":"function *calculator(input) {\n    var doubleThat = 2 * (yield (input / 2))\n    var another = yield (doubleThat)\n    return (input * doubleThat * another)\n}\n\n// инициализация со значением 10\nconst calc = calculator(10)\n\n// запуск калькулятора\ncalc.next() "}},{"id":"vy6OZ2hjbB","type":"paragraph","data":{"text":"На данный момент поддерживается только подсветка JavaScript языка, но в будущем будут добавлены и другие языки программирования."},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"2-4cvv65mh","type":"paragraph","data":{"text":""},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"sEUnyNuES0","type":"paragraph","data":{"text":"<u class=\"cdx-underline\">В разработке💻</u><br>"},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"NFiLeoiJQ7","type":"paragraph","data":{"text":"На данный момент в разработке находятся такие блоки, как: "},"tunes":{"anyTuneName":{"alignment":"left"},"textVariant":""}},{"id":"gjQSf9NQj-","type":"list","data":{"style":"unordered","items":[{"content":"Файл","items":[]},{"content":"Ссылка","items":[]},{"content":"Примечание","items":[]},{"content":"Изображение","items":[]},{"content":"Изображение по ссылке","items":[]},{"content":"Цитата","items":[]},{"content":"Кнопка","items":[]}]}}],"version":"2.26.5"}');

	$A6 = $Link->query("INSERT INTO ProjectsBlocks (UserID, Blocks) VALUES('$UserID', '[]')"); 
	mysqli_set_charset($Link, 'utf8mb4'); 
	$A5 = $Link->query("INSERT INTO Portfolios (UserID, Blocks) VALUES('$UserID', '$template')"); 


	$mail = new Mail;
	$mail->from('portfoliohub@1gb.ru', 'Portfolio Hub');
	$mail->to($email);

	$mail->subject = 'Активация аккаунта';

	$mail->body = '
<div style="background-color:#202023;">


    <!--[if mso | IE]>
    <table
            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
    >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->


    <div style="background:#313134;background-color:#313134;Margin:0px auto;max-width:600px;">

        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
               style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #202023; background-color: #202023; width: 100%;"
               width="100%" bgcolor="#f9f9f9">
            <tbody>
            <tr>
                <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-bottom: #333957 solid 5px; direction: ltr; font-size: 0px; padding: 20px 0; text-align: center; vertical-align: top;"
                    align="center" valign="top">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">

                        <tr>

                        </tr>

                    </table>
                    <![endif]-->
                    <svg width="199" height="36" viewBox="0 0 199 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.4964 12.0898H50.3753C53.8441 12.0898 56.2347 14.3984 56.2347 17.8789C56.2347 21.3477 53.762 23.668 50.1995 23.668H47.0355V29H43.4964V12.0898ZM47.0355 14.8906V20.9023H49.4261C51.4534 20.9023 52.637 19.8242 52.637 17.8906C52.637 15.9688 51.4652 14.8906 49.4378 14.8906H47.0355ZM64.1031 29.2695C60.3063 29.2695 57.8805 26.832 57.8805 22.707C57.8805 18.6406 60.3414 16.168 64.1031 16.168C67.8648 16.168 70.3258 18.6289 70.3258 22.707C70.3258 26.8438 67.9 29.2695 64.1031 29.2695ZM64.1031 26.6562C65.7789 26.6562 66.8453 25.2383 66.8453 22.7188C66.8453 20.2227 65.7672 18.7812 64.1031 18.7812C62.4391 18.7812 61.3492 20.2227 61.3492 22.7188C61.3492 25.2383 62.4156 26.6562 64.1031 26.6562ZM72.8153 29V16.4375H76.12V18.6992H76.1903C76.6356 17.1055 77.702 16.2383 79.1786 16.2383C79.577 16.2383 79.9169 16.2969 80.1513 16.3672V19.3789C79.87 19.2617 79.4013 19.1797 78.9091 19.1797C77.2216 19.1797 76.2372 20.2109 76.2372 21.9805V29H72.8153ZM83.1916 13.543H86.6134V16.4375H88.9338V19.0156H86.6134V25.0273C86.6134 25.9883 87.0822 26.4453 88.09 26.4453C88.3947 26.4453 88.7111 26.4219 88.922 26.3867V28.9062C88.5705 28.9883 87.9845 29.0469 87.2931 29.0469C84.34 29.0469 83.1916 28.0625 83.1916 25.6133V19.0156H81.422V16.4375H83.1916V13.543ZM92.4428 29V19.0156H90.7319V16.4961H92.4428V15.5469C92.4428 13.0859 93.603 11.9375 96.5795 11.9375C97.2123 11.9375 97.9272 12.0078 98.3256 12.0898V14.3516C98.0795 14.3047 97.7397 14.2812 97.3998 14.2812C96.2748 14.2812 95.7827 14.7734 95.7827 15.6641V16.4961H98.2788V19.0156H95.8647V29H92.4428ZM106.217 29.2695C102.421 29.2695 99.9948 26.832 99.9948 22.707C99.9948 18.6406 102.456 16.168 106.217 16.168C109.979 16.168 112.44 18.6289 112.44 22.707C112.44 26.8438 110.014 29.2695 106.217 29.2695ZM106.217 26.6562C107.893 26.6562 108.96 25.2383 108.96 22.7188C108.96 20.2227 107.882 18.7812 106.217 18.7812C104.553 18.7812 103.464 20.2227 103.464 22.7188C103.464 25.2383 104.53 26.6562 106.217 26.6562ZM115.012 29V12.0898H118.434V29H115.012ZM121.521 29V16.4375H124.943V29H121.521ZM123.232 15.0547C122.2 15.0547 121.404 14.2695 121.404 13.2852C121.404 12.2891 122.2 11.5156 123.232 11.5156C124.263 11.5156 125.06 12.2891 125.06 13.2852C125.06 14.2695 124.263 15.0547 123.232 15.0547ZM133.713 29.2695C129.917 29.2695 127.491 26.832 127.491 22.707C127.491 18.6406 129.952 16.168 133.713 16.168C137.475 16.168 139.936 18.6289 139.936 22.707C139.936 26.8438 137.51 29.2695 133.713 29.2695ZM133.713 26.6562C135.389 26.6562 136.456 25.2383 136.456 22.7188C136.456 20.2227 135.378 18.7812 133.713 18.7812C132.049 18.7812 130.96 20.2227 130.96 22.7188C130.96 25.2383 132.026 26.6562 133.713 26.6562ZM162.892 29H159.353V21.875H151.735V29H148.196V12.0898H151.735V18.957H159.353V12.0898H162.892V29ZM177.733 16.4375V29H174.428V26.7383H174.358C173.737 28.3203 172.495 29.2344 170.596 29.2344C167.877 29.2344 166.073 27.4648 166.073 24.5352V16.4375H169.495V23.8203C169.495 25.4961 170.327 26.3867 171.838 26.3867C173.362 26.3867 174.311 25.2969 174.311 23.6328V16.4375H177.733ZM188.144 29.1992C186.304 29.1992 184.898 28.3086 184.207 26.8438H184.136V29H180.761V12.0898H184.183V18.6172H184.254C184.945 17.1289 186.34 16.2383 188.133 16.2383C191.297 16.2383 193.242 18.6641 193.242 22.7188C193.242 26.7617 191.308 29.1992 188.144 29.1992ZM186.961 18.9805C185.308 18.9805 184.172 20.4688 184.172 22.7188C184.172 24.9922 185.297 26.4453 186.961 26.4453C188.672 26.4453 189.738 25.0156 189.738 22.7188C189.738 20.4336 188.66 18.9805 186.961 18.9805Z" fill="#6EDED0"/>
                        <path d="M34 22.0097C29.059 24.0097 23.6581 25.1111 18 25.1111C12.3419 25.1111 6.94097 24.0097 2 22.0097M25.1111 9.11111V5.55555C25.1111 3.59188 23.5192 2 21.5556 2H14.4444C12.4808 2 10.8889 3.59188 10.8889 5.55555V9.11111M18 19.7778H18.0178M5.55555 34H30.4444C32.4081 34 34 32.4081 34 30.4444V12.6667C34 10.703 32.4081 9.11111 30.4444 9.11111H5.55555C3.59188 9.11111 2 10.703 2 12.6667V30.4444C2 32.4081 3.59188 34 5.55555 34Z" stroke="#6EDED0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </td>
            </tr>
            </tbody>
        </table>

    </div>


    <!--[if mso | IE]>
    </td>
    </tr>
    </table>

    <table
            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
    >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->


    <div style="background:#313134;background-color:#313134;Margin:0px auto;max-width:600px;">

        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
               style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #313134; background-color: #313134; width: 100%;"
               width="100%" bgcolor="#fff">
            <tbody>
            <tr>
                <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border: transparent solid 1px; border-top: 0px; direction: ltr; font-size: 0px; padding: 20px 0; text-align: center; vertical-align: top;"
                    align="center" valign="top">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">

                        <tr>

                            <td
                                    style="vertical-align:bottom;width:600px;"
                            >
                    <![endif]-->

                    <div class="mj-column-per-100 outlook-group-fix"
                         style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">

                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                               style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: bottom;"
                               width="100%" valign="bottom">

                            <tr>
                                <td align="center"
                                    style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                           style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                        <tbody>
                                        <tr>
                                            <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 269px;"
                                                width="269">

                                                <img height="auto" src="https://ren-design.ru/api/portfolio-hub/1.0/files/Saly-21.png"
                                                     style="height: auto; line-height: 100%; -ms-interpolation-mode: bicubic; border: 0; display: block; outline: none; text-decoration: none; width: 100%;"
                                                     width="269">

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td align="center"
                                    style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 0px; padding: 10px 25px; padding-bottom: 5px; word-break: break-word;">

                                    <div style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:32px;font-weight:bold;line-height:1;text-align:center;color:#EEEEEE;">
                                        Здравствуйте, '.$login.'!
                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td align="center"
                                    style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 0px; padding: 10px 25px; padding-bottom: 30px; word-break: break-word;">

                                    <div style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:16px;line-height:22px;text-align:center;color:#9E9E9E;">
                                        Спасибо за регистрацию на Portfolio Hub!
                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td align="center"
                                    style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 0px; padding: 10px 25px; padding-bottom: 20px; word-break: break-word;">

                                    <div style="font-family:\'Helvetica Neue\',Arial,sans-serif;font-size:20px;line-height:22px;text-align:center;color:#EEEEEE;">
                                        Следующий шаг - верификация аккаунта.<br/>
                                        Для этого перейдите по ссылке ниже:
                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <td align="center"
                                    style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 0px; padding: 10px 25px; padding-top: 30px; padding-bottom: 40px; word-break: break-word;">

                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                           style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: separate; line-height: 100%;">
                                        <tr>
                                            <td align="center" bgcolor="#81E6D9" role="presentation"
                                                style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border: none; border-radius: 10px; color: #ffffff; cursor: auto; padding: 10px 15px;"
                                                valign="middle">
                                                <a style="text-decoration: none;" href="https://portfoliohub.ru/activate/'.$UniqueLink.'">
                                                    <p style="display: block; margin: 0 0 0 0; background: #81E6D9; color: #000000; font-family: \'Helvetica Neue\',Arial,sans-serif; font-size: 18px; font-weight: 600; line-height: 120%; margin: 0; text-decoration: none; text-transform: none;">
                                                        Верифицировать
                                                    </p>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                </td>
                            </tr>

                        </table>

                    </div>

                    <!--[if mso | IE]>
                    </td>

                    </tr>

                    </table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>

    </div>

</div>';


	$mail->send();

	if($A3 and $A4)
		// var_dump(fsockopen("ssl://smtp.yandex.ru",465));
		SendResponse($Link, ["message" => "Вы успешно зарегестрировались на сайте", "mail" => $data]);
	else
		ThrowError($Link, 500, "Ошибка сервера! Обратитесь к администратору.");
?>