const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const qq = document.querySelector('.qq');
qq.textContent = "qqee";
let x = (Math.random() * 960) + 20;
let y = (Math.random() * 460) + 20;
ctx.fillRect(200, 200, 300, 300);

