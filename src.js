import './style.css';
import { initBackToTop } from './back-to-top.js';
import { rulesPage, rulesTitle, rulesDescription } from './rules.js';
import { initMainNavigation } from './navigation.js';
import { renderMatchList, renderMatchesPage, matchesTitle, matchesDescription } from './matches.js';
import { athletes, athleteRoster, athleteViewer, initAthleteViewer } from './athletes.js';
import { initAthleteCarousel } from './carousel.js';
import { quickLook, guide, faqAndSources } from './home-sections.js';
import { articleTitle, articleDescription, articleBody } from './article-content.js';

const video = 'https://playvod.imbc.com/templete/VodList?bid=1006923100000100000';
const path = window.location.pathname;
const isArticle = /^\/2026-asian-games-archery-results(?:\/|$)/.test(path);
const isMatches = /^\/matches(?:\/|$)/.test(path);
const isRules = /^\/archery-rules(?:\/|$)/.test(path);
const isBlog = isArticle || /^\/blog(?:\/|$)/.test(path);
const arrow = '<span aria-hidden="true">↗</span>';
const header = `<header class="site-header"><div class="header"><a class="logo" href="/" aria-label="골든텐 홈"><span class="logo-mark">◎</span> GOLDEN TEN<span class="logo-dot">.</span></a><nav aria-label="주 메뉴"><a data-nav="matches" href="/matches/" ${isMatches ? 'aria-current="page"' : ''}>주요 경기</a><a data-nav="guide" href="/#guide">양궁 한눈에</a><a data-nav="rules" href="/archery-rules/" ${isRules ? 'aria-current="page"' : ''}>경기 규칙</a><a data-nav="athletes" href="/#athletes">선수</a><a data-nav="blog" href="/blog/" ${isBlog ? 'aria-current="page"' : ''}>블로그</a></nav></div></header>`;
const finalCta = `<section class="closing"><div class="wrap closing-inner"><span class="eyebrow">YOUR NEXT SHOT</span><h2>이제, 그 한 발을<br>직접 만나볼 시간.</h2><p>놓쳤던 승부와 기억에 남는 순간을 MBC 다시보기에서 만나보세요.</p><a class="button gold" href="${video}" target="_blank" rel="noopener noreferrer">MBC에서 아시안게임 다시보기 ${arrow}</a><small>MBC 2026 아이치·나고야 아시안게임 다시보기 목록으로 이동합니다.</small></div></section>`;
const footer = `<footer class="site-footer">${!isBlog && !isRules && !isMatches ? faqAndSources : ''}<div class="footer wrap"><div class="footer-top"><a class="logo" href="/">◎ GOLDEN TEN.</a><span>금빛 순간을 향한 한 발.</span></div><section class="media-credits" aria-labelledby="media-credits-title"><h2 id="media-credits-title">자료·사진 출처</h2><dl><div><dt>경기 자료·영상</dt><dd>경기 기록·규칙·선수 정보는 <a href="https://www.worldarchery.sport/sport/disciplines/target-archery" target="_blank" rel="noopener noreferrer">World Archery</a>와 <a href="https://www.archery.or.kr/teamPlayer/nationalTeam" target="_blank" rel="noopener noreferrer">대한양궁협회 국가대표 소개 페이지</a>의 자료를 참고하여 구성했습니다.<br>경기 영상은 <a href="https://playvod.imbc.com/templete/VodList?bid=1006923100000100000" target="_blank" rel="noopener noreferrer">MBC 아시안게임 다시보기 페이지</a>로 연결됩니다.</dd></div><div><dt>선수 사진</dt><dd><a href="https://www.archery.or.kr/teamPlayer/nationalTeam" target="_blank" rel="noopener noreferrer">대한양궁협회 국가대표 소개 페이지</a>의 프로필 사진을 사용했습니다.</dd></div></dl></section><p>골든텐은 양궁에 관심 있는 시청자에게 쉬운 양궁 안내와 경기 다시보기를 소개합니다.<br>본 페이지는 수업 실습을 위해 제작한 학습용 기획물입니다.<br>공식 대회·협회·선수의 운영 페이지가 아닙니다.</p><div class="footer-bottom"><span>© 2026 GOLDEN TEN · STUDENT PROJECT</span><a href="https://www.archery.or.kr/" target="_blank" rel="noopener noreferrer">대한양궁협회 ${arrow}</a></div></div></footer>`;
// Add real posts here as they are published; the count and card list follow this data.
const blogPosts = [{
 title: articleTitle,
 summary: articleDescription,
 publishedAt: '2026-10-22',
 href: '/2026-asian-games-archery-results',
 thumbnail: '/assets/article/medals-by-country-thumb.webp',
 thumbnailAlt: '2026 아시안게임 양궁 국가별 메달 비교 — 블로그 썸네일',
 category: '대회 결과 분석',
 readingTime: '약 12분'
}];
const featuredPost = blogPosts[0];
function displayPostDate(date) {
 return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Seoul' }).format(new Date(date + 'T00:00:00+09:00'));
}
function storyCard(post) {
 return `<a class="story-card" href="${post.href}"><div class="story-image"><img src="${post.thumbnail}" alt="${post.thumbnailAlt}" width="1448" height="1086" loading="lazy"></div><div class="story-copy"><span class="eyebrow muted">${post.category} · ${post.readingTime}</span><h2>${post.title}</h2><p>${post.summary}</p><div class="story-card-footer"><span class="text-link">이야기 읽기 ${arrow}</span><time datetime="${post.publishedAt}">${displayPostDate(post.publishedAt)}</time></div></div></a>`;
}
const blogCards = blogPosts.map(storyCard).join('');

