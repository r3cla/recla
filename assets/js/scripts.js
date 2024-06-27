document.addEventListener('DOMContentLoaded', () => {

    // Canvas element for background effect
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
        about: "As a passionate web developer based in New Zealand, I'm on a mission to empower local startups, small businesses, non-profits, and charities. My goal is to help these organizations overcome technological barriers, enabling them to thrive in the digital landscape.",
        skills: ["HTML/CSS", "JavaScript", "Python", "SQL", "Git"],
        projects: ["lennoxlawncare.co.nz", "Bees Auto Detailing (in progress..)"],
        links: [
            '<a href="https://www.facebook.com/profile.php?id=61561257893956">Facebook</a>',
            '<a href="https://www.linkedin.com/in/nathan-addison">LinkedIn</a>',
            '<a href="https://github.com/r3cla">GitHub</a>'
        ]
    };

    // Typewriter effect
    function typeWriter(element, text, i = 0) {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(element, text, i), 10);
        } else {
            element.classList.add('cursor');
        }
    }

// Typewriter effect lists
    function typeWriterList(element, items, i = 0, j = 0) {
        if (i < items.length) {
            let currentLi;
            if (j === 0) {
                currentLi = document.createElement('li');
                element.appendChild(currentLi);
            } else {
                currentLi = element.lastElementChild;
            }
            const currentItem = items[i];
            if (j < currentItem.length) {
                if (currentItem.startsWith('<a') && j === 0) {
                    // If it's a link, add the whole element at once
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = currentItem;
                    currentLi.appendChild(tempDiv.firstChild);
                    i++;
                    setTimeout(() => typeWriterList(element, items, i, 0), 40);
                } else {
                    currentLi.innerHTML += currentItem.charAt(j);
                    j++;
                    setTimeout(() => typeWriterList(element, items, i, j), 30);
                }
            } else {
                i++;
                setTimeout(() => typeWriterList(element, items, i, 0), 40);
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
        if (event.target === contactForm) {
            contactForm.style.display = 'none';
        }
    }
});
