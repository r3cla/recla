const canvas = document.createElement("canvas");
canvas.id = "backgroundCanvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
canvas.style.opacity = "0";
canvas.style.transition = "opacity 0.5s ease";
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    redistributeParticles();
});
let targetParticleCount = 80;
let initialParticleCount = 10;
let currentParticleCount = initialParticleCount;
let particles = [];
const particleConfig = {lineColor: "rgba(255, 255, 255, 0.1)", particleColor: "rgba(255, 255, 255, 0.5)", particleSize: 2, maxDistance: 150, velocityRange: .5};
function redistributeParticles() {
    particles.forEach(t => {
        if (t.y > height) {
            t.y = Math.random() * height;
        }
    });
}
function updateCanvasHeight() {
    let t = Math.max(window.innerHeight, document.body.scrollHeight);
    if (height !== t) {
        height = canvas.height = t;
        redistributeParticles();
    }
}
function createParticle() {
    return {x: Math.random() * width, y: Math.random() * height, vx: Math.random() * particleConfig.velocityRange * 2 - particleConfig.velocityRange, vy: Math.random() * particleConfig.velocityRange * 2 - particleConfig.velocityRange};
}
function initializeParticles(t) {
    let e = [];
    for (let i = 0; i < t; i++) {
        e.push(createParticle());
    }
    return e;
}
function addMoreParticles() {
    if (currentParticleCount < targetParticleCount) {
        let t = Math.min(5, targetParticleCount - currentParticleCount);
        let e = initializeParticles(t);
        particles.push(...e);
        if ((currentParticleCount += t) < targetParticleCount) {
            requestIdleCallback(addMoreParticles, {timeout: 1e3});
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    let t = window.scrollY;
    let e = t + window.innerHeight;
    for (let i = 0; i < particles.length; i++) {
        let a = particles[i];
        if (a.y >= t - particleConfig.maxDistance && a.y <= e + particleConfig.maxDistance) {
            ctx.beginPath();
            ctx.arc(a.x, a.y - t, particleConfig.particleSize, 0, 2 * Math.PI);
            ctx.fillStyle = particleConfig.particleColor;
            ctx.fill();
            for (let n = i + 1; n < particles.length; n++) {
                let c = particles[n];
                if (c.y >= t - particleConfig.maxDistance && c.y <= e + particleConfig.maxDistance) {
                    let r = a.x - c.x;
                    let l = a.y - c.y;
                    let o = Math.sqrt(r * r + l * l);
                    if (o < particleConfig.maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y - t);
                        ctx.lineTo(c.x, c.y - t);
                        ctx.strokeStyle = particleConfig.lineColor;
                        ctx.lineWidth = 1 - o / particleConfig.maxDistance;
                        ctx.stroke();
                    }
                }
            }
        }
    }
}
function update() {
    updateCanvasHeight();
    for (let t = 0; t < particles.length; t++) {
        let e = particles[t];
        e.x += e.vx;
        e.y += e.vy;
        if (e.x < 0 || e.x > width) {
            e.vx *= -1;
        }
        if (e.y < 0 || e.y > height) {
            e.vy *= -1;
        }
        e.x = Math.max(0, Math.min(width, e.x));
        e.y = Math.max(0, Math.min(height, e.y));
    }
}
function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}
function start() {
    particles = initializeParticles(initialParticleCount);
    animate();
    requestAnimationFrame(() => {
        canvas.style.opacity = "1";
    });
    requestIdleCallback(addMoreParticles, {timeout: 1e3});
}
const observer = new MutationObserver(() => {
    updateCanvasHeight();
});
observer.observe(document.body, {childList: true, subtree: true});
start();
