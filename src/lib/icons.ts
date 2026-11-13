/**
 * Site icon set: 24x24, drawn in the site's own style (bold dark outline with
 * flat fills, like the avatar and the card treatment). Inner SVG markup only;
 * render through <Icon name="..." />.
 *
 * Fill classes (styled in global.css under .tile-icon):
 *   fl = white surface   dk = solid dark detail   wt = white detail, no outline
 *   gd = gold accent
 */
export const icons = {
    home: '<path class="fl" d="M5 10v9.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/><path class="dk" stroke-width="1" d="M12 2.6 22.2 11a1 1 0 0 1-1.3 1.6L12 5.3l-8.9 7.3A1 1 0 0 1 1.8 11z"/><path class="dk" d="M10 20.5V16a2 2 0 0 1 4 0v4.5z"/>',
    portfolio: '<rect class="fl" x="2.5" y="4" width="19" height="16" rx="2"/><path class="dk" d="M2.5 6a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v2.5h-19z"/><circle class="wt" cx="5.4" cy="6.25" r=".9"/><circle class="wt" cx="8" cy="6.25" r=".9"/><circle class="wt" cx="10.6" cy="6.25" r=".9"/><path d="M6.5 12.5h7M6.5 16h4.5"/>',
    blog: '<path class="fl" d="M15.2 3.3a1.5 1.5 0 0 1 2.1 0l3.4 3.4a1.5 1.5 0 0 1 0 2.1L9 20.5H3.5V15z"/><path d="M13 5.5l5.5 5.5"/><path class="dk" d="M3.5 17.3v3.2h3.2z"/>',
    faq: '<circle class="fl" cx="12" cy="12" r="9.5"/><path stroke-width="2.6" d="M9.3 9.4a2.8 2.8 0 1 1 3.9 2.6c-.8.4-1.2.9-1.2 1.7v.5"/><circle class="dk" stroke="none" cx="12" cy="17.4" r="1.45"/>',
    email: '<rect class="fl" x="2.5" y="5" width="19" height="14" rx="2"/><path class="dk" d="M2.5 7a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v.3L12 13.6 2.5 7.3z"/>',
    quote: '<path class="fl" d="M4.5 3.5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9l-5 4v-4h-1a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z"/><path stroke-width="2.2" d="M14.4 7.6c-.5-.6-1.3-1-2.4-1-1.4 0-2.4.7-2.4 1.8 0 2.4 4.9 1.3 4.9 3.8 0 1.1-1 1.8-2.5 1.8-1.1 0-2-.4-2.6-1.1M12 5.2v1.4M12 14v1.4"/>',
    star: '<path class="gd" d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/>',
    facebook: '<circle class="fl" cx="12" cy="12" r="9.5"/><path class="dk" stroke="none" d="M13.4 21.4v-6.9h2.3l.4-2.7h-2.7v-1.7c0-.8.3-1.3 1.4-1.3h1.4V6.4c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2H8.5v2.7h2.3v6.9z"/>',
} as const;

export type IconName = keyof typeof icons;
