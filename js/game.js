//get DOM elements
const storyBoard = document.getElementById("story-board-list");
const modalBoard = document.querySelector(".modalsHere");
let playerTurn = document.getElementById("nextPlayer");
let boardHTML;

//player starts
let currentPlayerTurn = 0;
//display next player variable
let nextPlayer = 0;
let roll;

var player = JSON.parse(localStorage.getItem("player"));
var player2 = JSON.parse(localStorage.getItem("player2"));

function createPlayer() {
    var player = JSON.parse(localStorage.getItem("player"));
    let playerDisplay = document.querySelector(".player");
    playerDisplay.innerHTML += `
    <div class="card cards cards__game">
    <img class="card-img-top cards__img cards__img--game" src="${player.banner}" alt="Card image cap">
    <div class="card-body">
                <h3 class="card-title cards__title">${player.name}</h3>
                  <ul class="list-group list-group-flush">
                  </div>
                        </div>
                        <img class="game-token game-token__fighters" src="${player.token}" alt="player token">`;
    playerTurn.innerHTML = "";
    playerTurn.innerHTML += `
           <p class="player-turn">NEXT PLAYER IS ${player.name}<img class="player-turn__token" src="${player.token}" alt="player token"></p>
            `;
}
createPlayer();

function createplayer2() {
    var player2 = JSON.parse(localStorage.getItem("player2"));

    let player2Display = document.querySelector(".player2");
    player2Display.innerHTML += `
    <div class="card cards cards__game">
    <img class="card-img-top cards__img" src="${player2.banner}" alt="Card image cap">
    <div class="card-body">
                <h3 class="card-title cards__title">${player2.name}</h3>
                  <ul class="list-group list-group-flush">
                  </div>
                        </div>
                        <img class="game-token game-token__fighters" src="${player2.token}" alt="player token">`;
}
createplayer2();

//spin button to animate the roll and make unclickable for 2,7 secounds
$(".rotate").click(function() {
    $(this).toggleClass("down");
    document.getElementById("rollBtn").disabled = true;
    setTimeout(function() {
        document.getElementById("rollBtn").disabled = false;
    }, 2700);
});

//dice roll and and token movement
window.rollDice = () => {
    const max = 6;
    roll = Math.ceil(Math.random() * max);
    currentPlayer = players[currentPlayerTurn];
    currentRoll = diceEyes[roll];
    showTurn();

    const liEvent = document.createElement("li");
    const rolledEvent = document.createTextNode(
        currentPlayer.name + " ROLLED " + roll
    );
    storyBoard.prepend(liEvent);
    liEvent.append(rolledEvent);
    liEvent.classList.add("story-board__event");

    //change dice image depending on roll

    function updateDie() {
        var dice = document.querySelector("#dice");
        setTimeout(() => {
            $(this).toggleClass("down");
            dice.setAttribute("src", currentRoll.path);
        }, 400);
    }

    updateDie();

    //add dice value to current position of player and animate movement
    var counter = 0;
    var interval = setInterval(function() {
        // custom code here
        counter++;
        currentPlayer.position++;
        if (counter === roll) {
            clearInterval(interval);
            checkTrap();
        }
        if (currentPlayer.position > 29) {
            loadWinner();
        }
        renderBoard();
    }, 500);

    //check if player landed on trap and display trap modal

    function checkTrap() {
        traps.forEach((trap) => {
            if (trap.start === currentPlayer.position) {
                currentPlayer.position = trap.end;
                modalBoard.innerHTML += `
        <div class="modal" id="trapModal">
           <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">OH NO!</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <div class="modal-body">
        ${currentPlayer.name} ${trap.description} ${currentPlayer.position}
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
  </div>
                    `;
                $("#trapModal").modal("show");

                //show trap event in storyboard
                const liEvent = document.createElement("li");
                const trapEvent = document.createTextNode(
                    currentPlayer.name + trap.description + currentPlayer.position
                );
                storyBoard.prepend(liEvent);
                liEvent.append(trapEvent);
                liEvent.classList.add("story-board__event");
            }
        });
    }

    //determine whos turn it is
    if (roll < 6) {
        currentPlayerTurn++;
    }

    if (currentPlayerTurn >= players.length) {
        currentPlayerTurn = 0;
    }

    renderBoard();
};

