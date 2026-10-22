// Names and disciplines follow the 12 original filenames in the user-provided profile ZIP.
// Achievements are from the manuscript; no unprovided medal result is inferred.
export const athleteRoster = [
 { name: '김우진', discipline: '남자 리커브', achievement: '남자 단체전 금메달', photo: '/assets/athletes/리커브_김우진.png' },
 { name: '김제덕', discipline: '남자 리커브', achievement: '남자 단체전 금 · 혼성 동', photo: '/assets/athletes/리커브_김제덕.png' },
 { name: '이우석', discipline: '남자 리커브', achievement: '개인전·단체전 금메달', photo: '/assets/athletes/리커브_이우석.png' },
 { name: '강채영', discipline: '여자 리커브', achievement: '여자 단체전 은 · 혼성 동', photo: '/assets/athletes/리커브_강채영.png' },
 { name: '오예진', discipline: '여자 리커브', achievement: '개인전·단체전 은메달', photo: '/assets/athletes/리커브_오예진.png' },
 { name: '이윤지', discipline: '여자 리커브', achievement: '여자 단체전 은메달', photo: '/assets/athletes/리커브_이윤지.png' },
 { name: '김종호', discipline: '남자 컴파운드', achievement: '개인전 금메달', photo: '/assets/athletes/컴파운드_김종호.png' },
 { name: '최용희', discipline: '남자 컴파운드', achievement: '혼성 단체전 은메달', photo: '/assets/athletes/컴파운드_최용희.png' },
 { name: '최은규', discipline: '컴파운드', achievement: '대한민국 대표팀', photo: '/assets/athletes/컴파운드_최은규.png' },
 { name: '강연서', discipline: '여자 컴파운드', achievement: '개인전·단체전 동메달', photo: '/assets/athletes/컴파운드_강연서.png' },
 { name: '박예린', discipline: '여자 컴파운드', achievement: '여자 단체전 동메달', photo: '/assets/athletes/컴파운드_박예린.png' },
 { name: '박정윤', discipline: '여자 컴파운드', achievement: '혼성 은 · 여자 단체전 동', photo: '/assets/athletes/컴파운드_박정윤.png' }
];
const escapeAthleteText = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const athleteCard = athlete => `<li class="athlete-carousel-card"><div class="athlete-portrait">${athlete.photo ? `<img src="${escapeAthleteText(athlete.photo)}" alt="${escapeAthleteText(athlete.name)} 선수 공식 프로필" width="340" height="510" loading="lazy">` : `<div class="athlete-photo-placeholder" aria-hidden="true"><svg viewBox="0 0 180 180" fill="none"><circle cx="90" cy="64" r="25"/><path d="M39 150v-10c0-29 21-46 51-46s51 17 51 46v10"/><circle class="portrait-ring" cx="90" cy="90" r="78"/></svg></div>`}</div><div class="athlete-caption"><span>${escapeAthleteText(athlete.discipline)}</span><h3>${escapeAthleteText(athlete.name)}</h3><p>${escapeAthleteText(athlete.achievement)}</p></div></li>`;
const athleteCards = athleteRoster.map(athleteCard).join('');
export const athletes = `<section class="section wrap athlete-section" id="athletes" aria-labelledby="athletes-title"><div class="section-heading"><div><span class="eyebrow">대한민국 선수</span><h2 id="athletes-title">한 명 한 명, 기억할 이름.</h2></div><p>사진을 좌우로 넘겨 선수들을 만나보세요.</p></div><div class="athlete-viewport" id="athlete-viewport" role="region" aria-label="대한민국 선수 슬라이드. 좌우 화살표 키 또는 드래그로 넘길 수 있습니다." tabindex="0"><div class="athlete-belt"><ul class="athlete-carousel-list" aria-label="선수 목록">${athleteCards}</ul><ul class="athlete-carousel-list" aria-hidden="true" inert>${athleteCards}</ul></div></div></section>`;

export const initAthleteCarousel = section => {
 if (!section) return () => {};
 const viewport = section.querySelector('.athlete-viewport');
 const group = section.querySelector('.athlete-carousel-list');
 const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
 const idleDelay = 3000;
 const listeners = [];
 let resumeAt = performance.now() + idleDelay;
 let visible = false;
 let keyboardFocus = false;
 let dragging = false;
 let dragStartX = 0;
 let dragStartLeft = 0;
 let lastTime = 0;
 let remainder = 0;
 let frame;
 let disposed = false;
 const listen = (target, type, handler, options) => {
  target.addEventListener(type, handler, options);
  listeners.push(() => target.removeEventListener(type, handler, options));
 };
 const deferAutoplay = () => { resumeAt = performance.now() + idleDelay; remainder = 0; };
 const onPointerDown = event => {
  deferAutoplay();
  keyboardFocus = false;
  dragging = true;
  if (event.pointerType === 'mouse') {
   dragStartX = event.clientX;
   dragStartLeft = viewport.scrollLeft;
   viewport.setPointerCapture(event.pointerId);
   viewport.classList.add('is-dragging');
   event.preventDefault();
  }
 };
 const onPointerMove = event => {
  deferAutoplay();
  if (dragging && event.pointerType === 'mouse') viewport.scrollLeft = dragStartLeft - (event.clientX - dragStartX);
 };
 const endPointer = event => {
  dragging = false;
  viewport.classList.remove('is-dragging');
  if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
  deferAutoplay();
 };
 const onKeyDown = event => {
  const width = group.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(group).gap) || 0;
  const step = group.firstElementChild.getBoundingClientRect().width + gap;
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  keyboardFocus = true;
  deferAutoplay();
  event.preventDefault();
  if (event.key === 'Home') viewport.scrollLeft = 0;
  else if (event.key === 'End') viewport.scrollLeft = Math.max(0, width - viewport.clientWidth);
  else if (width > 0) viewport.scrollLeft = (viewport.scrollLeft + (event.key === 'ArrowRight' ? step : -step) + width) % width;
 };
 const observer = new IntersectionObserver(entries => {
  visible = entries[0].isIntersecting;
  if (visible) deferAutoplay();
 });
 observer.observe(viewport);
 const tick = now => {
  if (disposed) return;
  const delta = lastTime ? Math.min(now - lastTime, 64) : 0;
  lastTime = now;
  if (visible && !document.hidden && !reducedMotion.matches && !dragging && !keyboardFocus && now >= resumeAt) {
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
 listen(viewport, 'pointerenter', deferAutoplay);
 listen(viewport, 'pointerleave', deferAutoplay);
 listen(viewport, 'pointerdown', onPointerDown);
 listen(viewport, 'pointermove', onPointerMove);
 listen(viewport, 'pointerup', endPointer);
 listen(viewport, 'pointercancel', endPointer);
 listen(viewport, 'wheel', deferAutoplay, { passive: true });
 listen(viewport, 'keydown', onKeyDown);
 listen(viewport, 'focus', () => { keyboardFocus = viewport.matches(':focus-visible'); deferAutoplay(); });
 listen(viewport, 'blur', () => { keyboardFocus = false; deferAutoplay(); });
 listen(reducedMotion, 'change', deferAutoplay);
 frame = requestAnimationFrame(tick);
 return () => {
  disposed = true;
  cancelAnimationFrame(frame);
  observer.disconnect();
  listeners.forEach(remove => remove());
 };
};
