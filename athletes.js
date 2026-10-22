// Names and achievements from the user's manuscript, pending the full team list.
// Add a local photo path for each athlete when the official portrait files arrive.
export const athleteRoster = [
 { name: '김우진', discipline: '남자 리커브', achievement: '남자 단체전 금메달', photo: null },
 { name: '김제덕', discipline: '남자 리커브', achievement: '남자 단체전 금 · 혼성 동', photo: null },
 { name: '이우석', discipline: '남자 리커브', achievement: '개인전·단체전 금메달', photo: null },
 { name: '강채영', discipline: '여자 리커브', achievement: '여자 단체전 은 · 혼성 동', photo: null },
 { name: '오예진', discipline: '여자 리커브', achievement: '개인전·단체전 은메달', photo: null },
 { name: '이윤지', discipline: '여자 리커브', achievement: '여자 단체전 은메달', photo: null },
 { name: '김종호', discipline: '남자 컴파운드', achievement: '개인전 금메달', photo: null },
 { name: '최용희', discipline: '남자 컴파운드', achievement: '혼성 단체전 은메달', photo: null },
 { name: '강연서', discipline: '여자 컴파운드', achievement: '개인전·단체전 동메달', photo: null },
 { name: '박예린', discipline: '여자 컴파운드', achievement: '여자 단체전 동메달', photo: null },
 { name: '박정윤', discipline: '여자 컴파운드', achievement: '혼성 은 · 여자 단체전 동', photo: null }
];
const escapeAthleteText = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const athleteCard = athlete => `<li class="athlete-carousel-card"><div class="athlete-portrait">${athlete.photo ? `<img src="${escapeAthleteText(athlete.photo)}" alt="${escapeAthleteText(athlete.name)} 선수 공식 프로필" width="340" height="510" loading="lazy">` : `<div class="athlete-photo-placeholder" aria-hidden="true"><svg viewBox="0 0 180 180" fill="none"><circle cx="90" cy="64" r="25"/><path d="M39 150v-10c0-29 21-46 51-46s51 17 51 46v10"/><circle class="portrait-ring" cx="90" cy="90" r="78"/></svg></div>`}</div><div class="athlete-caption"><span>${escapeAthleteText(athlete.discipline)}</span><h3>${escapeAthleteText(athlete.name)}</h3><p>${escapeAthleteText(athlete.achievement)}</p></div></li>`;
const athleteCards = athleteRoster.map(athleteCard).join('');
export const athletes = `<section class="section wrap athlete-section" id="athletes" aria-labelledby="athletes-title"><div class="section-heading"><div><span class="eyebrow">대한민국 선수</span><h2 id="athletes-title">한 명 한 명, 기억할 이름.</h2></div><p>리커브부터 컴파운드까지, 대한민국 선수들을 만나보세요.</p></div><div class="athlete-carousel-toolbar"><p>원하는 선수에서 멈추고, 좌우로 넘겨보세요.</p><div class="athlete-carousel-controls"><button class="carousel-toggle" type="button" aria-pressed="false" aria-controls="athlete-viewport">Ⅱ 자동 넘김 멈춤</button><button class="carousel-prev" type="button" aria-label="이전 선수 보기" aria-controls="athlete-viewport">←</button><button class="carousel-next" type="button" aria-label="다음 선수 보기" aria-controls="athlete-viewport">→</button></div></div><div class="athlete-viewport" id="athlete-viewport" role="region" aria-label="대한민국 선수 슬라이드, 좌우로 넘겨서 볼 수 있습니다" tabindex="0"><div class="athlete-belt"><ul class="athlete-carousel-list" aria-label="선수 목록">${athleteCards}</ul><ul class="athlete-carousel-list" aria-hidden="true" inert>${athleteCards}</ul></div></div></section>`;

export const initAthleteCarousel = section => {
 if (!section) return () => {};
 const viewport = section.querySelector('.athlete-viewport');
 const group = section.querySelector('.athlete-carousel-list');
 const toggle = section.querySelector('.carousel-toggle');
 const previous = section.querySelector('.carousel-prev');
 const next = section.querySelector('.carousel-next');
 const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 let userPaused = reducedMotion.matches;
 let hoverPaused = false;
 let focusPaused = false;
 let visible = false;
 let lastTime = 0;
 let remainder = 0;
 let frame;
 let disposed = false;
 const updateToggle = () => {
  toggle.textContent = userPaused ? '▶ 자동 넘김 시작' : 'Ⅱ 자동 넘김 멈춤';
  toggle.setAttribute('aria-pressed', String(userPaused));
  toggle.setAttribute('aria-label', userPaused ? '선수 슬라이드 자동 넘김 시작하기' : '선수 슬라이드 자동 넘김 멈추기');
 };
 const pauseForInteraction = () => { userPaused = true; updateToggle(); };
 const togglePlayback = () => { userPaused = !userPaused; updateToggle(); };
 const enter = event => { if (event.pointerType === 'mouse') hoverPaused = true; };
 const leave = () => { hoverPaused = false; };
 const focus = () => { focusPaused = true; };
 const blur = () => { focusPaused = false; };
 const motionChange = event => { if (event.matches) pauseForInteraction(); };
 const advance = direction => {
  pauseForInteraction();
  const width = group.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(group).gap) || 0;
  const step = group.firstElementChild.getBoundingClientRect().width + gap;
  if (width > 0) viewport.scrollLeft = (viewport.scrollLeft + direction * step + width) % width;
 };
 const goPrevious = () => advance(-1);
 const goNext = () => advance(1);
 const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; });
 observer.observe(viewport);
 const tick = now => {
  if (disposed) return;
  const delta = lastTime ? Math.min(now - lastTime, 64) : 0;
  lastTime = now;
  if (visible && !document.hidden && !userPaused && !hoverPaused && !focusPaused) {
   remainder += delta * .032;
   const pixels = Math.floor(remainder);
   remainder -= pixels;
   if (pixels > 0) {
    const width = group.getBoundingClientRect().width;
    viewport.scrollLeft += pixels;
    if (width > 0 && viewport.scrollLeft >= width) viewport.scrollLeft -= width;
   }
  }
  frame = requestAnimationFrame(tick);
 };
 toggle.addEventListener('click', togglePlayback);
 previous.addEventListener('click', goPrevious);
 next.addEventListener('click', goNext);
 viewport.addEventListener('pointerenter', enter);
 viewport.addEventListener('pointerleave', leave);
 viewport.addEventListener('pointerdown', pauseForInteraction);
 viewport.addEventListener('focus', focus);
 viewport.addEventListener('blur', blur);
 reducedMotion.addEventListener('change', motionChange);
 updateToggle();
 frame = requestAnimationFrame(tick);
 return () => {
  disposed = true;
  cancelAnimationFrame(frame);
  observer.disconnect();
  toggle.removeEventListener('click', togglePlayback);
  previous.removeEventListener('click', goPrevious);
  next.removeEventListener('click', goNext);
  viewport.removeEventListener('pointerenter', enter);
  viewport.removeEventListener('pointerleave', leave);
  viewport.removeEventListener('pointerdown', pauseForInteraction);
  viewport.removeEventListener('focus', focus);
  viewport.removeEventListener('blur', blur);
  reducedMotion.removeEventListener('change', motionChange);
 };
};
