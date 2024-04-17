// borjaMontseny DAW2 M06 2024
window.onload = function () {

    // API Key
    const apiKey = "660af5aa7f2f70e2fda4b4cdd1ea3a62";

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




    filmSearchElement.addEventListener("keyup", (event) => {
        cercarPelicules(filmSearchElement.value);
        suggestionsElement.style.display = "inline";
    });

    filmButtonElement.addEventListener("click", (event) => {
        suggestionsElement.style.display = "none";
    });



}
