function createPlayer() {
    var player = JSON.parse(localStorage.getItem("player"));
    console.log(player);

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

//dice roll
window.rollDice = () => {
    const max = 6;
    const roll = Math.ceil(Math.random() * max);
    console.log("you rolled", roll);
};