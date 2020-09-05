//clear local Storage before user starts selection process.
window.localStorage.clear();
var block;
var cDiv;

//fetch the characters APi
var characters;
fetch("api/characters.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        characters = json;
        loopThroughCharacters(json);
    })
    .catch(function(error) {
        console.log(error);
    });
//loop through characters and populate the DOM as cards
function loopThroughCharacters(characters) {
    var characterDisplay = document.querySelector(".card-container");
    for (var i = 0; i < characters.length; i++) {
        characterDisplay.innerHTML += `<div class="col-xs-12 col-md-3"><div class="card cards block" onClick="selectCharacter(${i})">
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

                <a class="btn btn-primary cards__btn cards__btn--modify"> Select</a>

            </div>
            </div>`;
    }

    const blocks = document.querySelectorAll(".block");
    blocks.forEach(function(block) {
        block.addEventListener("click", function() {
            cDiv = this.children;

            /*  if ((cDiv[3].style.color = "red")) {
                                                            cDiv[3].innerText = "SELECT";
                                                        } else {
                                                            cDiv[3].innerText = "UNSELECT";
                                                        }*/
        });
    });
}

//determine character selection
function selectCharacter(index) {
    var selectedChar = characters;
    var char = {
        name: selectedChar[index].Name,
        banner: selectedChar[index].Banner,
        token: selectedChar[index].Token,
    };
    /*if (selectBtn === "SELECT") {
                                                                                                                                                                                                  selectBtn = "Unselect";
                                                                                                                                                                                              } else {
                                                                                                                                                                                                  selectBtn = "SELECT";
                                                                                                                                                                                              }*/
    //parse JSON of characters in local storage
    var player = JSON.parse(localStorage.getItem("player"));
    var player2 = JSON.parse(localStorage.getItem("player2"));
    console.log(cDiv);

    //check if user select character for player or computer
    if (localStorage.getItem("player") === null) {
        localStorage.setItem("player", JSON.stringify(char));
    } else if (player.name === char.name) {
        localStorage.removeItem("player");
    } else if (
        localStorage.getItem("player") !== null &&
        localStorage.getItem("player2") === null
    ) {
        localStorage.setItem("player2", JSON.stringify(char));
    } else if (player2.name === char.name) {
        localStorage.removeItem("player2");
    }
    if (
        localStorage.getItem("player") !== null &&
        localStorage.getItem("player2") !== null
    ) {
        $("#startGameModal").modal("show");
    }
}

//Start game modal
function toGame() {
    window.location.replace("game.html");
}

//change characters
function deleteSelection() {
    window.localStorage.clear();
}