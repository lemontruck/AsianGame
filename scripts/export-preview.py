"""Generate the user's single-file preview from the same sources as the site."""
from pathlib import Path
from urllib.parse import quote
import json,re,base64,mimetypes
root=Path(__file__).resolve().parents[1]
s=(root/'src.js').read_text()
s=s.replace("import './style.css';",'').replace("import { articleTitle, articleDescription, articleBody } from './article-content.js';",(root/'article-content.js').read_text().replace('export const ','const '))
s=s.replace('const path = window.location.pathname;',"const path = (location.hash.slice(1).split('#')[0] || '/');")
s=s.replace('href="/','href="#/').replace('href="#matches"','href="#/#matches"')
for asset in (root/'public/assets').rglob('*'):
 if not asset.is_file(): continue
 asset_url='/assets/'+asset.relative_to(root/'public/assets').as_posix()
 if asset.suffix == '.svg': data_url='data:image/svg+xml;charset=utf-8,'+quote(asset.read_text(),safe='')
 else: data_url='data:'+(mimetypes.guess_type(asset.name)[0] or 'application/octet-stream')+';base64,'+base64.b64encode(asset.read_bytes()).decode('ascii')
 s=s.replace(asset_url,data_url)
main=(root/'index.html').read_text()
title=re.search(r'<title>(.*?)</title>',main)[1]
desc=re.search(r'<meta name="description" content="([^"]*)"',main)[1]
metadata='document.title=isArticle ? articleTitle+" | 골든텐" : isBlog ? "블로그 · 양궁이 가까워지는 이야기 | 골든텐" : '+json.dumps(title)+';\ndocument.querySelector(\'meta[name="description"]\').content=isArticle ? articleDescription : isBlog ? "골든텐 블로그에서 양궁 이야기를 만나보세요." : '+json.dumps(desc)+';'
s=s.replace("document.querySelector('#app').innerHTML",metadata+"\ndocument.querySelector('#app').innerHTML")
script="function renderGoldenTen(){\n"+s+"\nconst section=location.hash.slice(1).split('#')[1];if(section){requestAnimationFrame(()=>document.getElementById(section)?.scrollIntoView());}else{window.scrollTo(0,0);}\n}\nwindow.addEventListener('hashchange',renderGoldenTen);renderGoldenTen();"
html=f'<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><meta name="description" content="{desc}"><style>'+(root/'style.css').read_text()+'</style></head><body><div id="app"></div><script>'+script+'</script></body></html>'
out=root/'골든텐-사이트.html'
out.write_text(html)
print('Updated',out)
shared=Path('/workspace/shared/downloads')
if shared.is_dir():
 (shared/'golden-ten.html').write_text(html)
 print('Updated',shared/'golden-ten.html')
