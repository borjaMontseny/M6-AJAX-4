// borjaMontseny DAW2 M06 2024
window.onload = function () {

    // API Key
    const apiKey = "660af5aa7f2f70e2fda4b4cdd1ea3a62";

    // Array de ID's de pel·lícules
    var arrayMovieID = [];

    // Elements HTML
    var filmSearchElement = document.getElementById("filmSearch");
    var suggestionsElement = document.getElementById("suggestions");
    var filmButtonElement = document.getElementById("filmButton");
    var moviesElement = document.getElementById("movies");

    //  Suggeriments a mesura que es fa una cerca. (2p)
    function cercarPelicules(paraulaDonada) {

        var query = paraulaDonada;

        var xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            var data = JSON.parse(this.responseText);

            suggestionsElement.innerHTML = "";

            for (let i = 0; i < 10; i++) {
                var newSuggestion = document.createElement("div");
                newSuggestion.className = "suggest-element";
                newSuggestion.id = data.results[i].id;
                newSuggestion.textContent = data.results[i].original_title;
                suggestionsElement.appendChild(newSuggestion);

                getMovieFromID(data.results[i].id);
            }
        };

        var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + query;

        xhttp.open("GET", url);
        xhttp.send();
    }

    // Accés a la fitxa d’IMDB quan es clica a un dels suggeriments de la cerca. (2p)
    function getMovieFromID(movieID) {
        var xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            var data = JSON.parse(this.responseText);

            // guardem el contingut de la sugerència
            var movieTitle = document.getElementById(movieID).innerHTML;

            // la sobreescribim amb un a href de l'enllàç
            document.getElementById(movieID).innerHTML = "<a href='https://www.imdb.com/title/" + data.imdb_id + "/' target='_blank'>" + movieTitle + "</a>";
        };

        var url = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKey;

        xhttp.open("GET", url);
        xhttp.send();
    }

    /*
     * Mostra de totes les pel·lícules en el layout quan es clica el botó de cerca a partir de les paraules introduïdes. (2p)
     * Correcte visualització de les dades de la fitxa de la pel·lícula tal com es descriu en l’enunciat: pòster, títol, gèneres, data d’estrena i actors principals. (2p)
     * Enllaç funcional a IMDB de cada fitxa de la pel·lícula. (1p)
     */
    function createMovieCard(movieID) {
        var xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            var data = JSON.parse(this.responseText);

            // Verificar si la propiedad 'cast' está definida antes de acceder a ella
            var cast = (data.cast && data.cast.length > 0) ? data.cast.join(", ") : "N/A";

            // Crear elementos HTML para la tarjeta de película
            var cardDiv = document.createElement("div");
            cardDiv.className = "col-md-4";

            cardDiv.innerHTML = `
                <div class="card mb-4 box-shadow">
                    <img class="card-img-top"
                        data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                        alt="Thumbnail [100%x225]" style="width: 100%; display: block;"
                        src="https://image.tmdb.org/t/p/original${data.poster_path}"
                        data-holder-rendered="true">
                    <div class="card-body text-center">
                        <h5 class="card-title text-center">${data.title}</h5>
                        <div><small class="text-muted"><i class="bi bi-film mx-2"> </i>${data.genres.map(genre => genre.name).join(", ")}</small></div>
                        <div><small class="text-muted"><i class="bi bi-calendar3 mx-2"> </i>${data.release_date}</small></div>
                        <small class="text-muted"><i class="bi bi-people mx-2"></i>${cast}</small>
                    </div>
                    <div class="card-footer bg-primary text-white text-center">
                        <a href="https://www.imdb.com/title/${data.imdb_id}/" class="text-white"><i class="bi bi-eye"></i> Veure fitxa a IMDB</a>
                    </div>
                </div>
            `;

            // Agregar la tarjeta al contenedor de películas en el DOM
            var moviesElement = document.getElementById("movies");
            moviesElement.appendChild(cardDiv);
        };

        var url = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKey;

        xhttp.open("GET", url);
        xhttp.send();
    }

    // Listeners
    filmSearchElement.addEventListener("keyup", (event) => {
        cercarPelicules(filmSearchElement.value);
        suggestionsElement.style.display = "inline";
    });

    filmButtonElement.addEventListener("click", (event) => {
        suggestionsElement.style.display = "none";
        // Guardar els ID a un Array
        var elements = document.getElementsByClassName("suggest-element");
        arrayMovieID = Array.from(elements).map(element => element.id);

        moviesElement.innerHTML = "";

        // Crear las tarjetas de películas
        for (let index = 0; index < arrayMovieID.length; index++) {
            createMovieCard(arrayMovieID[index]);
        }

        // Limpiar el contenido a nivel lógico para una nueva búsqueda
        arrayMovieID = []; // Restablecer el array de ID de películas para una nueva búsqueda
    });


}