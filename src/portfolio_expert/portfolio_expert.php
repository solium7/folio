<?php
include_once 'check_auth.php';
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Результаты образовательной деятельности педагогического работника</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/styles1.css" rel="stylesheet">
    <link href="css/form_data.css" rel="stylesheet">
<!--    <link href="css/slimbox2.css" rel="stylesheet">-->
<!--    <link href="css/raigle.css" rel="stylesheet">-->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link href="css/tooltipster.css" rel="stylesheet">
    <link href="css/ttipster_themes/tooltipster-light.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
</head>
<body>
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#"><img class="logo-cmo" width="40" height="40" src="images/logo_cmo.png"
                                                  alt=""/></a>
        </div>
        <div id="top-points" class="navbar-left">
        </div>
        <div class="navbar-right">
            <a href="http://astrcmo.ru/IMap/portfolio/index.php">
                <button style="margin-top:8px; margin-left: 10px" class="btn btn-danger">ВЫХОД
                    <i class="glyphicon glyphicon-log-out"></i>
                </button>
            </a>
        </div>
        <!--<div class="navbar-right">
            <p></p>
            <p>Сидоров Петр Иванович</p>
        </div>-->
    </div>
</div>
<div class="row">
    <div class="col-sm-11 col-md-11 col-lg-11 col-sm-offset-1 col-md-offset-1 col-lg-offset-1">
        <div class="row">
            <div id="sidebar-collapse" class="col-sm-3 col-md-3 col-lg-3 sidebar">
                <ul id="side-bar-list" class="nav menu">
                    <!--//====================================================================================================-->
                </ul>
            </div><!--/.sidebar-->
            <div class="col-sm-9 col-md-9 col-lg-9">
                <div class="row">
                    <div class="col-sm-11 col-md-11 col-lg-11">
                        <div class="breadcrumb2"></div>
                    </div><!--/.row-->

                    <div class="row">
                        <div class="col-sm-11 col-md-11 col-lg-11">
                            <div id="section-title" class="section-title"></div>
                        </div>
                    </div><!--/.row-->
                    <div class="row">
                        <div id="mithril-dox" class="col-sm-11 col-md-11 col-lg-11">
                        </div><!-- /.col-->
                    </div><!--/.row-->

                </div>    <!--/.main-->
            </div>
        </div>
    </div>
</div>

<!--Templates -->
<!--    ====================================== Баллы на верхней панели ==============================================-->
<script type="text/template" id="top-points-template">
    <div class="points">
        Баллы инвариантной части: <%= points.invar%>
        <br>
        Баллы вариативной части: <%= points.var%>
    </div>
</script>

<!--End of templates-->

<!-- ========================================================================================================= -->

<script src="bower_lib/jquery/dist/jquery.min.js"></script>
<script src="bower_lib/jquery-ui/jquery-ui.min.js"></script>
<script src="lib/jquery.tooltipster.min.js"></script>
<script src="lib/slimbox2.js"></script>
<script src="bower_lib/mithril/mithril.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<script src="lib/TimelineMax.min.js"></script>
<script src="lib/EasePack.min.js"></script>
<script src="lib/bootstrap.min.js"></script>
<script src="bower_lib/async/dist/async.min.js"></script>
<script src="js/portfolio_expert.js"></script>

</body>

</html>
