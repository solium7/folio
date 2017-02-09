<?php
include_once '../dbqueries/check_auth.php';
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Персональные данные педагогического работника</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" href="personal_data.css">
</head>
<style>
    span.reference {
        position: fixed;
        left: 5px;
        top: 5px;
        font-size: 10px;
        text-shadow: 1px 1px 1px #fff;
    }

    span.reference a {
        color: #555;
        text-decoration: none;
        text-transform: uppercase;
    }

    span.reference a:hover {
        color: #000;

    }

    h1 {
        color: #ccc;
        font-size: 36px;
        text-shadow: 1px 1px 1px #fff;
        padding: 20px;
    }
</style>
<body>
<div id="content">
    <h1>Персональные данные педагогического работника</h1>
    <div id="wrapper">
        <div id="steps">
            <form id="formElem" name="formElem" action="" method="post">
                <fieldset class="step">
                    <legend>ФИО и контакты</legend>
                    <p>
                        <label for="lasname">Фамилия</label>
                        <input id="lastname" name="lastname" type="text" AUTOCOMPLETE=OFF/>
                    </p>
                    <p>
                        <label for="firstname">Имя</label>
                        <input id="firstname" name="firstname" type="text" AUTOCOMPLETE=OFF/>
                    </p>
                    <p>
                        <label for="surname">Отчество</label>
                        <input id="surname" name="surname" type="text" AUTOCOMPLETE=OFF/>
                    </p>
                    <p>
                        <label for="email">Email</label>
                        <input id="email" name="email" placeholder="" type="email" AUTOCOMPLETE=OFF/>
                    </p>
                    <p>
                        <label for="address">Адрес для почтовой респонденции</label>
                        <textarea id="address" name="address" cols="40" rows="4"></textarea>
                    </p>
                    <p>
                        <label for="phones">Контактные телефоны (раб., дом., моб.)</label>
                        <textarea id="phones" name="phones" cols="40" rows="3"></textarea>
                    </p>
                </fieldset>
                <fieldset class="step">
                    <legend>Иноформация об образовании</legend>
                    <p>
                        <label for="education">Данные об образовании (когда, что, специальность, квалификация)</label>
                        <textarea id="education" name="education" cols="40" rows="6"></textarea>
                    </p>
                </fieldset>
                <fieldset class="step">
                    <legend>Текущие места работы</legend>
                    <p>
                        <label for="occupation1">Должность 1</label>
                        <input id="occupation1" name="occupation1" type="text" AUTOCOMPLETE=OFF/>
                        <label for="organization1">Полное наименование организации</label>
                        <textarea id="organization1" name="organization1" cols="40" rows="3"></textarea>
                        <label for="occupationexperience1">Стаж работы в данной должности, лет</label>
                        <input id="occupationexperience1" name="occupationexperience1" type="number" AUTOCOMPLETE=OFF/>
                        <label for="organizationexperience1">Стаж работы в учреждении, лет</label>
                        <input id="organizationexperience1" name="organizationexperience1" type="number"
                               AUTOCOMPLETE=OFF/>
                    </p>

                    <p>
                        <label for="occupation2">Должность 2</label>
                        <input id="occupation2" name="occupation2" type="text" AUTOCOMPLETE=OFF/>
                        <label for="organization2">Полное наименование организации</label>
                        <textarea id="organization2" name="organization2" cols="40" rows="3"></textarea>
                        <label for="occupationexperience2">Стаж работы в данной должности, лет</label>
                        <input id="occupationexperience2" name="occupationexperience2" type="number" AUTOCOMPLETE=OFF/>
                        <label for="organizationexperience2">Стаж работы в учреждении, лет</label>
                        <input id="organizationexperience2" name="organizationexperience2" type="number"
                               AUTOCOMPLETE=OFF/>
                    </p>
                </fieldset>
                <fieldset class="step">
                    <legend>Категория и стаж</legend>
                    <p>
                        <label for="category">Категория</label>
                        <select id="category" name="category">
                            <option>I</option>
                            <option>II</option>
                            <option>III</option>
                            <option>IV</option>
                            <option>V</option>
                            <option>VI</option>
                        </select>
                    </p>
                    <p>
                        <label for=categorydate>Дата окончания срока действия категории</label>
                        <input id="categorydate" name="categorydate" type="date" AUTOCOMPLETE=OFF/>
                    </p>
                    <p>
                        <label for="experience">Стаж работы по специальности, лет</label>
                        <input id="experience" name="experience" type="number" AUTOCOMPLETE=OFF/>
                    </p>
                </fieldset>
                <fieldset class="step">
                    <legend>Сведения о наградах и званиях</legend>
                    <p>
                        <label for="awards">Награды, ученая степень, ученын звания</label>
                        <textarea id="awards" name="awards" cols="40" rows="25"></textarea>
                    </p>
                </fieldset>
                <fieldset class="step">
                    <legend>Подтверждение и сохранение данных</legend>
                    <p>
<!--                        Все данные введены правильно, проверены и готовы к загрузке на сервер-->
                    </p>
                    <p class="submit">
                        <button id="registerButton" type="submit">Сохранить персональные данные</button>
                    </p>
                </fieldset>
            </form>
        </div>
        <div id="navigation" style="display:none;">
            <ul>
                <li class="selected">
                    <a href="#">ФИО и контакты</a>
                </li>
                <li>
                    <a href="#">Образование</a>
                </li>
                <li>
                    <a href="#">Работа</a>
                </li>
                <li>
                    <a href="#">Категория и стаж</a>
                </li>
                <li>
                    <a href="#">Награды и звания</a>
                </li>
                <li>
                    <a href="#">Подтвердить</a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="veil"><img src="../images/preloader.gif" alt=""></div>
<script src="personal_data.js"></script>
</body>
</html>