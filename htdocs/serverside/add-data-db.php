<?php
include 'log.php';
include 'database-config.php';
writeLog($dumpFile, "In add data to database");

//Create PDO
$db = new PDO("mysql:host=$HostName; dbname=$DatabaseName", $HostUser, $HostPass);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
writeLog($dumpFile, "Create PDO successfully");

//film_info table
$filmName = "awdawd";
$yearRelease=2020;
$description = "Детектив полиции, не знающий страха и жалости, Со До Вон разыскивает загадочного серийного убийцу. В ходе жестокого расследования он теряет доверие окружающих и первую любовь, но открывает альтернативную реальность, где всё еще можно спасти. Закрученная детективная дорама с элементами научной фантастики.
Много лет назад Со До Вон ушел от своей близкой подруги Хан Со Гён, признавшейся ему в любви. Впоследствии она стала уважаемым прокурором, он – полицейским-трудоголиком, сидящим на таблетках и легко рискующим жизнью на работе. Так он пытается заглушить чувство вины из-за кровавой тайны, навсегда разлучившей его с возлюбленной. Новое загадочное расследование проливает свет на старые скелеты в шкафу. В городе орудует маньяк, который как-то связан с давней семейной трагедией Хан Со Гён и Со До Вона. На кону оказывается любовь, жизнь и рассудок неутомимого детектива, попавшего в опалу из-за своих методов. Отказываясь подчиняться начальству, Со До Вон продолжает поиски серийного убийцы, и запутанное расследование выводит его за пределы нашей реальности.
";
$filmType = 2; //1:cine film ; 2:seri film
$countyRelease = "Южная Корея";
$filmAction=0;
$filmDrama=1;
$filmHorror=0;
$filmDetective=1;
$filmFantasy=1;
$filmCriminal=0;
$filmComedy=0;
$filmRomantic=0;
$filmWar=0;
$filmBiography=0;
$filmHistorical=0;
$filmMedical=0;
$filmMusical=0;
$filmThriller=0;
$filmFamiliar=0;
//film_media table 
$filmPosterLink="http://localhost/img-seri-film/pic19.jfif";
$filmUrlTrailer="https://www.youtube.com/watch?v=zO4X-KQlSnI";

insertToDB();

function insertToDB(){
    global $dumpFile;
    global $db;
    //film_info
    global $filmName;
    global $yearRelease;
    global $description;
    global $filmType;
    global $countyRelease;
    global $filmAction;
    global $filmDrama;
    global $filmHorror;
    global $filmDetective;
    global $filmFantasy;
    global $filmCriminal;
    global $filmComedy;
    global $filmRomantic;
    global $filmWar;
    global $filmBiography;
    global $filmHistorical;
    global $filmMedical;
    global $filmMusical;
    global $filmThriller;
    global $filmFamiliar;
    //film_media
    global $filmPosterLink;
    global $filmUrlTrailer;

    try{
        $query = $db->prepare("INSERT INTO film_info (
            film_name,
            year_release,
            description,
            film_type,
            country_release,
            film_action,
            film_drama,
            film_horror,
            film_detective,
            film_fantasy,
            film_criminal,
            film_comedy,
            film_romantic,
            film_war,
            film_biography,
            film_historical,
            film_medical,
            film_musical,
            film_thriller,
            film_familiar
        )VALUES(
            :filmName,
            :yearRelease,
            :description,
            :filmType,
            :countryRelease,
            :filmAction,
            :filmDrama,
            :filmHorror,
            :filmDetective,
            :filmFantasy,
            :filmCriminal,
            :filmComedy,
            :filmRomantic,
            :filmWar,
            :filmBiography,
            :filmHistorical,
            :filmMedical,
            :filmMusical,
            :filmThriller,
            :filmFamiliar
        )");
        $query->bindParam(':filmName', $filmName);
        $query->bindParam(':yearRelease', $yearRelease);
        $query->bindParam(':description', $description);
        $query->bindParam(':filmType', $filmType);
        $query->bindParam(':countryRelease', $countyRelease);
        $query->bindParam(':filmAction', $filmAction);
        $query->bindParam(':filmDrama', $filmDrama);
        $query->bindParam(':filmHorror', $filmHorror);
        $query->bindParam(':filmDetective', $filmDetective);
        $query->bindParam(':filmFantasy', $filmFantasy);
        $query->bindParam(':filmCriminal', $filmCriminal);
        $query->bindParam(':filmComedy', $filmComedy);
        $query->bindParam(':filmRomantic', $filmRomantic);
        $query->bindParam(':filmWar', $filmWar);
        $query->bindParam(':filmBiography', $filmBiography);
        $query->bindParam(':filmHistorical', $filmHistorical);
        $query->bindParam(':filmMedical', $filmMedical);
        $query->bindParam(':filmMusical', $filmMusical);
        $query->bindParam(':filmThriller', $filmThriller);
        $query->bindParam(':filmFamiliar', $filmFamiliar);
        $query->bindParam(':filmName', $filmName);
        $query->execute();
        writeLog($dumpFile, "Add data to film_info complete ");
        
        $takeIdInFilmInfo = $db->query("SELECT MAX(film_id) FROM film_info");
        $queryFM=$db->prepare("INSERT INTO film_media(
            film_id,
            film_poster_link,
            film_url_trailer
        )VALUES(
            :filmID,
            :filmPosterLink,
            :filmUrlTrailer
        )");
        
        $idForAdding=(int)($takeIdInFilmInfo->fetchColumn());
        writeLog($dumpFile, "id prepare to add ".$idForAdding);
        $queryFM->bindParam(':filmID', $idForAdding);
        $queryFM->bindParam(':filmPosterLink', $filmPosterLink);
        $queryFM->bindParam(':filmUrlTrailer', $filmUrlTrailer);
        $queryFM->execute();
        writeLog($dumpFile, "Add data to film media complete");


    }catch(PDOException $e){
        writeLog($dumpFile, "error : ".$e);
    }

}

$db=null;


?>