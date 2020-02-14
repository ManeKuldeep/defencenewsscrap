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
$conn = mysqli_connect("localhost", "id11684892_news", "dinesh@2871995", "id11684892_news");
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
// $count =  array( "count" =>  $count);
$dataToSend = $data['page'];
$dataToSend = $dataToSend - 1;
 if ($dataToSend == 0){
     // First Request : Send Count and first set of data 
     // SELECT * FROM news ORDER BY id DESC LIMIT 10 OFFSET 10
    $sql = "SELECT id,header,link,shortDetail,source,dateTime,imageLink,views FROM news ORDER BY id DESC LIMIT 10";
    $result = $conn->query($sql);
    // $myArrayCount[] = $count;
    
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $myArrayData[] = $row;
    }
    $myArrayFinal = array( 
    "count" =>  $count,
    "data" => $myArrayData);
    echo json_encode($myArrayFinal);
    
 }
 else{
 // Other Requests : send count and required set of data
     // SELECT * FROM news ORDER BY id DESC LIMIT 10 OFFSET 10
    $sql = "SELECT id,header,link,shortDetail,source,dateTime,imageLink,views FROM news ORDER BY id DESC LIMIT 10 OFFSET ".($dataToSend * 10);
    // echo($sql);
    $result = $conn->query($sql);
    $myJSON = json_encode($result);
    // $myArray[] = $count;
    // while($row = $result->fetch_array(MYSQLI_ASSOC)) {
    //     $myArray[] = $row;
    // }
    // echo json_encode($myArray);
    
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $myArrayData[] = $row;
    }
    $myArrayFinal = array( 
    "count" =>  $count,
    "data" => $myArrayData);
    echo json_encode($myArrayFinal);
    
    // echo json_encode(($result->fetch_assoc()));
 }
//  $resultInJson = json_encode($result);
//  $finalData = array(
//      "count"=>$count,
//      "data"=>$result
//      );
// $myJSON = json_encode($resultInJson);

// echo $myJSON;
$conn->close();
?>