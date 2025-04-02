document.addEventListener("DOMContentLoaded", function() {
    // Delay particle initialization to prioritize main content loading first
    setTimeout(() => {
        const canvas = document.getElementById("backgroundCanvas");
        if (!canvas) return; // Safety check
        
        const ctx = canvas.getContext("2d", { alpha: true });
        
        // Set initial dimensions
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles = [];
        let animationId;
        let isInViewport = true;
        
        // Add the toggle functionality
        const particleToggle = document.getElementById("particleToggle");
        let particlesEnabled = true;
        
        // Save the preference to localStorage
        function saveParticlePreference(enabled) {
            localStorage.setItem('particlesEnabled', enabled.toString());
        }
        
        // Load preference from localStorage (if available)
        function loadParticlePreference() {
            const savedPref = localStorage.getItem('particlesEnabled');
            if (savedPref !== null) {
                particlesEnabled = savedPref === 'true';
                particleToggle.checked = particlesEnabled;
                
                // Apply initial state
                if (!particlesEnabled) {
                    pauseAnimation();
                    ctx.globalAlpha = 0;
                    ctx.clearRect(0, 0, width, height);
                } else {
                    ctx.globalAlpha = 1.0;
                    resumeAnimation();
                }
            }
        }
        
        // Add toggle event listener
        particleToggle.addEventListener("change", function() {
            particlesEnabled = this.checked;
            saveParticlePreference(particlesEnabled);
            
            if (particlesEnabled) {
                // Only update the canvas context opacity, not the entire canvas
                ctx.globalAlpha = 1.0;
                resumeAnimation();
            } else {
                // Clear the canvas but keep the background image visible
                ctx.clearRect(0, 0, width, height);
                ctx.globalAlpha = 0;
                pauseAnimation();
            }
        });
        
        // Particle configuration
        const particleConfig = {
            targetCount: 25,
            initialCount: 1,
            currentCount: 1,
            lineColor: "rgba(123, 160, 188, 0.51)",
            particleColor: "rgba(241, 208, 156, 0.92)",
            particleSize: 2,
            maxDistance: 150,
            velocityRange: 0.8,
            transitionDuration: 6000 // ms
        };
        
        // Use throttled resize handler to prevent performance issues
        let resizeTimeout;
        window.addEventListener("resize", () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            
            resizeTimeout = setTimeout(() => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
                redistributeParticles();
            }, 200);
        });
        
        // Optimize visibility - pause animation when tab not visible
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                pauseAnimation();
            } else {
                resumeAnimation();
            }
        });
        
        // Optimize for scroll performance - use passive listeners
        window.addEventListener("scroll", () => {
            updateCanvasHeight();
        }, { passive: true });
        
        // Add intersection observer to only animate when visible
        const observer = new IntersectionObserver((entries) => {
            isInViewport = entries[0].isIntersecting;
            if (isInViewport) {
                resumeAnimation();
            } else {
                pauseAnimation();
            }
        }, { threshold: 0.1 });
        observer.observe(canvas);
        
        function redistributeParticles() {
            particles.forEach(p => {
                if (p.y > height) {
                    p.y = Math.random() * height;
                }
            });
        }
        
        function updateCanvasHeight() {
            const newHeight = Math.max(window.innerHeight, document.body.scrollHeight);
            if (height !== newHeight) {
                height = canvas.height = newHeight;
                redistributeParticles();
            }
        }
        
        function createParticle() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: Math.random() * particleConfig.velocityRange * 2 - particleConfig.velocityRange,
                vy: Math.random() * particleConfig.velocityRange * 2 - particleConfig.velocityRange
            };
        }
        
        function initializeParticles(count) {
            return Array.from({ length: count }, createParticle);
        }
        
        function addMoreParticles() {
            if (particleConfig.currentCount < particleConfig.targetCount) {
                // Calculate how many particles to add based on timing
                const timePerParticle = particleConfig.transitionDuration / 
                    (particleConfig.targetCount - particleConfig.initialCount);
                
                // Add just one particle at a time for smoother transition
                particles.push(createParticle());
                particleConfig.currentCount++;
                
                if (particleConfig.currentCount < particleConfig.targetCount) {
                    // Schedule next particle addition
                    setTimeout(addMoreParticles, timePerParticle);
                }
            }
        }
        
        // Use a more efficient drawing approach
        function draw() {
            // Only clear and redraw if the canvas is visible
            if (!isInViewport) return;
            
            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = "source-over";
            
            const t = window.scrollY;
            const viewportBottom = t + window.innerHeight;
            
            // Pre-calculate values outside the inner loop
            const particleSize = particleConfig.particleSize;
            const maxDistance = particleConfig.maxDistance;
            const lineColor = particleConfig.lineColor;
            const particleColor = particleConfig.particleColor;
            
            // Draw particles with distance-based culling
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                
                // Skip particles outside the viewport (with buffer)
                if (a.y < t - maxDistance || a.y > viewportBottom + maxDistance) continue;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(a.x, a.y - t, particleSize, 0, 2 * Math.PI);
                ctx.fillStyle = particleColor;
                ctx.fill();
                
                // Connect particles with lines (with optimized distance checks)
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    
                    // Skip particles outside the viewport
                    if (b.y < t - maxDistance || b.y > viewportBottom + maxDistance) continue;
                    
                    // Quick distance check for performance
                    if (Math.abs(a.x - b.x) > maxDistance || Math.abs(a.y - b.y) > maxDistance) continue;
                    
                    // Accurate distance calculation
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < maxDistance) {
                        const lineOpacity = 1 - distance / maxDistance;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y - t);
                        ctx.lineTo(b.x, b.y - t);
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = lineOpacity;
                        ctx.stroke();
                    }
                }
            }
        }
        
        function update() {
            if (!isInViewport) return;
            
            updateCanvasHeight();
            
            const wallBounce = -1;
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                
                // Wall collision
                if (p.x < 0 || p.x > width) p.vx *= wallBounce;
                if (p.y < 0 || p.y > height) p.vy *= wallBounce;
                
                // Ensure particles stay in bounds
                p.x = Math.max(0, Math.min(width, p.x));
                p.y = Math.max(0, Math.min(height, p.y));
            }
        }
        
        function animate() {
            update();
            draw();
            animationId = requestAnimationFrame(animate);
        }
        
        function pauseAnimation() {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }
        
        function resumeAnimation() {
            if (!animationId && isInViewport && !document.hidden && particlesEnabled) {
                animate();
            }
        }
        
        function start() {
            particles = initializeParticles(particleConfig.initialCount);
            // Load particle preference after initializing
            if (particleToggle) {
                loadParticlePreference();
            }
            animate();
            setTimeout(addMoreParticles, 500); // Delay particle addition to prioritize initial render
        }
        
        // Use a more efficient DOM observer
        const domObserver = new MutationObserver(() => {
            requestAnimationFrame(updateCanvasHeight);
        });
        
        domObserver.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
        
        start();
    }, 100); // Delay start to prioritize critical content
});