window.onload = function () {

    // Elements HTML
    var filmSearchElement = document.getElementById("filmSearch");
    var suggestionsElement = document.getElementById("suggestions");
    var filmButtonElement = document.getElementById("filmButton");
    var moviesElement = document.getElementById("movies");

    function cercarPelicules(paraulaDonada) {
        var apiKey = "660af5aa7f2f70e2fda4b4cdd1ea3a62";
        var query = paraulaDonada;

        var xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            var data = JSON.parse(this.responseText);

            suggestionsElement.innerHTML = "";

            for (let i = 0; i < data.results.length; i++) {
                var newSuggestion = document.createElement("div");
                newSuggestion.className = "suggest-element";
                newSuggestion.id = data.results[i].id;
                newSuggestion.textContent = data.results[i].original_title;

                suggestionsElement.appendChild(newSuggestion);
            }
        };

        var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + query;

        xhttp.open("GET", url);
        xhttp.send();
    }

    function getIMDbLink(tmdbId) {
        // API Key de TMDb
        const apiKey = '660af5aa7f2f70e2fda4b4cdd1ea3a62';

        // URL de la API de TMDb para obtener detalles de la película
        const tmdbUrl = 'https://api.themoviedb.org/3/movie/' + tmdbId + '?api_key=' + apiKey;

        // Crear una nueva solicitud XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // Configurar la solicitud
        xhr.open('GET', tmdbUrl, true);

        // Definir el callback cuando la solicitud se complete
        xhr.onload = function () {
            // Verificar si la solicitud fue exitosa (código de estado 200)
            if (xhr.status === 200) {
                // Convertir la respuesta JSON en un objeto
                const response = JSON.parse(xhr.responseText);
                // Verificar si se proporciona el ID de IMDb en los detalles de la película
                if (response.imdb_id) {
                    const imdbId = response.imdb_id;
                    // Construir el enlace de IMDb
                    const imdbLink = `https://www.imdb.com/title/${imdbId}/`;
                    console.log("Enlace de IMDb:", imdbLink);
                    // Aquí puedes usar imdbLink según tus necesidades
                } else {
                    console.log("No se encontró el ID de IMDb para esta película.");
                }
            } else {
                console.error("Error al obtener detalles de la película. Código de estado:", xhr.status);
            }
        };

        // Definir el callback para errores de red
        xhr.onerror = function () {
            console.error("Error de red al obtener detalles de la película.");
        };

        // Enviar la solicitud
        xhr.send();
    }

    filmSearchElement.addEventListener("keyup", (event) => {
        cercarPelicules(filmSearchElement.value);
        suggestionsElement.style.display = "inline";
    });

    filmButtonElement.addEventListener("click", (event) => {
        suggestionsElement.style.display = "none";
    });



}
