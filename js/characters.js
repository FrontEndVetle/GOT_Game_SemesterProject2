//clear local Storage before user starts selection process.
window.localStorage.clear();
let block;

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
    .catch(function() {
        alert("oops! We have a server problem, please try and reload page");
    });
//loop through characters and populate the DOM as cards
function loopThroughCharacters(characters) {
    var characterDisplay = document.querySelector(".card-container");
    for (var i = 0; i < characters.length; i++) {
        characterDisplay.innerHTML += `<div class="col-xs-12 col-md-3"><div class="card cards">
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

                <a class="btn btn-primary cards__btn cards__btn--modify"> SELECT</a>

            </div>
            </div>`;
    }

    //determine character selection
    document.querySelectorAll(".cards").forEach((card) => {
        card.addEventListener("click", function() {
            console.log(card.children[0].src);
            console.log(card.children[1].children[0].innerText);
            console.log(card.children[2].children[3].children[0].src);
            var char = {
                name: card.children[1].children[0].innerText,
                banner: card.children[0].src,
                token: card.children[2].children[3].children[0].src,
            };
            /*  var selectedChar = characters;
                                                                                                                                                                                                                                                                              var char = {
                                                                                                                                                                                                                                                                                  name: selectedChar.Name,
                                                                                                                                                                                                                                                                                  banner: selectedChar.Banner,
                                                                                                                                                                                                                                                                                  token: selectedChar.Token,
                                                                                                                                                                                                                                                                              };
                                                                                                                                                                                                                                                                              console.log(selectedChar);
                                                                                                                                                                                                                                                                              if (selectBtn === "SELECT") {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    selectBtn = "Unselect";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    selectBtn = "SELECT";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }*/
            //parse JSON of characters in local storage
            var player = JSON.parse(localStorage.getItem("player"));
            var player2 = JSON.parse(localStorage.getItem("player2"));

            /*  const blocks = document.querySelectorAll(".block");
                                                                                                                                                                                                                                                                                                                  blocks.forEach(function(block) {
                                                                                                                                                                                                                                                                                                                      block.addEventListener("click", function() {
                                                                                                                                                                                                                                                                                                                          card = this.children;
                                                                                                                                                                                                                                                                                                                          console.log(this.card[3].innerText);
                                                                                                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                                                                                                  });*/

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
        });
    });
}

//Start game modal
function toGame() {
    window.location.replace("game.html");
}

//change characters
function deleteSelection() {
    window.localStorage.clear();
}