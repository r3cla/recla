document.addEventListener("DOMContentLoaded", function() {
    // Get canvas element
    const canvas = document.getElementById("backgroundCanvas");
    if (!canvas) return; // Safety check
    
    // Set initial dimensions
    canvas.width = window.innerWidth;
    canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    
    // Update canvas size on window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    });
    
    // Simple function to update canvas height when page content changes
    function updateCanvasHeight() {
        const newHeight = Math.max(window.innerHeight, document.body.scrollHeight);
        if (canvas.height !== newHeight) {
            canvas.height = newHeight;
        }
    }
    
    // Add a basic scroll listener to update canvas height
    window.addEventListener("scroll", updateCanvasHeight, { passive: true });
});