const homeStoryCard = `<a class="home-story-card" href="/2026-asian-games-archery-results"><img src="/assets/article/medals-by-country-thumb.webp" alt="한국과 인도의 양궁 메달 수 비교" width="1448" height="1086" loading="lazy"><div><span class="eyebrow">대회 결과 분석 · <time datetime="${featuredPost.publishedAt}">${displayPostDate(featuredPost.publishedAt)}</time></span><h3>${articleTitle}</h3><p>한국과 인도의 종목별 성적과 주요 기록을 정리했습니다.</p><span class="text-link">분석 글 읽기 ${arrow}</span></div></a>`;
const home = `<main><section class="hero"><div class="hero-grid wrap"><div class="hero-copy"><div class="event-label"><span></span> 2026 아이치·나고야 아시안게임 양궁</div><h1>단 한 발,<br>모든 순간이<br><em>금빛이 된다.</em></h1><p><strong>한국 양궁 주요 결승 6경기, 결과부터 다시보기까지.</strong>선수와 점수를 확인하고, 보고 싶은 승부를 골라보세요.</p><a class="button gold" href="#matches">주요 경기 살펴보기 ${arrow}</a></div><div class="hero-art"><img class="hero-static" src="/assets/hero-target.svg" alt="과녁의 노란색 중심에 화살 한 발이 꽂힌 정적인 양궁 이미지" width="800" height="640" fetchpriority="high"></div></div></section>
${quickLook}
<section class="matches-section" id="matches"><div class="wrap section"><div class="section-heading"><div><span class="eyebrow">주요 결승 한눈에</span><h2>보고 싶은 경기부터 골라보세요.</h2></div><p>결과를 훑어보고, 궁금한 경기를 자세히 만나보세요.</p></div>${renderMatchList()}<div class="home-matches-more"><a class="button rules-link-button" href="/matches/">주요 경기 전체 보기 ${arrow}</a></div><p class="data-note">주요 결승 경기 요약입니다. 경기 자세히 보기를 누르면 선수 사진·점수 설명·관전 포인트와 MBC 다시보기를 확인할 수 있습니다.<br>경기 기록은 기획 원고 기준이며 공식 기록과의 최종 대조가 필요합니다.</p></div></section>
${guide}
${athletes}
<section class="home-stories"><div class="section wrap"><div class="section-heading"><div><span class="eyebrow">골든텐 블로그</span><h2>결과 너머의 이야기가 궁금하다면.</h2></div><a class="text-link" href="/blog/">블로그 전체 보기 ${arrow}</a></div>${homeStoryCard}</div></section>
</main>`;
const blog = `<main class="wrap blog-main"><div class="breadcrumb"><a href="/">홈</a><span>/</span>블로그</div><span class="eyebrow">GOLDEN TEN JOURNAL</span><h1>한 발 너머의 이야기.</h1><p class="page-intro">양궁이 조금 더 가까워지는 이야기.<br>처음 보는 당신도, 다시 보는 당신도.</p><div class="blog-count">전체 이야기 <strong>${String(blogPosts.length).padStart(2, '0')}</strong></div><div class="blog-grid" aria-label="게시글 목록">${blogCards}</div></main>`;
const article = `<main class="article-main"><div class="wrap breadcrumb"><a href="/">홈</a><span>/</span><a href="/blog/">블로그</a><span>/</span>대회 결과 분석</div><article><header class="article-header"><span class="eyebrow">RESULTS & ANALYSIS · 대회 결과 분석</span><h1>${articleTitle}</h1><p>${articleDescription}</p><div class="byline">골든텐 <span>·</span> <time datetime="${featuredPost.publishedAt}">${displayPostDate(featuredPost.publishedAt)}</time> <span>·</span> 약 12분 읽기</div></header><div class="article-body">${articleBody}<a class="back-link" href="/blog/">← 블로그 목록으로</a></div></article></main>`;
const imageViewer = `<dialog class="image-lightbox" aria-labelledby="image-viewer-title"><div class="lightbox-heading"><strong id="image-viewer-title">이미지 크게 보기</strong><button type="button" class="lightbox-close" autofocus>닫기 ×</button></div><p class="lightbox-help">이미지를 좌우·위아래로 움직여 자세히 볼 수 있습니다.</p><div class="lightbox-scroll" tabindex="0" aria-label="원본 이미지 스크롤 영역"><img alt=""></div></dialog>`;
window.goldenTenCarouselCleanup?.();
window.goldenTenNavCleanup?.();
window.goldenTenTopCleanup?.();
document.querySelector('#app').innerHTML = header + (isMatches ? renderMatchesPage(athleteRoster, arrow) : isRules ? rulesPage : isArticle ? article : isBlog ? blog : home) + finalCta + footer + imageViewer + athleteViewer + '<button type="button" class="back-to-top" aria-label="맨 위로 이동" title="맨 위로" hidden><span aria-hidden="true">↑</span></button>';
window.goldenTenCarouselCleanup = initAthleteCarousel(document.querySelector('#athletes'));
initAthleteViewer(athleteRoster);
window.goldenTenTopCleanup = initBackToTop();
window.goldenTenNavCleanup = initMainNavigation(isBlog || isRules || isMatches);

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
