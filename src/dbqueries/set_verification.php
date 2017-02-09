<?php
header('Content-type: application/json; charset=utf-8');

include_once 'check_auth.php';

$query = 'SELECT verification FROM verifications WHERE expert_id = ' . intval($_COOKIE['id']) . ' AND document_id = ' . $_GET["document_id"] . ' LIMIT 1';
$result = mysqli_query($link, $query);
$rowcount = mysqli_num_rows($result);

if ($rowcount > 0) {
    // Есть запись в БД про этот документ ==============================================================================
    if ($_GET["state"] == 'off') {
        $query = 'DELETE FROM verifications WHERE expert_id = ' . intval($_COOKIE['id']) . ' AND document_id = ' . $_GET["document_id"];
        mysqli_query($link, $query) or die ('Unable to execute query. ' . mysqli_error($link));
    } else {
        $query = 'UPDATE verifications SET verification=' . $_GET['verification'] . ' WHERE expert_id = ' . intval($_COOKIE['id']) . ' AND document_id = ' . $_GET["document_id"];
        mysqli_query($link, $query) or die ('Unable to execute query. ' . mysqli_error($link));
    }
} else {
    // Нет записи в БД про этот документ ===============================================================================
    if ($_GET["state"] == 'on') {
        $query = "INSERT INTO verifications (document_id,
                                         document_part,
                                         attestation_id,
                                         expert_id,
                                         verification,
                                         points
                                         )
                                         VALUES
                                         ('{$_GET['document_id']}','{$_GET['part']}','{$_GET['attestation_id']}','{$_COOKIE['id']}','{$_GET['verification']}','{$_GET['points']}')";
        mysqli_query($link, $query) or die ('Unable to execute query. ' . mysqli_error($link));
    }
}

mysqli_free_result($result);
mysqli_close($link);
echo json_encode("[]");