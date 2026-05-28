<?php
    header("Content-Type: application/json; charset=UTF-8");

    $city = $_GET['city'] ?? null;
    $country = $_GET['country'] ?? null;

    $apiKey = '6d85eed68668307d947df0ebdfaa5833';
    $url = "https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid=$apiKey";

    $val = json_decode(file_get_contents($url), true);

    $temp = $val['main']['temp'] ?? null; // Pulls the temperature from the API response
    $description = $val['weather'][0]['description'] ?? null; // Pulls the weather description from the API response
    $clouds = $val['clouds']['all'] ?? null; // Pulls the cloudiness percentage from the API response
    $humidity = $val['main']['humidity'] ?? null; // Pulls the humidity from the API response
    $windSpeed = $val['wind']['speed'] ?? null; // Pulls the wind speed from the API response
    $icon = $val['weather'][0]['icon'] ?? null; // Pulls the weather icon code
    $sunrise = date('H:i:s', $val['sys']['sunrise'] ?? null); // Converts sunrise time to human-readable format
    $sunset = date('H:i:s', $val['sys']['sunset'] ?? null); // Converts sunset time to human-readable format
    $data = [
        'temperature' => $temp,
        'description' => $description,
        'clouds' => $clouds,
        'humidity' => $humidity,
        'windSpeed' => $windSpeed,
        'icon' => $icon,
        'sunrise' => $sunrise,
        'sunset' => $sunset
    ]; // Array to hold the weather data

    echo json_encode($data);
?>