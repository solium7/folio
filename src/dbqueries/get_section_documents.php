<?php
header('Content-type: application/json; charset=utf-8');

include_once 'check_auth.php';

$query = "SELECT employee_directory FROM employees WHERE employee_id = '" . intval($_COOKIE['id']) . "' LIMIT 1";
$result = mysqli_query($link, $query);
$row = mysqli_fetch_array($result);
$directory = $row['employee_directory'];

$query = 'SELECT * FROM documents WHERE section_id=' . $_GET["section"] . ' AND employee_id=' . $userdata['employee_id'] . ' AND portfolio_id=' . $_GET['portfolio_id'];
$result = mysqli_query($link, $query);
$json = array();

while ($row = mysqli_fetch_array($result)) {
    $unit = array(
        'id' => $row['id'],
        'employee_id' => $row['employee_id'],
        'section_id' => $row['section_id'],
        'part' => $row['part'],
        'title' => $row['description'],
        'points' => $row['points'],
        'date_of_upload' => $row['date_of_upload'],
        'date_of_document' => $row['date_of_document'],
        'document_type' => $row['document_type'],
        'urls' => ($row['urls']),
        'files' => $row['files']
    );
    array_push($json, $unit);
}

mysqli_free_result($result);
mysqli_close($link);

echo json_encode($json);