<?php
// Cargar datos del archivo JSON
$data = json_decode(file_get_contents('src/data/data.json'), true);
// Definir $searchKeyword y $selectedStars
$searchKeyword = isset($_GET['search']) ? strtolower($_GET['search']) : '';
$selectedStars = isset($_GET['stars']) ? $_GET['stars'] : [];

// Filtrar hoteles según los criterios seleccionados
$filteredHotels = array_filter($data, function($hotel) use ($searchKeyword, $selectedStars) {
    $nameMatches = strpos(strtolower($hotel['name']), $searchKeyword) !== false;
    $starsMatches = empty($selectedStars) || in_array($hotel['stars'], $selectedStars);
    return $nameMatches && $starsMatches;
});

// Devolver los hoteles filtrados como JSON
header('Content-Type: application/json');
echo json_encode($filteredHotels);
?>