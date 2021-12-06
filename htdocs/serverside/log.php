<?php
$dumpFile = "dump.txt";
fopen($dumpFile,'a+');
unlink($dumpFile);
function writeLog($dumpFile , $text){
    $h=fopen($dumpFile,'a+');
    fwrite($h,"\n->".$text);
    fclose($h);
}
?>