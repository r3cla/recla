// Create a canvas element
const canvas = document.createElement('canvas');
canvas.id = 'backgroundCanvas';
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1'; // Move the canvas behind other elements
document.body.appendChild(canvas);

// Get the canvas context
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Define particle properties
let particleCount = 100;
let particles = [];
let lineColor = 'rgba(255, 255, 255, 0.1)';
let particleColor = 'rgba(255, 255, 255, 0.5)';
let particleSize = 2;
let maxDistance = 150;
let velocityRange = 0.5;

// Create particles
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.random() * velocityRange * 2 - velocityRange,
        vy: Math.random() * velocityRange * 2 - velocityRange,
    });
}

// Function to draw particles and lines
function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
            let q = particles[j];
            let dx = p.x - q.x;
            let dy = p.y - q.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 1 - (distance / maxDistance);
                ctx.stroke();
            }
        }
    }
}

// Update particle positions
function update() {
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) {
            p.vx *= -1;
        }
        if (p.y < 0 || p.y > height) {
            p.vy *= -1;
        }
    }
}

// Animate particles and lines
function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

// Start animation
animate();