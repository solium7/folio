<?php
// Страница регистрации нового пользователя
header('Content-Type: text/html; charset=utf-8');

# Функция для генерации случайной строки для названия каталога пользователя
function generateCode($length = 6)
{
    $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    $code = "";
    $clen = strlen($chars) - 1;
    while (strlen($code) < $length) {
        $code .= $chars[mt_rand(0, $clen)];
    }
    return $code;
}

include_once 'db_connect.php';

if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

if (isset($_POST['submit'])) {

    echo '<br/> $_POST["submit"] is set...';

    $err = array();

    $regex = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/';

    # проверям логин
    if (!preg_match($regex, $_POST['login'])) {
        $err[] = "Некорректный адрес электронной почты";
    }

//    if (strlen($_POST['login']) < 3 or strlen($_POST['login']) > 30) {
//        $err[] = "Логин должен быть не меньше 3-х символов и не больше 30";
//    }

    echo '<br/> $login is correct...';

    # проверяем, не сущестует ли пользователя с таким именем
    $query = "SELECT employee_id FROM employees WHERE employee_login='" . mysqli_real_escape_string($link, $_POST['login']) . "'";
    $result = mysqli_query($link, $query);
    $rowcount = mysqli_num_rows($result);

    if ($rowcount > 0) {
        $err[] = "Пользователь с таким адресом e-mail уже зарегистрирован";
    }

    # Если нет ошибок, то добавляем в БД нового пользователя
    if (count($err) == 0) {

        echo '<br/> $err is zero...';

        $login = $_POST['login'];

        # Убираем лишние пробелы и делаем двойное шифрование
        $password = md5(md5(trim($_POST['password'])));
        $directory = uniqid();
        $activation = md5($login . time()); // encrypted email+timestamp
        $query = "INSERT INTO employees SET employee_login='" . $login . "', employee_email='" . $login . "', employee_password='" . $password . "', employee_directory='" . $directory . "', employee_activation='" . $activation . "'";
        mysqli_query($link, $query) or die('Unable to execute query. ' . mysqli_error($link));

        $to = $login;
        $subject = "Подтверждение электронной почты в системе электронных портфолио";
        $body = 'Здравствуйте! <br/> <br/> Мы должны убедиться в том, что вы человек. Пожалуйста, подтвердите адрес вашей электронной почты, и можете начать использовать ваш аккаунт на сайте. <br/> <br/> <a href="' . $base_url . 'activation.php?code=' . $activation . '">' . $base_url . 'activation.php?code=' . $activation . '</a>';
        echo '<br/> Trying to send_mail...';

        $headers = 'From: info@astrcmo.pro' . "\r\n" .
            'Reply-To: info@astrcmo.pro' . "\r\n" .
            'X-Mailer: PHP/' . phpversion() . "\r\n";

        $headers .= "Content-type: text/html; charset=\"UTF-8\"";
//        $headers.="Mime-Version: 1.0\n";
//        $headers.="Content-Type: multipart/alternative; boundary=\"$bound\"\n";
        $mail_status = mail($to, 'Подтверждение регистрации на astrcmo.pro', $body, $headers);
        echo '<br/> Mail to ' . $to . ' status is ' . $mail_status;
        $msg = "Регистрация выполнена успешно, пожалуйста, проверьте электронную почту.";
        echo '<br/>' . $msg;
        echo '<br/> $login is correct...';
        echo '<br/> Redirecting...';
//        header("Location: http://mail.ru");
//        echo '<br/> <script type="text/javascript">';
//        echo '<br/> window.location.href="http://mail.ru";';
//        echo '<br/> </script>';
        exit();
    } else {
        print "<b>При регистрации произошли следующие ошибки:</b><br>";
        foreach ($err AS $error) {
            print $error . "<br>";
        }
    }
}
?>


<!DOCTYPE html>
<!--[if lt IE 7 ]>
<html lang="en" class="no-js ie6 lt8"> <![endif]-->
<!--[if IE 7 ]>
<html lang="en" class="no-js ie7 lt8"> <![endif]-->
<!--[if IE 8 ]>
<html lang="en" class="no-js ie8 lt8"> <![endif]-->
<!--[if IE 9 ]>
<html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html lang="en" class="no-js"> <!--<![endif]-->
<head>
    <meta charset="UTF-8"/>
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">  -->
    <title>Система электронных портфолио педагогических работников Астраханской области</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Login and Registration Form with HTML5 and CSS3"/>
    <meta name="keywords" content="html5, css3, form, switch, animation, :target, pseudo-class"/>
    <meta name="author" content="Codrops"/>
    <link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" type="text/css" href="css/loginform/demo.css"/>
    <link rel="stylesheet" type="text/css" href="css/loginform/style.css"/>
    <link rel="stylesheet" type="text/css" href="css/loginform/animate-custom.css"/>
</head>
<body>
<div class="container">
    <!-- Codrops top bar -->
    <header>
        <h1>Регистрация в системе <span>электронных портфолио</span></h1>
    </header>
    <section>
        <div id="container_demo">
            <!-- hidden anchor to stop jump http://www.css3create.com/Astuce-Empecher-le-scroll-avec-l-utilisation-de-target#wrap4  -->
            <div id="wrapper">
                <div id="login" class="animate form">
                    <form action="register.php" method="post" autocomplete="on">
                        <h1> Регистрация </h1>
                        <!--                        <p>-->
                        <!--                            <label for="usernamesignup" class="uname" data-icon="u">Ваш логин</label>-->
                        <!--                            <input id="usernamesignup" name="usernamesignup" required="required" type="text"-->
                        <!--                                   placeholder="mysuperusername690"/>-->
                        <!--                        </p>-->
                        <p>
                            <label for="emailsignup" class="youmail" data-icon="e">Ваш e-mail (будет использоваться для
                                авторизации)</label>
                            <input id="emailsignup" name="login" required="required" type="email"
                                   placeholder=""/>
                        </p>
                        <p>
                            <label for="passwordsignup" class="youpasswd" data-icon="p">Пароль для входа в систему
                                портфолио</label>
                            <input id="passwordsignup" name="password" required="required" type="password"
                                   placeholder=""/>
                        </p>
                        <!--                        <p>-->
                        <!--                            <label for="passwordsignup_confirm" class="youpasswd" data-icon="p">Please confirm your password </label>-->
                        <!--                            <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="eg. X8df!90EO"/>-->
                        <!--                        </p>-->
                        <p class="signin button">
                            <input type="submit" name="submit" value="Зарегистрироваться"/>
                        </p>
                        <p class="change_link">
                            Уже зарегистрированы?
                            <a href="login.php" class="to_register"> Войти в систему </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
</body>
</html>

