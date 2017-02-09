<?php

include_once 'db_connect.php';

//if (!isset($_COOKIE['id']) or !isset($_COOKIE['hash'])) {
////    print "Включите куки";
//    exit();
//} else {


$query = "SELECT * FROM employees WHERE employee_id = '" . intval($_COOKIE['id']) . "' LIMIT 1";
//    ,INET_NTOA(employee_ip)

$result = mysqli_query($link, $query);
$userdata = mysqli_fetch_assoc($result);
if (($userdata['employee_hash'] !== $_COOKIE['hash']) or ($userdata['employee_id'] !== $_COOKIE['id']) or (($userdata['employee_ip'] != ip2long($_SERVER['REMOTE_ADDR'])) and ($userdata['employee_ip'] !== "0"))) {
    setcookie("id", "", time() - 3600 * 24 * 30 * 12, "/");
    setcookie("hash", "", time() - 3600 * 24 * 30 * 12, "/");
    header("Location: login.php");
    exit();
}