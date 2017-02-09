<?php
header('Content-Type: text/html; charset=utf-8');
// Страница авторизации
# Функция для генерации случайной строки
function generateCode($length=6) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";
    $code = "";
    $clen = strlen($chars) - 1;
    while (strlen($code) < $length) {
        $code .= $chars[mt_rand(0,$clen)];
    }
    return $code;
}
//echo $_SERVER['REMOTE_ADDR']."<br>";
# Соединямся с БД

include_once 'db_connect.php';

if(isset($_POST['submit']))
{
    # Вытаскиваем из БД запись, у которой логин равняеться введенному
    $query = "SELECT employee_id, employee_password, employee_directory  FROM employees WHERE employee_login='".mysqli_real_escape_string($link, $_POST['login'])."' LIMIT 1";
    $result = mysqli_query($link, $query);
    $data = mysqli_fetch_assoc($result);

    # Сравниваем пароли
    echo $data['employee_password']."  <>  ".md5(md5($_POST['password']));
    echo "<br>";
    if($data['employee_password'] === md5(md5($_POST['password'])))
    {
        # Генерируем случайное число и шифруем его
        $hash = md5(generateCode(10));

        if(!@$_POST['not_attach_ip'])
        {
            # Если пользователя выбрал привязку к IP
            # Переводим IP в строку
            $insip = ", employee_ip=INET_ATON('".$_SERVER['REMOTE_ADDR']."')";
        }

        # Записываем в БД новый хеш авторизации и IP
        $query = "UPDATE employees SET employee_hash='".$hash."' ".$insip." WHERE employee_id='".$data['employee_id']."'";
        mysqli_query($link, $query) or die ('Unable to execute query. ' . mysqli_error($link));

        # Ставим куки
        setcookie("id", $data['employee_id'], time()+60*60*24*30);
        setcookie("hash", $hash, time()+60*60*24*30);
        setcookie("catalog", $data['employee_directory'], time()+60*60*24*30);

        # Переадресовываем браузер на страницу приложения
        header("Location: index.php");
        exit();
    }
    else
    {
        print "Вы ввели неправильный логин/пароль";
    }
}
?>

<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6 lt8"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7 lt8"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8 lt8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
    <meta charset="UTF-8" />
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">  -->
    <title>Система электронных портфолио педагогических работников Астраханской области</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Login and Registration Form with HTML5 and CSS3" />
    <meta name="keywords" content="html5, css3, form, switch, animation, :target, pseudo-class" />
    <meta name="author" content="Codrops" />
    <link rel="shortcut icon" href="../favicon.ico">
    <link rel="stylesheet" type="text/css" href="css/loginform/demo.css" />
    <link rel="stylesheet" type="text/css" href="css/loginform/style.css" />
    <link rel="stylesheet" type="text/css" href="css/loginform/animate-custom.css" />
</head>
<body>
<div class="container">
    <header>
        <h1>Вход в систему <span>электронных портфолио</span></h1>
    </header>
    <section>
        <div id="container_demo" >
            <!-- hidden anchor to stop jump http://www.css3create.com/Astuce-Empecher-le-scroll-avec-l-utilisation-de-target#wrap4  -->
            <a class="hiddenanchor" id="toregister"></a>
            <a class="hiddenanchor" id="tologin"></a>
            <div id="wrapper">
                <div id="login" class="animate form">
                    <form  action="login.php" method="post" autocomplete="on">
                        <h1>Авторизация</h1>
                        <p>
                            <label for="username" class="uname" data-icon="u" > Ваш e-mail </label>
                            <input id="username" name="login" required="required" type="text" placeholder=""/>
                        </p>
                        <p>
                            <label for="password" class="youpasswd" data-icon="p"> Ваш пароль </label>
                            <input id="password" name="password" required="required" type="password" placeholder="" />
                        </p>
                        <p class="login button">
                            <input type="submit" name="submit" value="Войти" />
                        </p>
                        <p class="change_link">
                            Не зарегистрированы в системе?
                            <a href="register.php" class="to_register">Регистрация</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
</body>
</html>