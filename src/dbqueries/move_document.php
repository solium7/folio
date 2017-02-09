<?php
header('Content-type: text/plain; charset=utf-8');
include_once 'check_auth.php';

$forms = array(
    "no_form", "form_636", "form_649", "form_650", "form_663", "form_664", "form_665", "form_731", "form_732",
    "form_733", "form_734", "form_735", "form_736", "form_737", "form_738", "form_739", "form_740", "form_741",
    "form_742", "form_743", "form_744", "form_745");

$dataObj = json_decode($_POST['dataObj'], true);

$employee_id = intval($_COOKIE['id']);
$document_id = $dataObj['document_id'];
$target_section_id = $dataObj['target_section_id'];
$occupation_id = $dataObj['occupation_id'];

$query = "SELECT points,age_threshold,part FROM " . $forms[$occupation_id] . " WHERE id=" . $target_section_id . " LIMIT 1";
$result = mysqli_query($link, $query) or die('Unable to execute query . ' . mysqli_error($link));
$row = mysqli_fetch_array($result);
$points = $row['points'];
$age_threshold = $row['age_threshold'];
$part = $row['part'];

$query = "UPDATE documents SET section_id='" . $target_section_id . "',
                               part='" . $part . "',
                               points='" . $points . "',
                               age_threshold='" . $age_threshold . "'
                               WHERE id=" . $document_id . " AND employee_id=" . intval($_COOKIE['id']);
mysqli_query($link, $query) or die('Unable to execute query . ' . mysqli_error($link));