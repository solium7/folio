<?php
header('Content-type: application/json; charset=utf-8');

include_once 'check_auth.php';

$query = 'SELECT * FROM verifications WHERE expert_id=' . intval($_COOKIE['id']) . ' AND attestation_id=' . $_GET["attestation_id"];
$result = mysqli_query($link, $query);
$json = array();

while ($row = mysqli_fetch_array($result)) {
    $unit = array(
        'id' => $row['id'],
        'document_id' => $row['document_id'],
        'document_part' => $row['document_part'],
        'attestation_id' => $row['attestation_id'],
        'expert_id' => $row['expert_id'],
        'verification' => $row['verification'],
        'points' => $row['points'],
        'verification_date' => $row['verification_date']
    );
    array_push($json, $unit);
}

mysqli_free_result($result);
mysqli_close($link);

echo json_encode($json);