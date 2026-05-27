<?php
    $executionStartTime = microtime(true);
    
    // Check if file exists to avoid fatal errors
    $path = "../../libs/json/countryBorders.geo.json";
    if (!file_exists($path)) {
        die(json_encode(["status" => ["code" => "404", "description" => "File not found"]]));
    }

    $json = file_get_contents($path);
    $data = json_decode($json, true);

    $countries = []; // Creating an empty array to hold the country data

    foreach($data['features'] as $feature) {
        $countries[] = [ // Adding country data to the countries array
            'name' => $feature['properties']['name'], //Adding the country name to the array
            'iso_a2' => $feature['properties']['iso_a2'], //Adding the country iso_a2 code to the array
            'geometry' => $feature['geometry'], //Adding the country geometry to the array
        ];
    }

    // Sort countries alphabetically by name
    usort($countries, function($a, $b) {
        return strcmp($a['name'], $b['name']);
    });

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) . " s";
    $output['data'] = $countries; // Adding the countries array to the output array

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
?>
