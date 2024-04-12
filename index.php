<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./output.css" rel="stylesheet">
    <title>Aviatur</title>
</head>

<body class="bg-gray-200">
    <div class="bg-primary px-4 lg:px-16">
        <div class="flex p-4">
            <img src="assets/images/logo-aviatur.svg" alt="logo" class="h-10">
        </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto py-4 pl-4 pr-4">
        <h2 class="text-gray-500 text-lg mb-4">Filtros</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Filtros -->
            <div class="bg-white w-full md:w-2/6 max-h-72 p-4 shadow-lg border border-gray-300">

                <div class="flex items-center">
                    <img src="assets/icons/filters/search.svg" alt="Search Icon" class="h-4 w-4 mr-2 text-gray-500">
                    <span class="text-gray-800">Nombre del Hotel</span>
                </div>
                <hr class="my-2 border-gray-300">
                <div class="flex items-center">
                    <img src="assets\icons\amenities\cama.png" alt="Search Icon" class="h-4 w-4 mr-2 text-gray-500">
                    <input placeholder="Hotel" type="text" class="sc-dItHI fkTVNF">
                </div>
                <hr class="my-2 border-gray-300">
                <div class="flex items-center">
                    <img src="assets/icons/filters/star.svg" alt="Search Icon" class="h-4 w-4 mr-2 text-gray-500">
                    <span class="text-gray-800">Estrellas</span>
                </div>
                <hr class="my-2 border-gray-300">
                <div class="flex items-center">
                    <button id="checkAll" class="flex items-center justify-center w-10 h-10 bg-transparent">
                        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </button>

                    <label for="allStars" class="text-gray-500">Todas las estrellas</label>
                </div>
                <?php
                // Generar los checkboxes de estrellas
                for ($i = 1; $i <= 5; $i++) {
                    ?>
                    <div class="flex items-center ml-3">
                        <input type="checkbox" id="star<?php echo $i; ?>">
                        <?php for ($j = 0; $j < $i; $j++) { ?>
                            <div class="flex items-center ml-2">
                                <img src="assets/icons/filters/staryellow.svg" alt="Star Icon" class="h-4 w-4 mr-1">
                                <!-- Ajuste de la cantidad de estrellas -->
                            </div>
                        <?php } ?>
                    </div>
                <?php } ?>
            </div>

            <!-- Resultados de Hoteles -->
            <div id="hotelResults" class="md:ml-8">
                <div class="bg-white p-4 shadow-lg border border-gray-300 ">
                    <!-- Aquí va el resultado filtrado -->
                    <?php
                    // Cargar datos del archivo JSON
                    $data = json_decode(file_get_contents('data/data.json'), true);
                    // Definir $searchKeyword aquí
                    $searchKeyword = isset($_GET['search']) ? strtolower($_GET['search']) : '';
                    $minStars = 0;
                    // Filtrar hoteles según los criterios seleccionados
                    foreach ($data as $hotel) {
                        if ($hotel['stars'] >= $minStars && strpos(strtolower($hotel['name']), $searchKeyword) !== false) {
                            // Mostrar el hotel
                            echo '<div class="flex items-center mb-4">';
                            // Columna de imagen
                            echo '<div class="mr-4">';
                            echo '<img src="assets/images/hotels/' . $hotel['image'] . '" alt="' . $hotel['name'] . '" class="w-48 h-48 object-cover">';
                            echo '</div>';

                            // Contenedor para columna de información y columna de precio y botón
                echo '<div class="flex flex-grow">';


                            // Columna de información
                            echo '<div class="flex flex-col">';
                            // Nombre del hotel en azul y más grande
                            echo '<div class="mb-2">';
                            echo '<h3 class="mb-1 text-blue-600 text-2xl">' . $hotel['name'] . '</h3>';
                            // Mostrar estrellas como iconos de color dorado
                            echo '<div class="flex mb-1">';
                            for ($s = 0; $s < $hotel['stars']; $s++) {
                                echo '<img src="assets/icons/filters/staryellow.svg" alt="Star Icon" class="h-4 w-4 mr-1">';
                            }
                            echo '</div>';
                            // Iconos de comodidades
                            echo '<div class="flex mb-1">';
                            foreach ($hotel['amenities'] as $amenity) {
                                // Agregar la extensión .svg a la ruta de la imagen
                                $iconPath = 'assets/icons/amenities/' . $amenity . '.svg';
                                echo '<img src="' . $iconPath . '" alt="' . $amenity . '" class="h-4 w-4 mr-1">';
                            }
                            echo '</div>';
                            echo '</div>';
                            // Separador vertical punteado
                            echo '<div class="border-l border-dashed border-gray-950 h-full mr-4"></div>';
                            // Columna de precio y botón
                            echo '<div>';
                            echo '<p class="mb-1 text-gray-400">Precio por noche por habitación</p>';
                            echo '<p class="mb-1 text-yellow-500 text-4xl">ARS ' . number_format($hotel['price'], 2) . '</p>';
                            echo '<button class="bg-blue-800 text-white py-2 px-4 rounded">VER HOTEL</button>';
                            echo '</div>';
                            echo '</div>';
                            echo '</div>';
                            echo '</div>';
                        }
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <script src="js/filter.js"></script>

</body>

</html>