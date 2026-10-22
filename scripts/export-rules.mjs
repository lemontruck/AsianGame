// Include complete answers in the initial HTML, even before JavaScript runs.
import { rulesPage, rulesTitle, rulesDescription } from '../rules.js';
import { mkdir, writeFile } from 'node:fs/promises';
const directory = new URL('../archery-rules/', import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL('index.html', directory), `<!doctype html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#101828"><title>${rulesTitle}</title><meta name="description" content="${rulesDescription}"><meta property="og:title" content="${rulesTitle}"><meta property="og:description" content="${rulesDescription}"><meta property="og:type" content="website"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css"></head><body><div id="app">${rulesPage}</div><script type="module" src="/src.js"></script></body></html>`);
console.log('Updated archery-rules/index.html with complete rule answers');
