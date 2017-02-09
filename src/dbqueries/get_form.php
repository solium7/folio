<?php
header('Content-type: application/json; charset=utf-8');

include_once 'check_auth.php';

$query = 'SELECT * FROM form_636';
$result = mysqli_query($link, $query);
$json = array();
while($row = mysqli_fetch_array ($result))
{
    $unit = array(
        'id'  => $row['id'],
        'title'  => $row['title'],
        'parent_id'  => $row['parent_id'],
        'points'  => $row['points'],
        'type'  => $row['type'],
        'is_final'  => $row['is_final'],
        'part'  => $row['part'],
        'age_threshold'  => $row['age_threshold'],
        'confirmation'  => $row['confirmation']
    );
    array_push($json, $unit);
}

mysqli_free_result($result);
mysqli_close($link);

echo json_encode($json);
