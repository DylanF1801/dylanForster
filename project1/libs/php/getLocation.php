<?php

    $executionStartTime = microtime(true);

    $json = file_get_contents($path);
    $data = json_decode($json, true);

    if(!isset($_GET['lat']) || !isset($_GET['lng'])) { // Check if lat and lng parameters are set
        die(json_encode(["status" => ["code" => "400", "description" => "Missing parameters"]])); //If parameters aren't set, return a 400 error
    }

    $apiKey = "240ca991abaa4e50b57024ed747d71e7";
    $url = "https://api.opencagedata.com/geocode/v1/json?q=$lat+$lng&key=$apiKey";

    $response = file_get_contents($url);
    $data = json_decode($response, true);



    $lat = $_GET['lat']; // Get the latitude from the GET parameters
    $lng = $_GET['lng']; // Get the longitude from the GET parameters


    header('Content-Type: application/json');
    $response = file_get_contents($url);
    echo $response;
?>