(function () {
var ctx;
var backgroundColor='#384048';
var elCanvas = document.getElementById('space');

function paintCanvas() {
    ctx.fillStyle = backgroundColor, ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
}

function Particle() {
    this.x = Math.random() * window.innerWidth, this.y = Math.random() * window.innerHeight, this.vx = -1 + 1 * Math.random(), this.vy = -1 + 1 * Math.random(), this.radius = particleRadius;
    var color = colors[Math.floor(Math.random() * colors.length)];
    this.color = {r: color.r, g: color.g, b: color.b}, this.blur = Math.floor(-7 * Math.random() + 9) / 10, this.draw = function () {
        ctx.fillStyle = "white", ctx.beginPath(), ctx.arc(this.x, this.y, this.radius, 0, Math.PI * this.radius, !1), ctx.fillStyle = "rgb(" + this.color.r + ", " + this.color.g + ", " + this.color.b + ")", ctx.fill()
    }
}

function draw() {
    paintCanvas();
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.draw()
    }
    update()
}

function update() {
    for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx, p.y += p.vy, p.x > window.innerWidth + p.radius ? p.x = p.radius : p.x < 0 - p.radius && (p.x = window.innerWidth - p.radius), p.y > window.innerHeight + p.radius ? p.y = p.radius : p.y < 0 - p.radius && (p.y = window.innerHeight - p.radius);
        for (var j = i + 1; j < particles.length; j++) {
            var p2 = particles[j];
            distance(p, p2)
        }
    }
}

function distance(p1, p2) {
    var dist, dx = p1.x - p2.x, dy = p1.y - p2.y, dist = Math.sqrt(dx * dx + dy * dy);
    if (minDist >= dist) {
        if (JSON.stringify(p1.color) != JSON.stringify(p2.color)) {
            ctx.beginPath();
            var gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop("0", "rgb(" + p1.color.r + ", " + p1.color.g + ", " + p1.color.b + ")"), gradient.addColorStop("1.0", "rgb(" + p2.color.r + ", " + p2.color.g + ", " + p2.color.b + ")"), ctx.strokeStyle = gradient, ctx.moveTo(p1.x, p1.y), ctx.lineTo(p2.x, p2.y), ctx.lineWidth = 2, ctx.stroke(), ctx.closePath()
        }
        var ax = dx / (1e3 * velocity), ay = dy / (1e3 * velocity);
        p1.vx -= ax, p1.vy -= ay, p2.vx += ax, p2.vy += ay
    }
}

function animloop() {
    draw(), requestAnimFrame(animloop)
}
function init() {
    elCanvas.width = window.innerWidth
    elCanvas.height = window.innerHeight

    ctx = document.getElementById('space').getContext("2d"), particleCount = 8, particles = [], particleRadius = 5, minDist = 100, velocity = 10, colors = [
        {r: 117, g: 125, b: 175},
        {r: 68, g: 73, b: 102},
        {r: 248, g: 172, b: 19}
    ];
    for (var i = 0; particleCount > i; i++)
        particles.push(new Particle);
    animloop();
}

window.onload = function (e) {
    init();
};


window.onresize = function (event) {
    elCanvas.width = window.innerWidth
    elCanvas.height = window.innerHeight
}

window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
}(window));
