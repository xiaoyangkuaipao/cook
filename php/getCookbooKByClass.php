<?php
    header("Access-Control-Allow-Origin: *");
    $classid = $_GET["classid"];
    $start = $_GET["start"];
    $num = $_GET["num"];
    $url='http://way.jd.com/jisuapi/byclass?classid='.$classid.'&start='.$start.'&num='.$num.'&appkey=b2663d4df877f597e67e6363b191909f';
    $result = file_get_contents($url);
    echo $result;
?>
