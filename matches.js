export const matchData = [
 { discipline: '리커브', event: '남자 개인', athletes: ['이우석'], opponent: '일본', opponentName: '나카니시 준야', scores: [6, 2], medal: '금메달', replayId: '1006923100845100000', hook: '이우석의 개인전 금빛 마무리', finish: '' },
 { discipline: '리커브', event: '여자 개인', athletes: ['오예진'], opponent: '인도', opponentName: '쿰쿰 아닐 모호드', scores: [5, 6], medal: '은메달', replayId: '1006923100844100000', hook: '5–5에서 이어진 마지막 한 발의 승부', finish: '슛오프 패' },
 { discipline: '리커브', event: '남자 단체', athletes: ['김우진', '김제덕', '이우석'], opponent: '인도', opponentName: '', scores: [5, 1], medal: '금메달', replayId: '1006923100843100000', hook: '세 선수가 함께 만든 단체전 금메달', finish: '' },
 { discipline: '리커브', event: '여자 단체', athletes: ['강채영', '오예진', '이윤지'], opponent: '인도', opponentName: '', scores: [3, 5], medal: '은메달', replayId: '1006923100841100000', hook: '여자 단체전 결승에서 만난 한국과 인도', finish: '' },
 { discipline: '컴파운드', event: '남자 개인', athletes: ['김종호'], opponent: '대만', opponentName: '장청웨이', scores: [149, 145], medal: '금메달', replayId: '1006923100840100000', hook: '150점 만점에 149점, 정확도의 승부', finish: '' },
 { discipline: '컴파운드', event: '혼성 단체', athletes: ['박정윤', '최용희'], opponent: '인도', opponentName: '', scores: [157, 157], medal: '은메달', replayId: '1006923100835100000', hook: '157점 동점, 슛오프까지 간 접전', finish: '슛오프 19–20 패' }
];
export const renderMatchCards = (filter, roster, arrow) => matchData
 .filter(match => filter === '전체' || match.discipline === filter)
 .map(match => {
  const portraits = match.athletes.map(name => {
   const athlete = roster.find(entry => entry.name === name);
   return `<img src="${athlete.photo}" alt="${name} 선수" width="340" height="510" loading="lazy">`;
  }).join('');
  return `<article class="match-card"><div class="match-top"><span>${match.discipline} · ${match.event}</span><span class="medal ${match.medal === '은메달' ? 'silver' : ''}">${match.medal}</span></div><p class="match-hook">${match.hook}</p><div class="match-people"><div class="match-portrait-stack ${match.athletes.length === 1 ? 'single-portrait' : ''}">${portraits}</div><div class="match-player-names"><h3>${match.athletes.join(' · ')}</h3><p>${match.opponentName ? '상대 · ' + match.opponentName : '대한민국 대표팀'}</p></div></div><div class="match-scoreboard" aria-label="대한민국 ${match.scores[0]} 대 ${match.opponent} ${match.scores[1]}"><div><span>대한민국</span><strong>${match.scores[0]}</strong></div><span class="score-colon" aria-hidden="true">:</span><div><span>${match.opponent}</span><strong>${match.scores[1]}</strong></div></div><p class="match-score-note">결승 · ${match.discipline === '리커브' ? '세트 승점' : '화살 점수 합계'}${match.finish ? ' · ' + match.finish : ''}</p><a href="https://playvod.imbc.com/Vod/VodPlay?broadcastId=${match.replayId}" target="_blank" rel="noopener noreferrer" aria-label="${match.discipline} ${match.event}, ${match.athletes.join('·')} 경기 MBC에서 다시보기"><span class="play-icon" aria-hidden="true">▶</span><span>MBC에서 경기 다시보기</span>${arrow}</a></article>`;
 }).join('');
