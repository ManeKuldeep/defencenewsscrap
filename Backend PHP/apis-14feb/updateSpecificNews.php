<?php
// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$result = json_decode($json,true);
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

 if (is_array($result))
{
    //  echo("true");
}
else{
    //  echo("false");
}

// Create connection
$conn = mysqli_connect("localhost", "id11684892_news", "dinesh@2871995", "id11684892_news");
// Check connection
if (!$conn) {
    echo("Connection failed");
      die("Connection failed: " . mysqli_connect_error());
}
//  echo($result);
// echo($result['id']);
$dataId = $result['id'];
 if ($dataId != 0){
    $header = $result['header'];
    // $link = $result['articleSourceLink'];
    $detail = $result['detail'];
    $shortDetail = substr($detail,0 , 200)."...";
    // $source = $result['articleSource'];
//    $time = $result['articleDate'];
    $imageLink = $result['imageLink'];
    
    $date = date_create();
    $timestamp = date_timestamp_get($date);
    $newImageName = "images/img".$timestamp.".jpg";
    // echo("$imageLink");
    // echo($newImageName);
    file_put_contents($newImageName, file_get_contents($imageLink)); 
    $newImageName = "gateway/".$newImageName;
     // First Request : Send Count and first set of data 
     // SELECT * FROM news ORDER BY id DESC LIMIT 10 OFFSET 10

     $detail = str_replace('"', '\"', $detail);
     $updateSql = "UPDATE news SET header = \"".$header."\",detail=\"".$detail."\",shortDetail=\"".$shortDetail."\",imageLink=\"".$newImageName."\" where id = ".$dataId;
     echo($updateSql);
     if ($conn->query($updateSql)){
         $statusArray = array( 
    "status" => " Successfully Executed true",
    "update QUery" => $updateSql);
    echo json_encode($statusArray);
     }
     else{
         $statusArray = array( 
    "status" => "Invalid Data false");
    echo json_encode($statusArray);
     }
 }

$conn->close();
?>