<?php
// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json,true);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

 if (is_array($data))
{
    // echo("true");
}
else{
    // echo("false");
}


$conn = mysqli_connect("localhost", "id11684892_news", "dinesh@2871995", "id11684892_news");
// Check connection
if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
}
else{
    // echo("Success connection");
}
//  echo("\n $num \n");
//  echo($data);
  $username = $data['username'];
  $password = $data['password'];
$sql = "SELECT username,password,name,role FROM User WHERE username = \"$username\"";
// echo("\n".$sql);
if($result = mysqli_query($conn, $sql)){
    $row = mysqli_fetch_array($result);
    // while ($row = mysqli_fetch_array($result)) {
    //   echo("\n Data :$row");
    //   foreach($data as $loginData) {

    $usernameFromDB = $row['username'];
    $passwordFromDB = $row['password'];
    $nameFromDB = $row['name'];
    $roleFromDB = $row['role'];
        // echo("\n $usernameFromDB $passwordFromDB");

                if ($usernameFromDB == $username && $passwordFromDB == $password){
                    // echo("success");
                     $myArrayFinal = array( 
    "status" =>  "success",
    "name" => $nameFromDB,
    "role" => $roleFromDB,
    "username" => $username,
    "password" => $password,
    "DBUname" => $usernameFromDB,
    "DBPwd" => $passwordFromDB);
    echo json_encode($myArrayFinal);
               }
               else{
                    // echo("Login Failed");
                    $myArrayFinal = array( 
    "status" =>  "failed");
    echo json_encode($myArrayFinal);
               }
    // }
}
else{
        echo "\n ERROR: Could not able to execute $sql. " . mysqli_error($link);
}



 mysqli_close($conn);
 

?>