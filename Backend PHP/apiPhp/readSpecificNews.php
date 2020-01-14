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

// Create connection
$conn = mysqli_connect("localhost", "u462839980_defence", "defence@123", "u462839980_defence");
// Check connection
if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
}


$dataId = $data['id'];
 if ($dataId != 0){
     // First Request : Send Count and first set of data 
     // SELECT * FROM news ORDER BY id DESC LIMIT 10 OFFSET 10
     $updateViewSql = "UPDATE news SET views = views + 1 where id = ".$dataId;
     $conn->query($updateViewSql);
     
    $sql = "SELECT id,header,link,detail,source,dateTime,imageLink,views FROM news WHERE id = ".$dataId;
    $result = $conn->query($sql);
    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
        $myArray[] = $row;
    }
    echo json_encode($myArray);
    // echo "<pre>$myArray</pre>";

    // echo ($myArray);
 }

$conn->close();
?>