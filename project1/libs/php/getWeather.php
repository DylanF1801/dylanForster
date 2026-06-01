<?php
    header("Content-Type: application/json; charset=UTF-8");

    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    $lat = $_GET['coord']['lat'] ?? $_POST['coord']['lat'] ?? null;
    $lng = $_GET['coord']['lon'] ?? $_POST['coord']['lon'] ?? null;

    if ($lat === null || $lng === null) {
        echo json_encode([
            'status' => [
                'code' => '400',
                'name' => 'error',
                'description' => 'Missing latitude or longitude'
            ],
            'data' => null
        ]);
        exit;
    }

    $apiKey = '6d85eed68668307d947df0ebdfaa5833';
    $url = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lng}&appid={$apiKey}&units=metric";

    $weatherJson = @file_get_contents($url);
    $weatherData = json_decode($weatherJson, true);

    $data = [
        'country' => $weatherData['sys']['country'] ?? null,
        'temperature' => $weatherData['main']['temp'] ?? null,
        'description' => $weatherData['weather'][0]['description'] ?? null,
        'clouds' => $weatherData['clouds']['all'] ?? null,
        'humidity' => $weatherData['main']['humidity'] ?? null,
        'windSpeed' => $weatherData['wind']['speed'] ?? null,
        'icon' => $weatherData['weather'][0]['icon'] ?? null,
        'sunrise' => isset($weatherData['sys']['sunrise']) ? date('H:i:s', $weatherData['sys']['sunrise']) : null,
        'sunset' => isset($weatherData['sys']['sunset']) ? date('H:i:s', $weatherData['sys']['sunset']) : null,
        'lat' => $lat,
        'lng' => $lng
    ];

    echo json_encode([
        'status' => [
            'code' => '200',
            'name' => 'ok',
            'description' => 'Weather data retrieved'
        ],
        'data' => $data
    ]);
?>