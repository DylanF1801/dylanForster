<?php

    header('Content-Type: application/json');

    $executionStartTime = microtime(true);

    $lat = $_GET['lat'] ?? null;
    $lng = $_GET['lng'] ?? null; // Get lat and lng parameters from the URL, if they exist

    $json = file_get_contents($path);
    $data = json_decode($json, true);

    $response = file_get_contents($url);
    $data = json_decode($response, true);

    $apiKey = "240ca991abaa4e50b57024ed747d71e7";
    $url = "https://api.opencagedata.com/geocode/v1/json?q=$lat+$lng&key=$apiKey";


    $components = $data['results'][0]['components']; // Get the components from the first result
    $geometry = $data['results'][0]['geometry']; // Get the geometry from the first result
    $bounds = $data['results'][0]['bounds']; // Get the bounds from the first result

    echo json_encode([
        "status" => ["code" => "200", "description" => "OK"],
        "data" => [
            "iso_a2" => $components['ISO_3166-1_alpha-2'] ?? null,
            "country" => $components['country'] ?? null,
            "borders" => [
                [$bounds['southwest']['lat'], $bounds['southwest']['lng']],
                [$bounds['northeast']['lat'], $bounds['northeast']['lng']]
            ]
        ]
    ]);

    $response = file_get_contents($url);
    echo $response;
?>