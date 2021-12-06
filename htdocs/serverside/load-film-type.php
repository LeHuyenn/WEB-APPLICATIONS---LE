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

writeLog($dumpFile, "in load-film-type.php");
$filmSerial = $_POST['filmorserial'];
$filmType = $_POST['typefilm'];
writeLog($dumpFile, "film serial: ".$filmSerial);
writeLog($dumpFile, "film type: ".$filmType);
takeDataFromDB($filmSerial, $filmType);
function takeDataFromDB($filmSerial, $filmType){
    global $dumpFile;
    global $db;
    writeLog($dumpFile,"In take data function");
    if($filmType == 0 && $filmSerial == 0){
        try{
            $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
            FROM film_info t1 
            INNER JOIN film_media t2 
            on t1.film_id=t2.film_id");
            writeLog($dumpFile,"take data done for all : ");
            $dataFetch = $queryFilmInfo->fetchAll();
            writeLog($dumpFile,"data length : ".count($dataFetch));
            $films=array();
            for($j=0;$j<count($dataFetch);$j+=1){
                array_push($films,$dataFetch[$j]);
            }
            //Test films
            for($j=0;$j<count($films);$j+=1){
                writeLog($dumpFile,"film id : ".$films[$j]['film_id'] ." films[".$j."] : ".$films[$j]['film_poster_link']);
            }
            $dataReturn[]=array(
                "film" => $films,
            );
            echo json_encode($dataReturn);
            writeLog($dumpFile, "return success");

        }catch(PDOException $e){
            writeLog($dumpFile,"error in take data : ".$e);
        }
    }else{
        $film_column_indb="";
        $a=1;
        $queryFilmInfo=null;
    
        try{
            switch($filmType){
                case 1: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_action = '$a' ");
                break;
                case 2: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_drama = '$a' ");
                break;
                case 3: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_horror = '$a' ");
                break;
                case 4: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_detective = '$a' ");
                break;
                case 5: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_fantasy = '$a' ");
                break;
                case 6: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_criminal = '$a' ");
                break;
                case 7: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_comedy = '$a' ");
                break;
                case 8: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_romantic = '$a' ");
                break;
                case 9: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_war = '$a' ");
                break;
                case 10: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_biography = '$a' ");
                break;
                case 11: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_historical = '$a' ");
                break;
                case 12: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_medical = '$a' ");
                break;
                case 13: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_musical = '$a' ");
                break;
                case 14: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_thriller = '$a' ");
                break;
                case 15: $queryFilmInfo = $db->query("SELECT t1.*, t2.film_poster_link, t2.film_url_trailer 
                FROM film_info t1 
                INNER JOIN film_media t2 
                on t1.film_id=t2.film_id
                WHERE t1.film_type = '$filmSerial' AND t1.film_familiar = '$a' ");
                break;
            }
        
            writeLog($dumpFile,"take data done : ");
            $dataFetch = $queryFilmInfo->fetchAll();
            writeLog($dumpFile,"data length : ".count($dataFetch));
            $films=array();
            for($j=0;$j<count($dataFetch);$j+=1){
                array_push($films,$dataFetch[$j]);
            }
            //Test films
            for($j=0;$j<count($films);$j+=1){
                writeLog($dumpFile,"film id : ".$films[$j]['film_id'] ." films[".$j."] : ".$films[$j]['film_poster_link']);
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
    

}
$db=null;
?>