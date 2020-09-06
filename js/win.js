let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

var imgpath = "../images/jon.svg";
var imgObj = new Image();
imgObj.src = imgpath;

let imgW = imgObj.width / 1;
let imgH = imgObj.height / 1;

let tokenArray = [];

//randomize token travelpattern and speed
for (var i = 0; i < 20; i++) {
    let x = Math.random() * window.innerWidth;
    let dx = (Math.random() - 0.5) * 30;
    let y = Math.random() * window.innerHeight;
    let dy = (Math.random() - 0.5) * 30;
    tokenArray.push(new Token(imgObj, x, y, dx, dy));
}

console.log(tokenArray);

//assign individual variables to each token
function Token(img, x, y, dx, dy) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.imgH = imgH;
    this.imgW = imgW;
    this.drawImage = function() {
        console.log(img, x, y);
        c.drawImage(this.img, this.x, this.y, this.imgW, this.imgH);
    };
    //check if tokens are hitting the walls and if so bounce back;
    this.update = function() {
        if (this.x + this.imgW > innerWidth || this.x < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.imgH > innerHeight || this.y < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.drawImage();
    };
}

//create animation function that loops
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    //loop through tokenArray and animate
    for (var i = 0; i < tokenArray.length; i++) {
        tokenArray[i].update();
    }
}

animate();

/*imgObj.onload = function () {
    for (let i = 0; i < 10; i++) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerWidth;
        c.drawImage(imgObj, x, y, imgObj.width / 1, imgObj.height / 1);
        console.log(imgObj);
    }
};*/