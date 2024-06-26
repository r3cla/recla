document.addEventListener('DOMContentLoaded', (event) => {
    // Add Turnstile script dynamically
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    // Add event listener for form submission to include Turnstile token
    document.querySelector('form[name="contact"]').addEventListener('submit', function (event) {
        const turnstileResponse = document.querySelector('.cf-turnstile').dataset.token;
        document.getElementById('cf-turnstile-response').value = turnstileResponse;
    });

    // Add canvas element for background effect
    const canvas = document.createElement('canvas');
    canvas.id = 'backgroundCanvas';
    document.body.appendChild(canvas);

    // Resize canvas when window is resized
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nodes = [];
    const mouse = { x: 0, y: 0 };

    for (let i = 0; i < 100; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: 2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        console.log("Drawing...");

        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#0F0';
            ctx.fill();

            nodes.forEach(otherNode => {
                const distance = Math.sqrt((node.x - otherNode.x) ** 2 + (node.y - otherNode.y) ** 2);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.strokeStyle = '#0F0';
                    ctx.stroke();
                }
            });

            const mouseDistance = Math.sqrt((node.x - mouse.x) ** 2 + (node.y - mouse.y) ** 2);
            if (mouseDistance < 150) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = '#0F0';
                ctx.stroke();
            }
        });

        requestAnimationFrame(draw);
    }

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    draw();

    const content = {
        about: "Greetings, I'm a web developer with a passion for creating elegant and efficient digital solutions. My approach combines cutting-edge technology with a nostalgic appreciation for the early days of computing. I have a particular interest in providing affordable web solutions to startups, small businesses, non-profits and charities.",
        skills: ["HTML/CSS", "JavaScript", "Python", "SQL", "Java", "Git"],
        projects: ["lennoxlawncare.co.nz", "e-commerce-platform.zip", "social-media-dashboard.tar.gz", "crypto-tracker.exe"],
        links: [
            '<a href="https://www.facebook.com/yourprofile" target="_blank">Facebook</a>',
            '<a href="https://www.linkedin.com/in/yourprofile" target="_blank">LinkedIn</a>',
            '<a href="https://github.com/yourprofile" target="_blank">GitHub</a>'
        ]
    };

    // Typewriter effect for text
    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(element, text, i), 20);
        } else {
            element.classList.add('cursor');
        }
    }

    // Typewriter effect for lists
    function typeWriterList(element, items, i = 0, j = 0) {
        if (i < items.length) {
            if (j === 0) {
                const li = document.createElement('li');
                element.appendChild(li);
            }
            const currentItem = items[i];
            const currentLi = element.children[i];
            if (j < currentItem.length) {
                currentLi.innerHTML += currentItem.charAt(j);
                j++;
                setTimeout(() => typeWriterList(element, items, i, j), 20);
            } else {
                i++;
                j = 0;
                setTimeout(() => typeWriterList(element, items, i, j), 100);
            }
        } else {
            element.classList.add('cursor');
        }
    }

    // Collapsible sections
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(collapsible => {
        const header = collapsible.querySelector('h2');
        const contentDiv = collapsible.querySelector('.content');

        header.addEventListener('click', () => {
            collapsibles.forEach(otherCollapsible => {
                if (otherCollapsible !== collapsible) {
                    otherCollapsible.querySelector('.content').style.display = 'none';
                }
            });

            if (contentDiv.style.display === 'block') {
                contentDiv.style.display = 'none';
            } else {
                contentDiv.style.display = 'block';
                // Apply typewriter effect when section is opened
                const output = contentDiv.querySelector('.output');
                if (output && !output.classList.contains('cursor')) {
                    const sectionId = collapsible.id;
                    if (sectionId === 'about') {
                        typeWriter(output, content[sectionId]);
                    } else if (sectionId === 'skills' || sectionId === 'projects' || sectionId === 'links') {
                        typeWriterList(output, content[sectionId]);
                    }
                }
            }
        });
    });

    // Open the first section by default
    const firstSection = document.querySelector('.collapsible');
    if (firstSection) {
        const contentDiv = firstSection.querySelector('.content');
        contentDiv.style.display = 'block';
        const output = contentDiv.querySelector('.output');
        if (output) {
            typeWriter(output, content[firstSection.id]);
        }
    }

    // Contact form modal
    const contactLink = document.getElementById('contact-link');
    const contactForm = document.getElementById('contact-form');
    const closeBtn = document.getElementsByClassName('close')[0];

    contactLink.onclick = function() {
        contactForm.style.display = 'block';
    }

    closeBtn.onclick = function() {
        contactForm.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == contactForm) {
            contactForm.style.display = 'none';
        }
    }
});
