<?php
header('Content-type: text/plain; charset=utf-8');

include_once 'check_auth.php';

$query = "SELECT files FROM documents WHERE (id = " . $_GET['document_id'] . " AND employee_id = " . intval($_COOKIE['id']) . ") LIMIT 1";
$result = mysqli_query($link, $query) or die ('Unable to execute query. ' . mysqli_error($link));
$row = mysqli_fetch_array($result);
$docFiles = json_decode($row['files'], true);
foreach ($docFiles as $itemFile) {
    unlink($itemFile['file']);
    if (substr_count($itemFile['tbn'], 'file_types_icons') < 1) {
        unlink($itemFile['tbn']);
    };
}

$query = "DELETE FROM documents WHERE id = " . $_GET['document_id'] . " AND employee_id = " . intval($_COOKIE['id']);
mysqli_query($link, $query) or die ('Unable to execute query. ' . mysqli_error($link));

mysqli_free_result($result);
mysqli_close($link);
