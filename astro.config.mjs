// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.logie.nz',
    trailingSlash: 'ignore',
    build: {
        // Keep existing URLs byte-identical: /projects.html, /faq.html, /privacy.html
        // instead of Astro's default /projects/, /faq/, /privacy/.
        // (@astrojs/sitemap doesn't account for this format, so sitemap.xml
        // is hand-maintained in public/ instead of generated.)
        format: 'file',
    },
});
