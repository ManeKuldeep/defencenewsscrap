<?php
// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json,true);
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

 if (is_array($data))
{
    // echo("true");
}
else{
    // echo("false");
}

$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = mysqli_connect("localhost", "u462839980_defence", "defence@123", "u462839980_defence");
// Check connection
if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
}

$sqlCount = "SELECT COUNT(*)FROM news";
$result = $conn->query($sqlCount);

$count = 0;
while ($row = $result->fetch_assoc()) {
    // echo ($row['COUNT(*)']);
    $count = $row['COUNT(*)'];
}

$sql = "SELECT id,imageLink FROM news";
$result = $conn->query($sql);
$urlTo000 = "http://defencenewsscrap.000webhostapp.com/";
while($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $urlToImage = $urlTo000."{$row['imageLink']}";
    $string = str_replace('gateway/', '', "{$row['imageLink']}");
    file_put_contents($string, file_get_contents($urlToImage)); 
    echo $urlToImage;
    echo " {$row['id']} success \n";
}
// $count =  array( "count" =>  $count);

//  $resultInJson = json_encode($result);
//  $finalData = array(
//      "count"=>$count,
//      "data"=>$result
//      );
// $myJSON = json_encode($resultInJson);

// echo $myJSON;
$conn->close();
?>