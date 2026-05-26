<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $json = file_get_contents("../libs/json/countryBorders.geo.json");
    $data = json_decode($json, true);

    $decode = json_decode($result, true);

    $countries = []; // Creating an empty array to hold the country data
    foreach($data['features'] as $feature) { // Looping through each feature in the featureCollection
        $props = $feature['properties']; // Accessing the properties from the featureCollection

        $countries[] = [ // Adding country data to the countries array
            'name' => $props['name'], //Adding the country name to the array
            'iso_a2' => $props['iso_a2'] //Adding the country iso_a2 code to the array
        ];
    }

    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = $countries; // Adding the countries array to the output array

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
?>