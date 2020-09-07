let canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

var imgpath = "../images/jon.svg";
var imgObj = new Image();
imgObj.src = imgpath;
let tokenArray = [];

//creating a mouse object
var mouse = {
    x: undefined,
    y: undefined,
};

let maxSizeToken = 200;
let minSizeToken = 100;

window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

//randomize token travelpattern, speed and size.
for (var i = 0; i < 30; i++) {
    let randomSize = Math.ceil(Math.random() * 0.5 + 1);
    let imgW = imgObj.width / randomSize;
    let imgH = imgObj.height / randomSize;
    let x = Math.random() * window.innerWidth;
    let dx = (Math.random() - 0.5) * 20;
    let y = Math.random() * window.innerHeight;
    let dy = (Math.random() - 0.5) * 20;
    tokenArray.push(new Token(imgObj, x, y, dx, dy, imgW, imgH));
}

//assign individual variables to each token
function Token(img, x, y, dx, dy, imgW, imgH) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.imgH = imgH;
    this.imgW = imgW;
    this.drawImage = function() {
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

        //check if mouse is hovering a token
        if (
            mouse.x - this.x < 150 &&
            mouse.x - this.x > -150 &&
            mouse.y - this.y < 150 &&
            mouse.y - this.y > -150
        ) {
            if (this.imgW < 200 && this.imgH < maxSizeToken) {
                this.imgW += 5;
                this.imgH += 5;
            }
        } else if (this.imgW > minSizeToken && this.imgH > minSizeToken) {
            this.imgW -= 1;
            this.imgH -= 1;
        }

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

//run function if browser window is resized so tokens move to new area.
window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();