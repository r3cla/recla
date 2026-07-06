document.addEventListener("DOMContentLoaded", function() {
    // Canvas background sizing
    const canvas = document.getElementById("backgroundCanvas");
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
        });

        window.addEventListener("scroll", () => {
            const newHeight = Math.max(window.innerHeight, document.body.scrollHeight);
            if (canvas.height !== newHeight) canvas.height = newHeight;
        }, { passive: true });
    }

    // FAQ accordion
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            const isExpanded = this.getAttribute("aria-expanded") === "true";
            const answer = this.nextElementSibling;
            this.setAttribute("aria-expanded", !isExpanded);
            this.classList.toggle("active");
            answer.style.maxHeight = isExpanded ? "0" : answer.scrollHeight + "px";
        });
    });
});