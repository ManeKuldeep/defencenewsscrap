<?php
// Takes raw data from the request
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json,true);
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

//echo '<p>This is a PHP script</p>';

 //$myfile = fopen("newfile1.txt", "w") or die("Unable to open file!");
// echo($myfile);
 //fwrite($myfile, $data);
 //fclose($myfile);
 //echo($data);
 if (is_array($data))
{
    echo("true");
}
else{
    echo("false");
}
//  foreach($data as $result) {
//     echo $result['articleHeader'], '<br>';
// }

echo("Done");

// $link = mysqli_connect("localhost", "id11684892_news", "dinesh@2871995", "id11684892_news");
$conn = mysqli_connect("localhost", "u462839980_defence", "defence@123", "u462839980_defence");
// Check connection
if (!$conn) {
      die("Connection failed: " . mysqli_connect_error());
}
 $num = count($data);
//  echo("\n $num \n");
 
 $scrapDataSource = $data[0]['articleScrapSource'];
 echo($scrapDataSource);
 //Fetch last 10 data from table
$fetchsql = "SELECT header, link FROM news WHERE (ScrapSource = \"".$scrapDataSource."\") ORDER BY id DESC LIMIT 100";
// "SELECT header, link FROM news WHERE ScrapSource = \"DefenceNews.in\" ORDER BY id DESC LIMIT 26";
echo("\n".$fetchsql);
$resultData = $conn->query($fetchsql);
// echo("\n".$resultData)
if ($resultData->num_rows > 0) {
    // output data of each row
    while($row = $resultData->fetch_assoc()) {
         //echo "header: " . $row["header"]. " - Link: " . $row["link"]. "\n";
    }
} 
 //Reverse Array
 $data = array_reverse($data);
// Attempt insert query execution
foreach($data as $result) {
    //echo $result['articleHeader'], '<br>';
    
    $header = $result['articleHeader'];
    $link = $result['articleSourceLink'];
    $detail = $result['articleDescription'];
    $shortDetail = substr($detail,0 , 200)."...";
    $source = $result['articleSource'];
    $time = $result['articleDate'];
    $scrapSource = $result['articleScrapSource'];
    $imageLink = $result['articleImageLink'];
    //echo($resultData);
    //Check data with already added data
    if ($resultData->num_rows > 0) {
         //echo("Loop Entered \n");
    // output data of each row
         foreach($resultData as $rowData) {
            //echo("Loop insert \n".$header."        ".$rowData["header"]);
                // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
                if ($header == $rowData["header"] || $link == $rowData["link"]){
                  echo("\nData is already \n");
                  echo("Loop insert \n".$header."        ".$rowData["header"]);
                  continue 2;
               }
        }
        // while($rowData = $resultData->fetch_assoc()) {
        //     echo("Loop insert \n".$header."        ".$rowData["header"]);
        //   // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
        //     if ($header == $rowData["header"] || $link == $rowData["link"]){
        //         echo("Data is already \n");
        //         continue;
        //     }
        // }
    } 
    
    
    // Dummy data
    // $header = str_replace("'", "\'", $header);
    // $header = "Header";
    // $link = "Link data";
    //  $detail = "Extra data";
    //  $source = "source data";
    //  $time = "time";
    //  $scrapSource = "scrap source";
    // $shortDetail = ""
    // save image to memory and create it link
    $date = date_create();
    $timestamp = date_timestamp_get($date);
    $newImageName = "images/img".$timestamp.".jpg";
    echo($newImageName);
    file_put_contents($newImageName, file_get_contents($imageLink)); 
    $newImageName = "gateway/".$newImageName;
    $sql = "INSERT INTO news(header, link, detail, source, time, ScrapSource, imageLink, shortDetail, views,category,dateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    $viewsValue = 0;
    $categoryDefault = "";
    $dateTime = date('d M Y', $time);
    $stmt->bind_param("sssssssssss",$header, $link, $detail, $source, $time, $scrapSource,$newImageName,$shortDetail,$viewsValue,$categoryDefault,$dateTime);
        if($stmt->execute() === TRUE){
         //echo "Records inserted successfully.";
         echo("Success:   ".$link."\n");
    } else{
          echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
          echo("Failed:   ".$link."\n");
         // break;
    }
    $stmt->close();
}
 mysqli_close($conn);
 

?>