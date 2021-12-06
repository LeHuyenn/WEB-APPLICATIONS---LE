<?php
header('Content-Type: application/json', true);
header("Access-Control-Allow-Origin: *");		// CORS
header("Access-Control-Allow-Headers: Access-Control-Allow-Origin, Accept");
include 'log.php';

writeLog($dumpFile, "in test.php");

$test = $_POST['a'];

if(isset($_POST['a'])){
    $test = $_POST['a'];
    writeLog($dumpFile, 'test : '.$test);
    $return_arr[] = array(
        "data" => 'lala',
        "id" => 1123,
    );
    echo json_encode($return_arr);
    writeLog($dumpFile, "return success");
}


?>