//display whos turn it is to throw dice

function showTurn() {
    if (currentPlayerTurn === 1) {
        nextPlayer = 0;
    } else {
        nextPlayer = 1;
    }

    if (roll === 6) {
        playerTurn.innerHTML = "";
        playerTurn.innerHTML += `
             <p class="player-turn">${currentPlayer.name} ROLLED A SIX AND CAN ROLL AGAIN!<img class="player-turn__token" src="${currentPlayer.token}" alt="player token"></p>
            `;
    } else {
        playerTurn.innerHTML = "";
        playerTurn.innerHTML += `
             <p class="player-turn">NEXT PLAYER IS ${players[nextPlayer].name}<img class="player-turn__token" src="${players[nextPlayer].token}" alt="player token"></p>
            `;
    }
}

//dice images
const diceEyes = [{
        path: "",
    },
    {
        path: "images/dice1.png",
    },
    {
        path: "images/dice2.png",
    },
    {
        path: "images/dice3.png",
    },
    {
        path: "images/dice4.png",
    },
    {
        path: "images/dice5.png",
    },
    {
        path: "images/dice6.png",
    },
];

//players
const players = [{
        name: player.name,
        position: 0,
        token: player.token,
        class: "game-token__player1",
    },
    {
        name: player2.name,
        position: 0,
        token: player2.token,
        class: "game-token__player2",
    },
];

//determine the location of the traps and where user will end when hitting them.
const traps = [{
        start: 3,
        end: 2,
        description: "HIDES DURING NED STARK'S EXECUTION AND RETREATS TO TILE",
    },
    {
        start: 8,
        end: 2,
        description: "hides during Ned Stark's execution and retreats to tile",
    },
    {
        start: 23,
        end: 1,
        description: "hides during Ned Stark's execution and retreats to tile",
    },
    {
        start: 19,
        end: 10,
        description: "hides during Ned Stark's execution and retreats to tile",
    },
    {
        start: 15,
        end: 1,
        description: "hides during Ned Stark's execution and retreats to tile",
    },
];

//create the board
const width = 5;
const height = 5;
const board = [];
let position = 0;
let pattern = false;

for (var y = height; y >= 0; y--) {
    let row = [];
    board.push(row);
    for (var x = 0; x < width; x++) {
        row.push({
            x,
            y,
            occupied: null,
            position,
            color: pattern ? "red" : "black",
        });
        pattern = !pattern;
        position++;
    }
}

const boardSize = 75;
//render Gameboard
const renderBoard = () => {
    let boardHTML = "";
    board.forEach((row) => {
        row.forEach((square) => {
            boardHTML += `<div class="square" style="top:${
        square.y * boardSize
      }px; left:${square.x * boardSize}px; background-color:${
        square.color
      }"></div>`;
            traps.forEach((trap) => {
                if (trap.start === square.position) {
                    boardHTML += `<div class="square square__trap" style="top:${
            square.y * boardSize
          }px; left:${square.x * boardSize}px; background-color:${
            square.traps
          }"></div>`;
                }
            });
        });
    });

    //positioning of each player and token

    players.forEach((player) => {
        board.forEach((row) => {
            row.forEach((square) => {
                if (square.position === player.position) {
                    boardHTML += `<img class="game-token ${player.class}" src="${
            player.token
          }" id="boardToken" alt="player token" style="top:${
            square.y * boardSize + 8
          }px; left:${square.x * boardSize + 8}px;">`;
                }
                //change token style if players are on same tile.
                if (players[0].position !== players[1].position) {
                    console.log(players[0].class);
                    player.class = "";
                } else {
                    (players[0].class = "game-token__player1"),
                    (players[1].class = "game-token__player2");
                }
            });
        });
    });

    //board placement
    document.getElementById("board").innerHTML = boardHTML;
    boardHTML = document.getElementById("board");
};
renderBoard();

//Store winner in localStorage and load winning page
function loadWinner() {
    window.localStorage.clear();
    var winner = {
        name: currentPlayer.name,
        token: currentPlayer.token,
    };
    localStorage.setItem("winner", JSON.stringify(winner));
    window.location.replace("win.html");
}