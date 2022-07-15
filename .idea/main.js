const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let x = (Math.random() * 960) + 20;
let y = (Math.random() * 460) + 20;
let radius = (Math.random() * 10) + 10;
let vx = (Math.random() - 2) * 2;
let vy = (Math.random() - 2) * 2;
let c = ['#2C3e50', '#E74C3C', '#ECF0F1', '#3498DB', '#2980B9'];

function Circle (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.c = c[Math.floor(Math.random() * c.length)];
    this.vx = (Math.random() - 2) * 2;
    this.vy = (Math.random() - 2) * 2;

    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.radius,0,2*Math.PI, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.fill();
    }
    this.animate = function () {
        this.x += this.vx;
        this.y += this.vy;

        if(this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.vx = -this.vx;
        }

        if(this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.vy = -this.vy;
        }

        this.draw();
    }
}

const balls = [];
for (let i = 0; i < 20; i++) {
    let x = (Math.random() * 960) + 20;
    let y = (Math.random() * 460) + 20;
    let radius = (Math.random() * 10) + 10;
    let vx = (Math.random() - 2) * 2;
    let vy = (Math.random() - 2) * 2;

    for (let j = 0; j < balls.length; j++) {
        if(balls[j].x + balls[j].radius >= balls[j].radius + balls[j].x) {
            this.vx = -this.vx;
            this.vy = -this.vy;
        }
    }

    balls.push(new Circle(x, y, radius));
}

function Update () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].animate();
    }
    requestAnimationFrame(Update);
}
Update();


