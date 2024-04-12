$(document).ready(function() {
    // Manejar el cambio en los checkboxes de estrellas
    $('input[type="checkbox"]').change(function() {
        filterHotels();
    });

    // Manejar el cambio en el campo de búsqueda del hotel
    $('#searchInput').keyup(function() {
        filterHotels();
    });

    // Función para filtrar los hoteles
    function filterHotels() {
        var searchKeyword = $('#searchInput').val().toLowerCase();
        var selectedStars = [];

        // Obtener las estrellas seleccionadas
        $('input[type="checkbox"]').each(function() {
            if ($(this).is(':checked')) {
                selectedStars.push(parseInt($(this).attr('id').replace('star', '')));
            }
        });

        // Filtrar hoteles según los criterios seleccionados
        $.getJSON('https://sergiovelasquez-d.github.io/grupoaviatur.github.io/src/data/data.json', function(data) {
            var filteredHotels = data.filter(function(hotel) {
                var nameMatches = hotel.name.toLowerCase().includes(searchKeyword);
                var starsMatches = selectedStars.length === 0 || selectedStars.includes(hotel.stars);
                return nameMatches && starsMatches;
            });

            // Mostrar los hoteles filtrados en el HTML
            var hotelResultsHtml = '';
            filteredHotels.forEach(function(hotel) {
                hotelResultsHtml += '<div class="bg-white p-4 shadow-lg border border-gray-300 flex items-center mb-4">';
                hotelResultsHtml += '<div class="mr-4">';
                hotelResultsHtml += '<img src="src/assets/images/hotels/' + hotel.image + '" alt="' + hotel.name + '" class="w-48 h-48 object-cover">';
                hotelResultsHtml += '</div>';
                hotelResultsHtml += '<div class="flex flex-grow">';
                hotelResultsHtml += '<div class="flex flex-col">';
                hotelResultsHtml += '<h3 class="mb-2 text-blue-600 text-2xl">' + hotel.name + '</h3>';
                hotelResultsHtml += '<div class="flex mb-2">';
                for (var s = 0; s < hotel.stars; s++) {
                    hotelResultsHtml += '<img src="src/assets/icons/filters/staryellow.svg" alt="Star Icon" class="h-4 w-4 mr-1">';
                }
                hotelResultsHtml += '</div>';
                hotelResultsHtml += '<p class="mb-2 text-gray-400">Precio por noche por habitación</p>';
                hotelResultsHtml += '<p class="mb-2 text-yellow-500 text-4xl">ARS ' + hotel.price + '</p>';
                hotelResultsHtml += '<button class="bg-blue-500 text-white py-2 px-4 rounded">Ver hotel</button>';
                hotelResultsHtml += '</div>';
                hotelResultsHtml += '</div>';
                hotelResultsHtml += '</div>';
            });

            // Insertar los resultados filtrados en el HTML
            $('#hotelResults').html(hotelResultsHtml);
        });
    }
});