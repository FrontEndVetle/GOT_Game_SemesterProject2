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
                        <img class="card-img-top cards__img" src="${player.token}" alt="player token">`;
}
createPlayer();

function createCom() {
    var com = JSON.parse(localStorage.getItem("com"));
    console.log(com);

    let comDisplay = document.querySelector(".com");
    comDisplay.innerHTML += `
    <div class="card cards">
    <img class="card-img-top cards__img" src="${com.banner}" alt="Card image cap">
    <div class="card-body">
                <h5 class="card-title cards__title">${com.name}</h5>
                  <ul class="list-group list-group-flush">
                  </div>
                        </div>
                        <img class="card-img-top cards__img" src="${com.token}" alt="player token">`;
}
createCom();

//dice roll and and token movement
window.rollDice = () => {
    const max = 6;
    const roll = Math.ceil(Math.random() * max);
    console.log("you rolled", roll);
    currentPlayer = players[currentPlayerTurn];
    currentPlayer.position += roll;
    console.log(currentPlayer);
    renderBoard();
};

//create the board
const width = 5;
const height = 6;
const board = [];

for (var y = 0; y < height; y++) {
    let row = [];
    let position = 0;
    board.push(row);
    for (var x = 0; x < width; x++) {
        row.push({ x, y, occupied: null, position });
        position++;
    }
}

console.log(board);
const boardSizeConst = 120;
//render Gameboard
const renderBoard = () => {
    let boardHTML = "";
    board.forEach((row) => {
        row.forEach((square) => {
            boardHTML += `<div class="square" style="top:${
        square.y * boardSizeConst
      }px; left:${square.x * boardSizeConst}px;"></div>`;
        });
    });

    document.getElementById("board").innerHTML = boardHTML;
    console.log("render board!");
};
renderBoard();

//players
const players = [{
    user: player.name,
    position: 0,
}, ];

let currentPlayerTurn = 0;