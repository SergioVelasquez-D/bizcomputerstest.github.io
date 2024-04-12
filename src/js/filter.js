$(document).ready(function() {
    // Manejar el cambio en los checkboxes de estrellas
    $('input[type="checkbox"]').change(function() {
        filterHotels();
    });

    // Manejar el cambio en el campo de búsqueda del hotel
    $('input[type="text"]').keyup(function() {
        filterHotels();
    });

    // Manejar el clic en el botón checkAll
    $('#checkAll').click(function() {
        var allChecked = $('input[type="checkbox"]:checked').length === $('input[type="checkbox"]').length;
        // Si todos están marcados, desmarcar todos
        if (allChecked) {
            $('input[type="checkbox"]').prop('checked', false);
        } else {
            // Si no todos están marcados, marcar todos
            $('input[type="checkbox"]').prop('checked', true);
        }
        filterHotels(); // Filtrar hoteles después de cambiar el estado de los checkboxes
    });

    // Función para filtrar los hoteles
    function filterHotels() {
        var searchKeyword = $('input[type="text"]').val().toLowerCase();
        var minStars = 0;
        var selectedStars = [];

        // Obtener las estrellas seleccionadas
        $('input[type="checkbox"]').each(function() {
            if ($(this).is(':checked')) {
                selectedStars.push(parseInt($(this).attr('id').replace('star', '')));
            }
        });

        // Si no hay estrellas seleccionadas, mostrar todos los hoteles
        if (selectedStars.length === 0) {
            $('#hotelResults').empty(); // Limpiar los resultados
            return; // Salir de la función de filtrado
        }

        // Obtener la mínima cantidad de estrellas seleccionadas
        if (selectedStars.length > 0) {
            minStars = Math.min.apply(null, selectedStars);
        }

        // Filtrar hoteles según los criterios seleccionados
    $('#hotelResults').empty();
    $.getJSON('data/data.json', function(data) {
        $.each(data, function(index, hotel) {
            if (selectedStars.includes(hotel.stars) && hotel.name.toLowerCase().includes(searchKeyword)) {
                // Crear el contenido HTML para mostrar el hotel
                var hotelInfo = '<div class="bg-white p-4 shadow-lg border border-gray-300 flex items-center mb-4">' +
                    '<div class="mr-4">' +
                    '<img src="assets/images/hotels/' + hotel.image + '" alt="' + hotel.name + '" class="w-48 h-48 object-cover">' +
                    '</div>' +
                    '<div class="flex flex-col">' +
                    '<h3 class="mb-1 text-blue-600 text-2xl">' + hotel.name + '</h3>' +
                    // Mostrar estrellas como iconos
                    '<div class="flex mb-2">';
                for (var s = 0; s < hotel.stars; s++) {
                    hotelInfo += '<img src="assets/icons/filters/staryellow.svg" alt="Star Icon" class="h-4 w-4 mr-1">';
                }
                hotelInfo += '</div>' +
                    // Mostrar iconos de comodidades
                    '<div class="flex mb-2">';
                $.each(hotel.amenities, function(i, amenity) {
                    hotelInfo += '<img src="assets/icons/amenities/' + amenity + '.svg" alt="' + amenity + '" class="h-4 w-4 mr-1">';
                });
                hotelInfo += '</div>' +
                '<p class="mb-2 text-gray-400">Precio por noche por habitación</p>' + 
                    '<p class="mb-1 text-yellow-500 text-4xl">ARS ' + hotel.price + '</p>' +
                    '<button class="bg-blue-500 text-white py-2 px-4 rounded">Ver hotel</button>' +
                    '</div>' +
                    '</div>';
                $('#hotelResults').append(hotelInfo);
            }
        });
    });
    }
});