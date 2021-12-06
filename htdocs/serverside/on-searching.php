<?php
header('Content-Type: application/json', true);
header("Access-Control-Allow-Origin: *");		// CORS
header("Access-Control-Allow-Headers: Access-Control-Allow-Origin, Accept");
include 'log.php';
include 'database-config.php';

//Create PDO
$db = new PDO("mysql:host=$HostName; dbname=$DatabaseName", $HostUser, $HostPass);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
writeLog($dumpFile, "Create PDO successfully");

writeLog($dumpFile, "in onload-page.php");
$onsearching = $_POST['datasearching'];
writeLog($dumpFile, "data for searching : ".$onsearching);
takeDataFromDB($onsearching);
function takeDataFromDB($i){
    global $dumpFile;
    global $db;
    writeLog($dumpFile,"In take data function");
    try{
        $queryFilmInfo = $db->query("SELECT film_id, UPPER(film_name)
        FROM film_info ");
        //WHERE UPPER(t1.film_name) LIKE '".$i."%' ");
        writeLog($dumpFile,"take data done");
        $dataFetch = $queryFilmInfo->fetchAll();
        $films=array();
        for($j=0;$j<count($dataFetch);$j+=1){
            if(count($films)<=10){
                writeLog($dumpFile,"film found : ".$dataFetch[$j]['UPPER(film_name)']);
                if(strpos($dataFetch[$j]['UPPER(film_name)'], $i)!==false){
                    $idFilmFound = $dataFetch[$j]['film_id'];
                    try{
                        $queryTakeImg = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                        FROM film_info t1 
                        INNER JOIN film_media t2 
                        on t1.film_id=t2.film_id
                        WHERE t1.film_id = '$idFilmFound'");
                        $dataFetchForReturn = $queryTakeImg->fetchAll();
                        array_push($films,$dataFetchForReturn[0]);

                    }catch(PDOException $errorWhenTakeImg){
                        writeLog($dumpFile,"error in take img : ".$errorWhenTakeImg);
                    }
                } 
            }
            
        }
        //Test films
        for($j=0;$j<count($films);$j+=1){
            writeLog($dumpFile,"film id : ".$films[$j]['film_id'] ." films[".$j."] : ".$films[$j]['film_name']);
        }
        $dataReturn[]=array(
            "film" => $films,
        );
        echo json_encode($dataReturn);
        writeLog($dumpFile, "return success");

    }catch(PDOException $e){
        writeLog($dumpFile,"error in take data : ".$e);
    }

}
$db=null;

?>