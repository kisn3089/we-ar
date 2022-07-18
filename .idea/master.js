// 컨버스 2D로 사용하기 위한 준비
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var colors = ['#2C3e50', '#E74C3C', '#3498DB', '#2980B9'];
// 색 랜덤 함수
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}
// 방향 함수
function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}
function rotate(velocity, angle) {
    var rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}
function resolveCollision(particle, otherParticle) {
    var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
    var xDist = otherParticle.x - particle.x;
    var yDist = otherParticle.y - particle.y;
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
        var m1 = particle.mass;
        var m2 = otherParticle.mass;
        var u1 = rotate(particle.velocity, angle);
        var u2 = rotate(otherParticle.velocity, angle);
        var v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        var v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };
        var vFinal1 = rotate(v1, -angle);
        var vFinal2 = rotate(v2, -angle);
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;
        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}
// 공 만드는 객체 함수
function circle(x, y, radius, color) {
    var _this = this;
    // 목표 3 360 랜덤 각도로 날아감
    var vxPlus = Math.random();
    var vyPlus = Math.random();
    if (vxPlus <= 0.5) {
        vxPlus = Math.random() + 0.5;
    }
    else if (vxPlus >= 0.5) {
        vxPlus = -Math.random() - 0.5;
    }
    if (vyPlus <= 0.5) {
        vyPlus = Math.random() + 0.5;
    }
    else if (vyPlus >= 0.5) {
        vyPlus = -Math.random() - 0.5;
    }
    this.x = x;
    this.y = y;
    this.velocity = {
        x: ((Math.random() - 2) * 2) * vxPlus,
        y: ((Math.random() - 2) * 2) * vyPlus
    };
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
    // 공끼리 부딪히는지 확인
    this.update = function (circles) {
        _this.draw();
        for (var i = 0; i < circles.length; i++) {
            if (_this === circles[i])
                continue;
            if (distance(_this.x, _this.y, circles[i].x, circles[i].y) - _this.radius * 2 < 0) {
                // circles[i].velocity.x = -circles[i].velocity.x;
                // circles[i].velocity.y = -circles[i].velocity.y;
                resolveCollision(_this, circles[i]);
                _this.opacity += 0.1;
            }
        }
        // 가로 벽에 부딪히면 반사각으로 튕기기
        if (_this.x + _this.radius > canvas.width || _this.x - _this.radius < 0) {
            _this.velocity.x = -_this.velocity.x;
        }
        // 세로 벽에 부딪히면 반사각으로 튕기
        if (_this.y + _this.radius > canvas.height || _this.y - _this.radius < 0) {
            _this.velocity.y = -_this.velocity.y;
        }
        _this.x += _this.velocity.x;
        _this.y += _this.velocity.y;
    };
    // 공 그리는 함수
    this.draw = function () {
        c.beginPath();
        c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = _this.opacity;
        c.fillStyle = _this.color;
        c.fill();
        c.restore();
        c.strokeStyle = _this.color;
        c.stroke();
        c.closePath();
    };
}
// 목표 2 = 10~20 개의 공 랜덤 생성
var circlesSum = Math.floor((Math.random() * 10) + 10);
var circles;
function init() {
    circles = [];
    for (var i = 0; i < circlesSum; i++) {
        var radius = (Math.random() * 10) + 10;
        var x = (Math.random() * 960) + 20;
        var y = (Math.random() * 460) + 20;
        var color = randomColor(colors);
        for (var j = 0; j < circles.length; j++) {
            if (distance(x, y, circles[j].x, circles[j].y) - radius * 2 < 0) {
                x = (Math.random() * 960) + 20;
                y = (Math.random() * 460) + 20;
                j = -1;
            }
        }
        circles.push(new circle(x, y, radius, color));
    }
    console.log(circles);
}
// 그렸던거 지우고 공들을 그린다. 그리고 애니메이션 실행
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function (circle) {
        circle.update(circles);
    });
}
init();
animate();
