document.getElementById('contact-link').onclick = function() {
    document.getElementById('contact-form').style.display = 'block';
};

document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('contact-form').style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == document.getElementById('contact-form')) {
        document.getElementById('contact-form').style.display = 'none';
    }
};

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.hash) {
            e.preventDefault();
            document.querySelector(this.hash).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
