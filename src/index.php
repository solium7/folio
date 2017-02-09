<?php
include_once 'check_auth.php';

//выбрать все портфолио

$occupations = array(
"nobody",
"учитель",
"инструктор по труду",
"преподаватель",
"учитель2",
"учитель3",
"воспитатель",
"руководитель физического воспитания",
"преподаватель – организатор основ безопасности жизнедеятельности",
"педагог дополнительного образования",
"музыкальный руководитель",
"мастер производственного обучения",
"инструктор по физической культуре",
"учитель-дефектолог, учитель-логопед",
"педагог-библиотекарь",
"тренер-преподаватель",
"инструктор-методист",
"методист",
"педагог-организатор",
"социальный педагог",
"педагог-психолог",
"концентмейстер");

$query = "SELECT * FROM portfolios WHERE employee_id = '" . intval($_COOKIE['id']) . "'";
$portfoliosResult = mysqli_query($link, $query);
$query = "SELECT employee_firstname, employee_surname, employee_lastname FROM employees WHERE employee_id = '" . intval($_COOKIE['id']) . "'";
$namesResult = mysqli_query($link, $query);

$namesRow = mysqli_fetch_array($namesResult);
mysqli_free_result($namesResult);
mysqli_close($link);

setcookie("firstName", $namesRow['employee_firstname'], time()+60*60*24*30);
setcookie("surName", $namesRow['employee_surname'], time()+60*60*24*30);
setcookie("lastName", $namesRow['employee_lastname'], time()+60*60*24*30);
?>

<!DOCTYPE html>

<html lang="RU">
    <head>
        <title>Система электронных портфолио педагогических работников Астраханской области</title>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 

        <link rel="stylesheet" type="text/css" href="css/main_page.css" />
        <!--<link href="https://fonts.googleapis.com/css?family=El+Messiri" rel="stylesheet">-->
        <link href="https://fonts.googleapis.com/css?family=Exo+2" rel="stylesheet">
    </head>
    <body>
        <div class="container">
                <ul class="ca-menu">
                    <?php
                    while ($row = mysqli_fetch_array($portfoliosResult)) {
                        echo "<li class=\"portfolio-link\" data-portfolio=\"" . $row["id"] . "\" data-occupation=\"" . $row["employee_occupation"] . "\">";
                        echo '<span class="ca-icon">ꔷ</span>';
                        echo '<div class="ca-content">';
                        echo '<h2 class="ca-main">Портфолио "' . $occupations[$row["employee_occupation"]] . '"</h2>';
                        echo '<h3 class="ca-sub">Электронное портфолио педагогического работника</h3>';
                        echo '</div>';
                        echo '</li>';
                    }
                    mysqli_free_result($portfoliosResult);
                    mysqli_close($link);
                    ?>

                    <li>
                        <a href="personal_data.php">
                            <span class="ca-icon">ꔷ</span>
                            <div class="ca-content">
                                <h2 class="ca-main">Персональные данные</h2>
                                <h3 class="ca-sub">Персональные данные педагогического работника</h3>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="ca-icon">ꔷ</span>
                            <div class="ca-content">
                                <h2 class="ca-main">Заявления на аттестацию</h2>
                                <h3 class="ca-sub">Подать заявление на аттестацию по должности "учитель"</h3>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span class="ca-icon">ꔷ</span>
                            <div class="ca-content">
                                <h2 class="ca-main">Выход</h2>
                                <h3 class="ca-sub">Выйти из системы электронных портфолио</h3>
                            </div>
                        </a>
                    </li>
                    <!--<li>-->
                        <!--<a href="#">-->
                            <!--<span class="ca-icon">L</span>-->
                            <!--<div class="ca-content">-->
                                <!--<h2 class="ca-main">Unconditional Support</h2>-->
                                <!--<h3 class="ca-sub">24/7 for you needs</h3>-->
                            <!--</div>-->
                        <!--</a>-->
                    <!--</li>-->
                </ul>
            </div><!-- content -->
        </div>
        <script src="main_page.js"></script>
    </body>
</html>