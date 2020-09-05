let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

function Tokens(img, x, y) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.drawImage = function() {
        console.log(imgObj);
    };
}

var imgObj = new Tokens("../images/jon.svg");
imgObj.drawImage();

var imgpath = "../images/jon.svg";
var imgObj = new Image();
imgObj.src = imgpath;

let x = Math.random() * window.innerWidth;
let dx = (Math.random() - 0.5) * 10;
let y = Math.random() * window.innerHeight;
let dy = (Math.random() - 0.5) * 10;
let imgRadius;
let imgW = imgObj.width / 1;
let imgH = imgObj.height / 1;
//create animation function that loops
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.drawImage(imgObj, x, y, imgW, imgH);
    if (x + imgW > innerWidth || x < 0) {
        dx = -dx;
    }
    if (y + imgH > innerHeight || y < 0) {
        dy = -dy;
    }
    x += dx;
    y += dy;
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