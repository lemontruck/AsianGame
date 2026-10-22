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

