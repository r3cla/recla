// Create a canvas element
const canvas = document.createElement('canvas');
canvas.id = 'backgroundCanvas';
canvas.style.position = 'fixed'; // Change to fixed positioning
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

// Get the canvas context
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Update canvas dimensions and particle positions when window is resized
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);

    // Redistribute particles across new height
    particles.forEach(p => {
        if (p.y > height) {
            p.y = Math.random() * height;
        }
    });
});

// Define particle properties
let particleCount = 100;
let particles = [];
let lineColor = 'rgba(255, 255, 255, 0.1)';
let particleColor = 'rgba(255, 255, 255, 0.5)';
let particleSize = 2;
let maxDistance = 150;
let velocityRange = 0.5;

// Function to update canvas height based on content
function updateCanvasHeight() {
    const newHeight = Math.max(window.innerHeight, document.body.scrollHeight);
    if (height !== newHeight) {
        height = canvas.height = newHeight;
        // Redistribute particles if needed
        particles.forEach(p => {
            if (p.y > height) {
                p.y = Math.random() * height;
            }
        });
    }
}

// Create particles
function initializeParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: Math.random() * velocityRange * 2 - velocityRange,
            vy: Math.random() * velocityRange * 2 - velocityRange,
        });
    }
}

// Function to draw particles and lines
function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        // Only draw particles that are within or near the viewport
        if (p.y >= viewportTop - maxDistance && p.y <= viewportBottom + maxDistance) {
            ctx.beginPath();
            ctx.arc(p.x, p.y - viewportTop, particleSize, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                let q = particles[j];
                if (q.y >= viewportTop - maxDistance && q.y <= viewportBottom + maxDistance) {
                    let dx = p.x - q.x;
                    let dy = p.y - q.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y - viewportTop);
                        ctx.lineTo(q.x, q.y - viewportTop);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1 - (distance / maxDistance);
                        ctx.stroke();
                    }
                }
            }
        }
    }
}

// Update particle positions
function update() {
    updateCanvasHeight();

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) {
            p.vx *= -1;
        }
        if (p.y < 0 || p.y > height) {
            p.vy *= -1;
        }

        // Keep particles within bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
    }
}

// Animate particles and lines
function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

// Initialize and start animation
initializeParticles();
animate();

// Update canvas height when content changes
const observer = new MutationObserver(() => {
    updateCanvasHeight();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});