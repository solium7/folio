<?php
//under construction
header('Content-type: text/plain; charset=utf-8');

include_once 'check_auth.php';

function make_thumb($src, $dest, $desired_width)
{

    /* read the source image */
    $source_image = imagecreatefrompng($src);
    $width = imagesx($source_image);
    $height = imagesy($source_image);

    /* find the "desired height" of this thumbnail, relative to the desired width  */
    $desired_height = floor($height * ($desired_width / $width));

    /* create a new, "virtual" image */
    $virtual_image = imagecreatetruecolor($desired_width, $desired_height);

    /* copy source image at a resized size */
    imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);

    /* create the physical thumbnail image to its destination */
    imagepng($virtual_image, $dest);
}

function addNewDocument()
{
    $forms = array(
        "no_form", "form_636", "form_649", "form_650", "form_663", "form_664", "form_665", "form_731", "form_732",
        "form_733", "form_734", "form_735", "form_736", "form_737", "form_738", "form_739", "form_740", "form_741",
        "form_742", "form_743", "form_744", "form_745");

    $tbns = array(
        "doc" => "images/file_types_icons/doc.png",
        "docx" => "images/file_types_icons/docx.png",
        "xls" => "images/file_types_icons/xls.png",
        "xlsx" => "images/file_types_icons/xlsx.png",
        "ppt" => "images/file_types_icons/ppt.png",
        "pptx" => "images/file_types_icons/pptx.png",
        "pdf" => "images/file_types_icons/pdf.png",
        "odt" => "images/file_types_icons/odt.png",     // textprocessor
        "ods" => "images/file_types_icons/ods.png",     // spreadsheets
        "odp" => "images/file_types_icons/odp.png",     // presentations
    );

    $query = "SELECT employee_directory FROM employees WHERE employee_id = '" . intval($_COOKIE['id']) . "' LIMIT 1";
    $result = mysqli_query($link, $query);
    $row = mysqli_fetch_array($result);

    $directory = $row['employee_directory'];

    $portfolio_id = $_POST['portfolio_id'];
    $occupation_id = $_POST['occupation_id'];
    $section_id = $_POST['section_id'];
    $part = $_POST['part'];
    $document_type = $_POST['document_type'];

    $date = explode('/', $_POST['document_date']);
    $time = mktime(0, 0, 0, $date[1], $date[0], $date[2]);
    $mysqldate = date('Y-m-d H:i:s', $time);

    $urls = json_encode(json_decode($_POST['urls']));

    $age_threshold = $_POST['age_threshold'];

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $documentsPath = 'documents/' . $directory . "/" . $portfolio_id . "/" . $_POST['section_id'];
    // ==================================================== следующую строку поменять местами со нижней строкой в случае чего. В любом случае порефакторить.
    $documentsPath = $documentsPath . "/";
    if (!file_exists($documentsPath)) {
        mkdir($documentsPath, 0777, true);
    }
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    $query = "SELECT points FROM " . $forms[$occupation_id] . " WHERE id = '" . $_POST['section_id'] . "' LIMIT 1";
    $result = mysqli_query($link, $query);
    $row = mysqli_fetch_array($result);
    $points = $row['points'];
    if ($points == null) {
        $points = 101;}
    $allFiles = array();

    $arrImgFiles = $_POST["imageFiles"];
    $arrTbnImageFiles = $_POST["tbnImageFiles"];
    $arrLen = count($arrImgFiles);
    for ($i = 0; $i < $arrLen; $i++) {
        $dataURL = $arrImgFiles[$i];
        $dataURL = str_replace('data:image/jpeg;base64,', '', $dataURL);
        $dataURL = str_replace(' ', '+', $dataURL);
        $fileData = base64_decode($dataURL);
        $fileExtension = 'jpg';
        $uniqFileName = uniqid();
        $newFileName = $documentsPath . $uniqFileName . "." . $fileExtension;
        file_put_contents($newFileName, $fileData);

        $dataURL = $arrTbnImageFiles[$i];
        $dataURL = str_replace('data:image/png;base64,', '', $dataURL);
        $dataURL = str_replace(' ', '+', $dataURL);
        $fileData = base64_decode($dataURL);
        $fileExtension = 'png';
        $newTbnFileName = $documentsPath . $uniqFileName . "_s." . $fileExtension;
        file_put_contents($newTbnFileName, $fileData);

        $allFiles[] = array('file' => $newFileName, 'tbn' => $newTbnFileName);
    }
    foreach ($_FILES['otherFiles']['tmp_name'] as $index => $tmpName) {
        $fileName = $_FILES['otherFiles']['name'][$index];
        $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
        $newFileName = $documentsPath . uniqid() . "." . $fileExtension;
        move_uploaded_file($_FILES['otherFiles']['tmp_name'][$index], $newFileName);

        if (array_key_exists($fileExtension, $tbns)) {
            $tbnFileName = $tbns[$fileExtension];
        } else {
            $tbnFileName = "images/file_types_icons/other.png";
        };
        $allFiles[] = array('file' => $newFileName, 'tbn' => $tbnFileName);
    }

    $allFiles = json_encode($allFiles);

    $query = "INSERT INTO documents (employee_id,
                                         portfolio_id,                                         
                                         occupation_id,
                                         section_id,										 
                                         part,
                                         points,
                                         document_type,
                                         date_of_document,
                                         files,
										 urls,
                                         age_threshold
                                         )
                                         VALUES
                                         ('" . intval($_COOKIE['id']) . "','" .
        $portfolio_id . "','" .
        $occupation_id . "','" .
        $section_id . "','" .
        $part . "','" .
        $points . "','" .
        $document_type . "','" .
        $mysqldate . "','" .
//        $document_date . "','" .
        $allFiles . "','" .
        $urls . "','" .
        $age_threshold . "')";
    mysqli_query($link, $query) or die('Unable to execute query. ' . mysqli_error($link));

}

$error = $_FILES['imgFile']['error'];

switch ($error) {
    case 0:
        $error = 'нет';
        addNewDocument();
        break;
    case 1:
    case 2:
        $error = 'cлишком большой файл';
        break;
    case 3:
        $error = 'файл загружен частично';
        break;
    case 4:
        $error = 'файл не был загружен';
}
?>

Ошибки:
<?= $error; ?>
<br/>
