// Keep all six match summaries available in the initial page HTML.
import { renderMatchesPage, matchesTitle, matchesDescription } from '../matches.js';
import { athleteRoster } from '../athletes.js';
import { mkdir, writeFile } from 'node:fs/promises';
const directory = new URL('../matches/', import.meta.url);
await mkdir(directory, { recursive: true });
const content = renderMatchesPage(athleteRoster, '<span aria-hidden="true">↗</span>');
await writeFile(new URL('index.html', directory), `<!doctype html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#101828"><title>${matchesTitle}</title><meta name="description" content="${matchesDescription}"><meta property="og:title" content="${matchesTitle}"><meta property="og:description" content="${matchesDescription}"><meta property="og:type" content="website"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css"></head><body><div id="app">${content}</div><script type="module" src="/src.js"></script></body></html>`);
console.log('Updated matches/index.html with all six match explanations');
