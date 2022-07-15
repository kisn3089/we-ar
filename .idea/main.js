const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let x = (Math.random() * 960) + 20;
let y = (Math.random() * 460) + 20;
let radius = (Math.random() * 10) + 10;
let vx = (Math.random() - 2) * 2;
let vy = (Math.random() - 2) * 2;

function circle (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;

    this.draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,2*Math.PI, false);
        ctx.fill();

        // if(x <= canvas.width-980 || x >= canvas.width-20) {
        //     vx = -vx;
        // }
        //
        // if(y <= canvas.height-480 || y >= canvas.height-20) {
        //     vy = -vy;
        // }
        //
        // x += vx;
        // y += vy;
    }

    // requestAnimationFrame(circle);
}
// let ball = new circle(x, y, radius);
// ball.draw();

const balls = [];
for (let i = 0; i < 20; i++) {
    balls.push(new circle(x, y, radius));
}

function Update () {
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
    }
}
Update();


