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
const athleteCard = athlete => `<li class="athlete-carousel-card"><button class="athlete-portrait athlete-photo-button" type="button" data-athlete="${escapeAthleteText(athlete.name)}" aria-haspopup="dialog" aria-label="${escapeAthleteText(athlete.name)} 선수 사진과 소개 크게 보기">${athlete.photo ? `<img src="${escapeAthleteText(athlete.photo)}" alt="${escapeAthleteText(athlete.name)} 선수 공식 프로필" width="340" height="510" loading="lazy">` : `<div class="athlete-photo-placeholder" aria-hidden="true"><svg viewBox="0 0 180 180" fill="none"><circle cx="90" cy="64" r="25"/><path d="M39 150v-10c0-29 21-46 51-46s51 17 51 46v10"/><circle class="portrait-ring" cx="90" cy="90" r="78"/></svg></div>`}<span class="athlete-photo-hint" aria-hidden="true">⊕ 크게 보기</span></button><div class="athlete-caption"><span>${escapeAthleteText(athlete.discipline)}</span><h3>${escapeAthleteText(athlete.name)}</h3><p>${escapeAthleteText(athlete.achievement)}</p></div></li>`;
const athleteCards = athleteRoster.map(athleteCard).join('');
export const athletes = `<section class="section wrap athlete-section" id="athletes" aria-labelledby="athletes-title"><div class="section-heading"><div><span class="eyebrow">대한민국 선수</span><h2 id="athletes-title">한 명 한 명, 기억할 이름.</h2></div><p>사진을 누르면 선수 소개를 크게 볼 수 있어요.</p></div><div class="athlete-viewport" id="athlete-viewport" role="region" aria-label="대한민국 선수 슬라이드. 좌우 화살표 키 또는 드래그로 넘길 수 있습니다." tabindex="0"><div class="athlete-belt"><ul class="athlete-carousel-list" aria-label="선수 목록">${athleteCards}</ul><ul class="athlete-carousel-list" aria-hidden="true" inert>${athleteCards}</ul></div></div><p class="photo-credit">사진 출처: <a href="https://www.archery.or.kr/teamPlayer/nationalTeam" target="_blank" rel="noopener noreferrer">대한양궁협회 국가대표 소개 페이지</a> 프로필 사진.</p></section>`;


export const athleteViewer = `<dialog class="athlete-lightbox" aria-labelledby="athlete-viewer-title"><div class="athlete-viewer-header"><strong>선수 사진·소개</strong><button class="athlete-viewer-close" type="button" autofocus>닫기 ×</button></div><div class="athlete-viewer-body"><img class="athlete-viewer-photo" width="340" height="510" alt=""><div class="athlete-viewer-info"><span class="athlete-viewer-discipline"></span><h2 id="athlete-viewer-title"></h2><p class="athlete-viewer-achievement"></p><p class="athlete-viewer-credit">사진 출처: <a href="https://www.archery.or.kr/teamPlayer/nationalTeam" target="_blank" rel="noopener noreferrer">대한양궁협회 국가대표 소개 페이지</a> 프로필 사진.<br>성적은 사이트 기획 원고 기준입니다.</p></div></div></dialog>`;
export const initAthleteViewer = roster => {
 const dialog = document.querySelector('.athlete-lightbox');
 const viewport = document.querySelector('.athlete-viewport');
 const openAthlete = name => {
  const athlete = roster.find(entry => entry.name === name);
  if (!athlete || dialog.open) return;
  const photo = dialog.querySelector('.athlete-viewer-photo');
  photo.src = athlete.photo;
  photo.alt = `${athlete.name} 선수 공식 프로필`;
  dialog.querySelector('#athlete-viewer-title').textContent = athlete.name;
  dialog.querySelector('.athlete-viewer-discipline').textContent = athlete.discipline;
  dialog.querySelector('.athlete-viewer-achievement').textContent = athlete.achievement;
  dialog.showModal();
  dialog.scrollTop = 0;
 };
 document.querySelectorAll('[data-athlete]').forEach(button => {
  button.addEventListener('click', () => openAthlete(button.dataset.athlete));
 });
 // The inert visual copy stays outside the keyboard and screen-reader order.
 // Hit-test it at the viewport so a visible repeated portrait still opens by touch/mouse.
 viewport?.addEventListener('click', event => {
  if (event.target.closest('[data-athlete]') || event.detail === 0) return;
  const repeatedPhoto = [...viewport.querySelectorAll('[inert] [data-athlete]')].find(button => {
   const box = button.getBoundingClientRect();
   return event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
  });
  if (repeatedPhoto) openAthlete(repeatedPhoto.dataset.athlete);
 });
 dialog.querySelector('.athlete-viewer-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
 });
 dialog.addEventListener('close', () => viewport?.dispatchEvent(new Event('carousel:resume')));
};
