/// <reference types="@cloudflare/workers-types" />

interface Env {
    ASSETS: Fetcher;
}

export default {
    async fetch(request, env): Promise<Response> {
        const url = new URL(request.url);

        // html_handling is "none" so *.html URLs serve literally with no
        // redirect, but that also disables the implicit "/" -> "/index.html"
        // mapping, so it's handled explicitly here.
        if (url.pathname === "/") {
            url.pathname = "/index.html";
            return env.ASSETS.fetch(new Request(url, request));
        }

        return env.ASSETS.fetch(request);
    },
} satisfies ExportedHandler<Env>;
