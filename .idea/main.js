// 컨버스 2D로 사용하기 위한 준비
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 목표 2 = 가로 1000, 세로 500 안에 랜덤으로 x, y 생성
let x = (Math.random() * 960) + 20;
let y = (Math.random() * 460) + 20;
// 목표 4 = 10~20px의 랜덤 반지름 가짐
let radius = (Math.random() * 10) + 10;
// 목표 5 = 2~4의 랜덤 속도를 가짐
let vx = (Math.random() - 2) * 2;
let vy = (Math.random() - 2) * 2;
// 랜덤 색깔
let c = ['#2C3e50', '#E74C3C', '#ECF0F1', '#3498DB', '#2980B9'];

// 원 객체 함수 생성
function Circle (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.c = c[Math.floor(Math.random() * c.length)];

    // 목표 3 360 랜덤 각도로 날아감
    let vxPlus = Math.random();
    let vyPlus = Math.random();

    if(vxPlus <= 0.5) {
        vxPlus = Math.random() + 0.5;
    }   else if(vxPlus >= 0.5) {
        vxPlus = -Math.random() - 0.5;
    }
    if(vyPlus <= 0.5) {
        vyPlus = Math.random() + 0.5;
    }   else if(vyPlus >= 0.5) {
        vyPlus = -Math.random() - 0.5;
    }

    this.vx = ((Math.random() - 2) * 2) * vxPlus;
    this.vy = ((Math.random() - 2) * 2) * vyPlus;

    // 원 그리는 함수
    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.radius,0,2*Math.PI, false);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.fill();
    }
    // 애니메이션 함수
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
//
const ballScale = Math.floor((Math.random() * 10 ) + 10);
const balls = [];
for (let i = 0; i < ballScale; i++) {
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


