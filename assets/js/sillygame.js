document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('projectile-container');

    function createProjectile() {
        const projectile = document.createElement('div');
        projectile.classList.add('projectile');

        // Random horizontal start position
        projectile.style.left = Math.random() * container.offsetWidth + 'px';

        container.appendChild(projectile);

        // Random speed
        const duration = Math.random() * 6 + 10; // 6 to 10 second travel time

        // Animate the projectile
        projectile.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-100vh)' }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        }).onfinish = () => projectile.remove();

        // Remove projectile on hover
        projectile.addEventListener('mouseenter', function() {
            projectile.remove();
        });
    }

    // Create new projectile every 500 milliseconds
    setInterval(createProjectile, 500);
});
