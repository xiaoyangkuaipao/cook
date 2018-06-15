<?php
    header("Access-Control-Allow-Origin: *");
    $keyword = $_GET["keyword"];
    $url='http://way.jd.com/jisuapi/search?keyword='.$keyword.'&num=20'.'&appkey=b2663d4df877f597e67e6363b191909f';
    $result = file_get_contents($url);
    echo $result;
?>

