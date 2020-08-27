function hello() {
    var user = JSON.parse(localStorage.getItem("Player1"));
    console.log(typeof user);
    console.log(user);
}
hello();