const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const frontMatter = require('front-matter');

// Log current directory to help with debugging
console.log('Current directory:', process.cwd());

const processPost = (mdFilePath) => {
    try {
        // Check if file exists
        if (!fs.existsSync(mdFilePath)) {
            console.error(`File not found: ${mdFilePath}`);
            console.log('Available files in current directory:', fs.readdirSync('.'));
            return;
        }

        // Read and parse the markdown file
        const content = fs.readFileSync(mdFilePath, 'utf8');
        const { attributes: frontmatter, body } = frontMatter(content);

        // Convert markdown to HTML
        const htmlContent = marked(body);

        // Create the full HTML page
        const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${frontmatter.summary}">
    <title>${frontmatter.title} - Logie Web Services Blog</title>
    <link rel="stylesheet" href="../assets/css/reset.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/blog.css">
</head>
<body>
    <nav>
        <div class="nav-content">
            <div class="logo-container">
                <a href="../index.html" class="logo">
                    <span class="logo-text">Logie</span>
                    <span class="logo-accent">Web Services</span>
                    <span class="logo-semicolon">;</span>
                </a>
            </div>
            <div class="nav-links">
                <a href="../getmeonline.html" class="nav-link">
                    <span class="nav-link-text">get online</span>
                </a>
                <a href="../pricing.html" class="nav-link">
                    <span class="nav-link-text">pricing</span>
                </a>
                <a href="../blog.html" class="nav-link">
                    <span class="nav-link-text">blog</span>
                </a>
            </div>
        </div>
    </nav>

    <main class="blog-post">
        <article>
            <header class="post-header">
                <h1>${frontmatter.title}</h1>
                <p class="subtitle">${frontmatter.subtitle}</p>
                <div class="post-meta">
                    <time datetime="${frontmatter.date}">${new Date(frontmatter.date).toLocaleDateString('en-NZ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}</time>
                </div>
            </header>
            ${htmlContent}
        </article>
    </main>

    <footer>
        <div class="copyright">
            © ${new Date().getFullYear()}. All rights reserved.
        </div>
        <div class="social-icons">
            <a href="https://www.facebook.com/logienz/" target="_blank">
                <img src="../assets/images/fb.svg" alt="Facebook" class="social-icon">
            </a>
        </div>
        <div class="footer-links">
            <a href="../privacy.html">privacy</a>
            <span class="footer-link-separator">|</span>
            <a href="../terms.html">terms of service</a>
        </div>
    </footer>

    <script src="../assets/js/scripts.js"></script>
</body>
</html>`;

        // Write the HTML file
        const htmlFilePath = mdFilePath.replace('.md', '.html');
        fs.writeFileSync(htmlFilePath, finalHtml);
        console.log(`Successfully generated ${htmlFilePath}`);
    } catch (error) {
        console.error('Error processing post:', error);
    }
};

// Process the blog post
const mdFilePath = path.join(__dirname, 'posts', 'first-post.md');
console.log('Attempting to process file:', mdFilePath);
processPost(mdFilePath);