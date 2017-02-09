<?php
include 'db_connect.php';
$msg = '';
if (!empty($_GET['code']) && isset($_GET['code'])) {
    $code = mysqli_real_escape_string($link, $_GET['code']);
    $c = mysqli_query($link, "SELECT employee_id FROM employees WHERE employee_activation='$code'");
    if (mysqli_num_rows($c) > 0) {
        $count = mysqli_query($link, "SELECT employee_id FROM employees WHERE employee_activation='$code' and employee_status='0'");

        if (mysqli_num_rows($count) > 0) {
            mysqli_query($link, "UPDATE employees SET employee_status='1' WHERE employee_activation='$code'");
            $msg = "Ваш аккаунт активирован";
        } else {
            $msg = "Ваш аккаунт уже активирован, нет необходимости активировать его снова.";
        }
    } else {
        $msg = "Неверный код активации";
    }
}
?>
    //HTML часть
<?php echo $msg; ?>