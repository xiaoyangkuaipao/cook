<?php
    header("Access-Control-Allow-Origin: *");
    $id = $_GET["id"];
    $url='http://way.jd.com/jisuapi/detail?id='.$id.'&appkey=b2663d4df877f597e67e6363b191909f';
    $result = file_get_contents($url);
    echo $result;
?>
