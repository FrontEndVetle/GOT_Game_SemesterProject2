//get DOM elements
const storyBoard = document.getElementById("story-board-list");
const modalBoard = document.querySelector(".modalsHere");

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
//player starts
let currentPlayerTurn = 0;

//dice roll and and token movement
window.rollDice = () => {
    const max = 6;
    const roll = Math.ceil(Math.random() * max);
    currentPlayer = players[currentPlayerTurn];
    currentRoll = diceEyes[roll];

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
            storyBoard.innerHTML += `
             <li class="story-board__event">${currentPlayer.name} rolled a ${roll} and landed on square ${currentPlayer.position}</li>
            `;
        }
        renderBoard();
    }, 400);

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
        ${currentPlayer.name} rolled a six and can roll again
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
        description: "hides during Ned Stark's execution and retreats to tile",
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