<?php
include_once 'check_auth.php';
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Результаты образовательной деятельности педагогического работника</title>

    <link href="css/bootstrap.min.css" type="text/css" rel="stylesheet">
    <link href="css/normalize.css" type="text/css" rel="stylesheet">
    <link href="css/vertical_menu.css" type="text/css" rel="stylesheet">
    <link href="css/viewer.min.css" type="text/css" rel="stylesheet">

    <link href="css/form_data.css" type="text/css" rel="stylesheet">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link href="css/tooltipster.css" type="text/css" rel="stylesheet">
    <link href="css/ttipster_themes/tooltipster-light.css" type="text/css" rel="stylesheet">
    <link href="css/main.css" type="text/css" rel="stylesheet">
    <link href="css/buttons.css" type="text/css" rel="stylesheet">

</head>
<body>
<div id="root">
</div>
<canvas class="hidden-canvas" id="canvas"></canvas>

<?php
echo '<script>';
echo 'var portfolio_id = ' . $_COOKIE['portfolio_id'] . ';';
echo 'var occupation_id = ' . $_COOKIE['occupation_id'] . ';';
echo '</script>';
?>

<!--<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>-->
<!--<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>-->
<!--<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>-->
<!--<script src="lib/tooltipster.bundle.min.js"></script>-->
<script src="https://cdn.rawgit.com/seikichi/tiff.js/master/tiff.min.js"></script>
<!--<script src="lib/tiff.min.js"></script>-->
<script src="portfolio_owner.js"></script>
</body>

</html>