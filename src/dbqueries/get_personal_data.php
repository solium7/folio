<?php
header('Content-type: application/json; charset=utf-8');

include_once 'check_auth.php';

$query = 'SELECT * FROM employees WHERE employee_id=' . $userdata['employee_id'];
$result = mysqli_query($link, $query);
$json = array();

while ($row = mysqli_fetch_array($result)) {
    $unit = array(
        'employee_id' => $row['employee_id'],
        'employee_surname' => $row['employee_surname'],
        'employee_firstname' => $row['employee_firstname'],
        'employee_lastname' => $row['employee_lastname'],
        'employee_occupation1' => $row['employee_occupation1'],
        'employee_organization1' => $row['employee_organization1'],
        'employee_occupation_experience1' => $row['employee_occupation_experience1'],
        'employee_organization_experience1' => $row['employee_organization_experience1'],
        'employee_occupation2' => $row['employee_occupation2'],
        'employee_organization2' => $row['employee_organization2'],
        'employee_occupation_experience2' => $row['employee_occupation_experience2'],
        'employee_organization_experience2' => $row['employee_organization_experience2'],
        'employee_category' => $row['employee_category'],
        'employee_category_date' => $row['employee_category_date'],
        'employee_education' => $row['employee_education'],
        'employee_experience' => $row['employee_experience'],
        'employee_awards' => $row['employee_awards'],
        'employee_phones' => $row['employee_phones'],
        'employee_address' => $row['employee_address'],
        'employee_email' => $row['employee_email']
    );
    array_push($json, $unit);
}

mysqli_free_result($result);
mysqli_close($link);

echo json_encode($json);