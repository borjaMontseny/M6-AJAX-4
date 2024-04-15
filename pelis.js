window.onload = function () {

    // Elements
    var filmSearchElement = document.getElementById("filmSearch");
    var suggestionsElement = document.getElementById("suggestions");
    var filmButtonElement = document.getElementById("filmButton");

    function cercarPelicules(paraulaDonada) {
        var apiKey = "660af5aa7f2f70e2fda4b4cdd1ea3a62";
        var query = paraulaDonada;

        var xhttp = new XMLHttpRequest();

        xhttp.onload = function () {
            var data = JSON.parse(this.responseText);

            for (let i = 0; i < data.results.length; i++) {
                var newSuggestion = document.createElement("div");
                newSuggestion.className = "suggest-element";
                newSuggestion.id = data.results[i].id;
                newSuggestion.textContent = data.results[i].original_title;

                // Agrega el nuevo elemento a la lista de sugerencias
                suggestionsElement.appendChild(newSuggestion);

                console.log(filmSearchElement.value);
            }
        };

        var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + query;

        xhttp.open("GET", url);

        xhttp.send();

    }

    filmSearchElement.addEventListener("keyup", (event) => {
        cercarPelicules(filmSearchElement.value);
    });

    filmButtonElement.addEventListener("click", (event) => {
        suggestionsElement.style.display = "none";
    });



}