import './style.css';
import { articleTitle, articleDescription, articleBody } from './article-content.js';

const video = 'https://playvod.imbc.com/templete/VodList?bid=1006923100000100000';
const path = window.location.pathname;
const isArticle = /^\/2026-asian-games-archery-results(?:\/|$)/.test(path);
const isBlog = isArticle || /^\/blog(?:\/|$)/.test(path);
const arrow = '<span aria-hidden="true">↗</span>';
const header = `<header class="header"><a class="logo" href="/" aria-label="골든텐 홈"><span class="logo-mark">◎</span> GOLDEN TEN<span class="logo-dot">.</span></a><nav aria-label="주 메뉴"><a href="/" ${!isBlog ? 'aria-current="page"' : ''}>홈</a><a href="/#guide">양궁 알아보기</a><a href="/#matches">주요 경기</a><a href="/blog/" ${isBlog ? 'aria-current="page"' : ''}>블로그</a></nav><span class="header-label">AICHI–NAGOYA 2026</span></header>`;
const footer = `<section class="closing"><div class="wrap closing-inner"><span class="eyebrow">YOUR NEXT SHOT</span><h2>이제, 그 한 발을<br>직접 만나볼 시간.</h2><p>놓쳤던 승부와 기억에 남는 순간을 MBC 다시보기에서 만나보세요.</p><a class="button gold" href="${video}" target="_blank" rel="noopener noreferrer">MBC에서 아시안게임 다시보기 ${arrow}</a><small>MBC 2026 아이치·나고야 아시안게임 다시보기 목록으로 이동합니다.</small></div></section><footer class="footer wrap"><div class="footer-top"><a class="logo" href="/">◎ GOLDEN TEN.</a><span>금빛 순간을 향한 한 발.</span></div><p>골든텐은 양궁에 관심 있는 시청자에게 쉬운 관전 안내와 경기 다시보기를 소개합니다.<br>본 페이지는 수업 실습을 위해 제작한 학습용 기획물입니다.<br>공식 대회·협회·선수의 운영 페이지가 아닙니다.</p><div class="footer-bottom"><span>© 2026 GOLDEN TEN · STUDENT PROJECT</span><a href="https://www.archery.or.kr/" target="_blank" rel="noopener noreferrer">대한양궁협회 ${arrow}</a></div></footer>`;
const storyCard = `<a class="story-card" href="/2026-asian-games-archery-results"><div class="story-image"><img src="/assets/article/medals-by-country.png" alt="2026 아시안게임 양궁 국가별 메달 비교 — 블로그 썸네일" width="1448" height="1086" loading="lazy"></div><div class="story-copy"><span class="eyebrow muted">대회 결과 분석 · 약 12분</span><h3>${articleTitle}</h3><p>${articleDescription}</p><span class="text-link">이야기 읽기 ${arrow}</span></div></a>`;
const matches = [
 ['리커브 · 남자 개인','이우석','일본 · 나카니시 준야','6 : 2','금메달','1006923100845100000'],
 ['리커브 · 여자 개인','오예진','인도 · 쿰쿰 아닐 모호드','5 : 6','은메달','1006923100844100000'],
 ['리커브 · 남자 단체','김우진 · 김제덕 · 이우석','인도','5 : 1','금메달','1006923100843100000'],
 ['리커브 · 여자 단체','강채영 · 오예진 · 이윤지','인도','3 : 5','은메달','1006923100841100000'],
 ['컴파운드 · 남자 개인','김종호','대만 · 장청웨이','149 : 145','금메달','1006923100840100000'],
 ['컴파운드 · 혼성 단체','박정윤 · 최용희','인도','157 : 157','은메달','1006923100835100000']
];
function matchCards(filter = '전체') { return matches.filter(m => filter === '전체' || m[0].startsWith(filter)).map(m => `<article class="match-card"><div class="match-top"><span>${m[0]}</span><span class="medal ${m[4] === '은메달' ? 'silver' : ''}">${m[4]}</span></div><p class="match-round">결승 · 대한민국</p><h3>${m[1]}</h3><p class="opponent">VS ${m[2]}</p><div class="score">${m[3]}${m[0].includes('혼성') ? '<small>슛오프 19–20 패</small>' : m[1] === '오예진' ? '<small>슛오프 패</small>' : ''}</div><a href="https://playvod.imbc.com/Vod/VodPlay?broadcastId=${m[5]}" target="_blank" rel="noopener noreferrer">MBC 수록 회차 보기 ${arrow}</a></article>`).join(''); }
const home = `<main><section class="hero"><div class="hero-grid wrap"><div class="hero-copy"><div class="event-label"><span></span> 2026 아이치·나고야 아시안게임 양궁</div><h1>단 한 발,<br>모든 순간이<br><em>금빛이 된다.</em></h1><p>다시 보고 싶은 승부, 기억하고 싶은 선수.<br>대한민국 양궁의 빛나는 순간을 만나보세요.</p><a class="button gold" href="#matches">주요 경기 살펴보기 ${arrow}</a><a class="hero-secondary" href="/2026-asian-games-archery-results">이번 대회 결과 읽어보기 →</a></div><div class="hero-art"><img src="/assets/target.svg" alt="중앙에 화살이 꽂힌 양궁 과녁 그래픽"><span class="hero-art-caption">FOCUS ON THE MOMENT.</span><div class="art-badge"><strong>10</strong><span>한 발에 담긴<br>완벽한 집중</span></div></div></div><div class="hero-bottom wrap"><span>대한민국 양궁, 그 순간의 기록</span><span>SCROLL TO EXPLORE ↓</span></div></section><div class="ticker" aria-hidden="true"><span>ONE ARROW.</span> ONE MOMENT. <span>GOLDEN TEN.</span> ONE ARROW. ONE MOMENT.</div>
<section class="section wrap" id="guide"><div class="section-heading"><div><span class="eyebrow">01 / KNOW THE GAME</span><h2>알면 더 재밌는, 양궁.</h2></div><p>어려운 규칙은 잠깐 내려놓고,<br>이 두 가지만 기억하세요.</p></div><div class="guide-grid"><article class="guide-card"><span class="guide-number">01</span><span class="pill">RECURVE</span><h3>리커브<span>한 세트씩, 승부를 쌓다.</span></h3><p>활 끝이 바깥으로 휘어진 활을 사용해요. 개인전은 70m 거리에서 세트마다 점수를 비교하고, 먼저 세트 점수 6점에 도달하면 승리해요.</p><div class="guide-fact"><strong>70m</strong><span>과녁까지의 거리</span><strong>6점</strong><span>개인전 승리 기준</span></div></article><article class="guide-card"><span class="guide-number">02</span><span class="pill">COMPOUND</span><h3>컴파운드<span>한 점의 차이가 만드는 승부.</span></h3><p>도르래가 달린 활로 50m 거리의 과녁을 겨눠요. 세트 승패 대신 화살 점수를 모두 더해요. 개인전은 15발, 150점 만점이에요.</p><div class="guide-fact"><strong>50m</strong><span>과녁까지의 거리</span><strong>150점</strong><span>개인전 만점</span></div></article></div><div class="guide-note"><span>✦</span><p><strong>같은 점수라면? 슛오프!</strong> 추가 화살로 승부를 가려요. 개인전은 한 발씩 쏘고, 같은 점수면 과녁 중심에 더 가까운 화살이 이겨요.</p></div></section>
<section class="matches-section" id="matches"><div class="wrap section"><div class="section-heading"><div><span class="eyebrow">02 / THE GOLDEN MOMENTS</span><h2>다시 만나는 주요 결승.</h2></div><p>선수 이름부터 마지막 점수까지.<br>마음이 가는 경기를 골라보세요.</p></div><div class="filters" role="group" aria-label="경기 종목 선택"><button class="active" data-filter="전체" aria-pressed="true">전체 경기</button><button data-filter="리커브" aria-pressed="false">리커브</button><button data-filter="컴파운드" aria-pressed="false">컴파운드</button></div><div class="match-grid" id="match-grid">${matchCards()}</div><p class="data-note">※ 경기 기록은 과제 기획 자료 기준으로 작성했으며 공식 기록과의 최종 대조가 필요합니다. 전체 종목·대진표가 아닌 주요 경기 모음입니다.<br>다시보기는 해당 경기의 수록 회차로 연결됩니다. 재생에는 로그인·이용권이 필요할 수 있습니다.</p></div></section>
<section class="section wrap stories"><div class="section-heading"><div><span class="eyebrow">03 / BEHIND THE SHOT</span><h2>한 발 너머의 이야기.</h2></div><a class="text-link" href="/blog/">블로그 전체 보기 ${arrow}</a></div>${storyCard}</section></main>`;
const blog = `<main class="wrap blog-main"><div class="breadcrumb"><a href="/">홈</a><span>/</span>블로그</div><span class="eyebrow">GOLDEN TEN JOURNAL</span><h1>한 발 너머의 이야기.</h1><p class="page-intro">양궁이 조금 더 가까워지는 이야기.<br>처음 보는 당신도, 다시 보는 당신도.</p><div class="blog-count">전체 이야기 <strong>01</strong></div>${storyCard}</main>`;
const article = `<main class="article-main"><div class="wrap breadcrumb"><a href="/">홈</a><span>/</span><a href="/blog/">블로그</a><span>/</span>대회 결과 분석</div><article><header class="article-header"><span class="eyebrow">RESULTS & ANALYSIS · 대회 결과 분석</span><h1>${articleTitle}</h1><p>${articleDescription}</p><div class="byline">골든텐 <span>·</span> 약 12분 읽기</div></header><div class="article-body">${articleBody}<a class="back-link" href="/blog/">← 블로그 목록으로</a></div></article></main>`;
const imageViewer = `<dialog class="image-lightbox" aria-labelledby="image-viewer-title"><div class="lightbox-heading"><strong id="image-viewer-title">이미지 크게 보기</strong><button type="button" class="lightbox-close" autofocus>닫기 ×</button></div><p class="lightbox-help">이미지를 좌우·위아래로 움직여 자세히 볼 수 있습니다.</p><div class="lightbox-scroll" tabindex="0" aria-label="원본 이미지 스크롤 영역"><img alt=""></div></dialog>`;
document.querySelector('#app').innerHTML = header + (isArticle ? article : isBlog ? blog : home) + footer + imageViewer;
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
 document.querySelector('#match-grid').innerHTML = matchCards(button.dataset.filter);
}));

const viewer = document.querySelector('.image-lightbox');
document.querySelectorAll('.figure-zoom').forEach(button => button.addEventListener('click', () => {
 const image = button.querySelector('img');
 const fullImage = viewer.querySelector('img');
 fullImage.src = image.src;
 fullImage.alt = image.alt;
 viewer.showModal();
 viewer.querySelector('.lightbox-scroll').scrollTo(0, 0);
}));
viewer.querySelector('.lightbox-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
