fetch("https://raw.githubusercontent.com/FrontEndVetle/GOT_Game_SemesterProject2/master/api/characters.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {

        loopThroughCharacters(json);
    })
    .catch(function(error) {
        console.log(error);
    });



function loopThroughCharacters(characters) {
    var characterDisplay = document.querySelector(".card-container");
    for (var i = 0; i < characters.length; i++) {
        characterDisplay.innerHTML +=
            `<div class="col-xs-12 col-md-3"><div class="card cards">
            <img class="card-img-top cards__img" src="${characters[i].Banner}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title cards__title">${characters[i].Name}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item cards__info">Born: ${characters[i].Born}</li>
                <li class="list-group-item cards__info">Culture: ${characters[i].Culture} </li>
                <li class="list-group-item cards__info">Alias: ${characters[i].Aliases[0]}</li>
                 <li class="list-group-item cards__info"><img class="card-img-top cards__token" src="${characters[i].Token}" alt="Card image cap"></li>
            </ul>
            <div class="card-body">
                <a href="#" class="btn btn-primary cards__btn">SELECT CHARACTER</a>
            </div>
            </div>
            </div>`;
    };
}