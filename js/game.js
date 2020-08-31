var player = JSON.parse(localStorage.getItem("player"));
var com = JSON.parse(localStorage.getItem("com"));

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

function createCom() {
    var com = JSON.parse(localStorage.getItem("com"));

    let comDisplay = document.querySelector(".com");
    comDisplay.innerHTML += `
    <div class="card cards">
    <img class="card-img-top cards__img" src="${com.banner}" alt="Card image cap">
    <div class="card-body">
                <h5 class="card-title cards__title">${com.name}</h5>
                  <ul class="list-group list-group-flush">
                  </div>
                        </div>
                        <img class="game-token" src="${com.token}" alt="player token">`;
}
createCom();
//player starts
let currentPlayerTurn = 0;

//dice roll and and token movement
window.rollDice = () => {
    const max = 6;
    const roll = Math.ceil(Math.random() * max);
    currentPlayer = players[currentPlayerTurn];
    console.log(currentPlayer.name + " rolled a", roll);

    //add dice value to current position of player and animate movement
    var counter = 0;
    var interval = setInterval(function() {
        // custom code here
        counter++;
        currentPlayer.position++;
        if (counter === roll) {
            clearInterval(interval);
            console.log(
                currentPlayer.name + " landed on square " + currentPlayer.position
            );
        }
        renderBoard();
    }, 400);

    traps.forEach((trap) => {
        if (trap.start === currentPlayer.position) {
            console.log("you stepped on the trap! boha!");
            currentPlayer.position = trap.end;
        }
    });
    //determine whos turn it is
    currentPlayerTurn++;
    if (currentPlayerTurn >= players.length) {
        currentPlayerTurn = 0;
    }

    if (currentPlayer.position > 30) {
        console.log(currentPlayer.name + "has won");
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
        });
        whiteSquare = !whiteSquare;
        position++;
    }
}

//players
const players = [{
        name: player.name,
        position: 0,
        token: player.token,
    },
    {
        name: com.name,
        position: 0,
        token: com.token,
    },
];

//determine the location of the traps and where user will end when hitting them.
const traps = [{
        start: 2,
        end: 1,
    },
    {
        start: 3,
        end: 1,
    },
    {
        start: 10,
        end: 1,
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
        });
    });

    //positioning of each player and token
    players.forEach((player) => {
        let square = 0;
        board.forEach((row) => {
            row.forEach((square) => {
                if (square.position === player.position) {
                    boardHTML += `<img class="game-token" src="${
            player.token
          }" alt="player token" style="top:${
            square.y * boardSizeConst + 10
          }px; left:${square.x * boardSizeConst + 10}px;">`;
                }
            });
        });
    });

    document.getElementById("board").innerHTML = boardHTML;
};
renderBoard();