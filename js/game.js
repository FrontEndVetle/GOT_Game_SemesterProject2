//get DOM elements
const storyBoard = document.getElementById("story-board-list");
const modalBoard = document.querySelector(".modalsHere");
let playerTurn = document.getElementById("playerTurn");

//player starts
let currentPlayerTurn = 0;
//display next player variable
let nextPlayer;
let person;
let roll;

var player = JSON.parse(localStorage.getItem("player"));
var player2 = JSON.parse(localStorage.getItem("player2"));

function createPlayer() {
    var player = JSON.parse(localStorage.getItem("player"));
    let playerDisplay = document.querySelector(".player");
    playerDisplay.innerHTML += `
    <div class="card cards">
    <img class="card-img-top cards__img" src="${player.banner}" alt="Card image cap">
    <div class="card-body">
                <h5 class="card-title cards__title">${player.name}</h5>
                  <ul class="list-group list-group-flush">
                  </div>
                        </div>
                        <img class="game-token" src="${player.token}" alt="player token">`;
    playerTurn.innerHTML = "";
    playerTurn.innerHTML += `
             <li class="story-board__event">NEXT PLAYER IS ${player.name} <div class="spinner-grow text-muted"></div></li>
            `;
}
createPlayer();

function createplayer2() {
    var player2 = JSON.parse(localStorage.getItem("player2"));

    let player2Display = document.querySelector(".player2");
    player2Display.innerHTML += `
    <div class="card cards">
    <img class="card-img-top cards__img" src="${player2.banner}" alt="Card image cap">
    <div class="card-body">
                <h5 class="card-title cards__title">${player2.name}</h5>
                  <ul class="list-group list-group-flush">
                  </div>
                        </div>
                        <img class="game-token" src="${player2.token}" alt="player token">`;
}
createplayer2();

//display whos turn it is to throw dice

function showTurn() {
    person = 0;

    if (roll === 6 && person === 0) {
        person === 0;
    } else if (roll === 6 && person === 1) {
        person = 1;
    } else if (currentPlayerTurn === 0) {
        person = 1;
    } else {
        person = 0;
    }
    console.log(roll);

    playerTurn.innerHTML = "";
    playerTurn.innerHTML += `
             <li class="story-board__event">NEXT PLAYER IS ${nextPlayer[person].name} <div class="spinner-grow text-muted"></div></li>
            `;
}

//dice roll and and token movement
window.rollDice = () => {
    const max = 6;
    roll = Math.ceil(Math.random() * max);
    currentPlayer = players[currentPlayerTurn];
    nextPlayer = players;

    currentRoll = diceEyes[roll];
    showTurn();

    storyBoard.innerHTML += `
             <li class="story-board__event">${nextPlayer[person].name} ROLLED ${roll}</li>
            `;
    //change dice image depending on roll
    function updateDie() {
        var dice = document.querySelector("#dice");
        dice.setAttribute("src", currentRoll.path);
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
        }
        if (currentPlayer.position > 5) {
            loadWinner();
        }
        renderBoard();
    }, 400);

    function loadWinner() {
        // window.localStorage.clear();
        var winner = {
            name: currentPlayer.name,
            token: currentPlayer.token,
        };
        localStorage.setItem("winner", JSON.stringify(winner));
        window.location.replace("win.html");
    }

    traps.forEach((trap) => {
        if (trap.start === currentPlayer.position) {
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
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
  </div>
                    `;
            $("#trapModal").modal("show");

            storyBoard.innerHTML += `
             <li class="story-board__event">${currentPlayer.name} ${trap.description} ${currentPlayer.position}</li>
            `;
            currentPlayer.position = trap.end;
        }
    });
    //determine whos turn it is

    if (roll < 6) {
        currentPlayerTurn++;
    } else {
        modalBoard.innerHTML += `
        <div class="modal" id="rolledSixModal">
           <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">ROLLED 6</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>

      <div class="modal-body">
        ${currentPlayer.name} ROLLED A SIX AND CAN ROLL AGAIN
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
      </div>

    </div>
  </div>
                    </div>
                    `;
        $("#rolledSixModal").modal("show");
    }

    if (currentPlayerTurn >= players.length) {
        currentPlayerTurn = 0;
    }

    renderBoard();
};

//create the board
const width = 5;
const height = 5;
const board = [];
let position = 0;
let whiteSquare = false;

for (var y = height; y >= 0; y--) {
    let row = [];
    board.push(row);
    for (var x = 0; x < width; x++) {
        row.push({
            x,
            y,
            occupied: null,
            position,
            color: whiteSquare ? "white" : "blue",
            traps: "red",
        });
        whiteSquare = !whiteSquare;
        position++;
    }
}

//dice images
const diceEyes = [{
        path: "https://openclipart.org/download/282127/Die",
    },
    {
        path: "https://openclipart.org/download/282127/Die",
    },
    {
        path: "https://openclipart.org/download/282128/Die",
    },
    {
        path: "https://openclipart.org/download/282127/Die",
    },
    {
        path: "https://openclipart.org/download/282129/Die",
    },
    {
        path: "https://openclipart.org/download/282130/Die",
    },
    {
        path: "https://openclipart.org/download/282132/Die",
    },
];

//players
const players = [{
        name: player.name,
        position: 0,
        token: player.token,
    },
    {
        name: player2.name,
        position: 0,
        token: player2.token,
    },
];

//determine the location of the traps and where user will end when hitting them.
const traps = [{
        start: 2,
        end: 1,
        description: "HIDES DURING NED STARK'S EXECUTION AND RETREATS TO TILE",
    },
    {
        start: 3,
        end: 1,
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

const boardSizeConst = 120;
//render Gameboard
const renderBoard = () => {
    let boardHTML = "";
    board.forEach((row) => {
        row.forEach((square) => {
            boardHTML += `<div class="square" style="top:${
        square.y * boardSizeConst
      }px; left:${square.x * boardSizeConst}px; border-color:${
        square.color
      }"></div>`;
            traps.forEach((trap) => {
                if (trap.start === square.position) {
                    boardHTML += `<div class="square" style="top:${
            square.y * boardSizeConst
          }px; left:${square.x * boardSizeConst}px; background-color:${
            square.traps
          }"></div>`;
                }
            });
        });
    });

    //positioning of each player and token
    players.forEach((player) => {
        let square = 0;
        board.forEach((row) => {
            row.forEach((square) => {
                if (square.position === player.position) {
                    boardHTML += `<img class="game-token" id="hello" src="${
            player.token
          }" alt="player token" style="top:${
            square.y * boardSizeConst + 10
          }px; left:${square.x * boardSizeConst + 10}px;">`;
                }
            });
        });
    });
    //board placement
    document.getElementById("board").innerHTML = boardHTML;
};
renderBoard();