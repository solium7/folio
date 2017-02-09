<?php
header('Content-type: application/json; charset=utf-8');

include_once 'check_auth.php';

$query = 'SELECT SUM(points) as value_sum FROM verifications WHERE document_part=0 AND attestation_id=1 AND verification=1 AND expert_id=' . $userdata['employee_id'];
$result = mysqli_query($link, $query) or die ('Unable to execute query. ' . mysqli_error($link));
$row = mysqli_fetch_assoc($result);
$invar = $row['value_sum'];
if ($invar == null) $invar = 0;

$query = 'SELECT SUM(points) as value_sum FROM verifications WHERE document_part=1 AND attestation_id=1 AND verification=1 AND expert_id=' . $userdata['employee_id'];

$result = mysqli_query($link, $query) or die ('Unable to execute query. ' . mysqli_error($link));
$row = mysqli_fetch_assoc($result);
$var = $row['value_sum'];
if ($var == null) $var = 0;

$json = array('invar' => $invar, 'var' => $var);

mysqli_free_result($result);
mysqli_close($link);

echo json_encode($json);