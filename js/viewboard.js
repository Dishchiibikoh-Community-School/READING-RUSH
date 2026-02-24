/* ============================================
   READING RUSH — ViewBoard Mode Controller
   ============================================ */

const DEFAULT_TEAM_NAMES = ['Speed Readers', 'Word Warriors', 'Grammar Racers', 'Vocab Vipers', 'Story Sprinters', 'Lit Legends'];
const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];

let answerLocked = false;
let currentRound = 1;
let maxRounds = 3; // 3 normal rounds then Photo Finish

/* ---------- Setup ---------- */

(function initSetup() {
    const countSel = document.getElementById('setup-team-count');
    countSel.addEventListener('change', renderTeamInputs);
    renderTeamInputs();
})();

function renderTeamInputs() {
    const count = parseInt(document.getElementById('setup-team-count').value);
    const container = document.getElementById('team-names-container');
    let html = '<label class="form-label">Team Names</label>';
    for (let i = 0; i < count; i++) {
        const color = GameEngine.TEAM_COLORS[i];
        html += `
      <div class="team-input-row">
        <span class="team-color-dot" style="background:${color}"></span>
        <span style="font-size:1.3rem;">${GameEngine.CAR_EMOJIS[i]}</span>
        <input class="form-input" id="team-name-${i}" placeholder="${DEFAULT_TEAM_NAMES[i]}" value="${DEFAULT_TEAM_NAMES[i]}">
      </div>`;
    }
    container.innerHTML = html;
}

/* ---------- Start Game ---------- */

function startGame() {
    const domain = document.getElementById('setup-domain').value;
    const level = parseInt(document.getElementById('setup-level').value);
    const timer = parseInt(document.getElementById('setup-timer').value);
    const teamCount = parseInt(document.getElementById('setup-team-count').value);

    const teamNames = [];
    for (let i = 0; i < teamCount; i++) {
        const input = document.getElementById(`team-name-${i}`);
        teamNames.push(input.value || DEFAULT_TEAM_NAMES[i]);
    }

    GameEngine.resetGame();
    GameEngine.initTeams(teamNames);
    GameEngine.configure({ domain, level, timer, mode: 'viewboard', questionsPerRound: 10 });

    // Build UI
    buildRaceTrack();
    buildScoreboard();
    buildBuzzers();

    // Hide setup, show game
    document.getElementById('setup-screen').style.display = 'none';
    const gs = document.getElementById('game-screen');
    gs.classList.remove('hidden');
    gs.style.display = 'flex';

    // Countdown then start
    showCountdown(() => {
        currentRound = 1;
        startRound(currentRound);
    });
}

/* ---------- Countdown ---------- */

function showCountdown(callback) {
    const overlay = document.getElementById('countdown-overlay');
    const numEl = document.getElementById('countdown-number');
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';

    let count = 3;
    numEl.textContent = count;
    SoundEngine.countdown();

    const iv = setInterval(() => {
        count--;
        if (count > 0) {
            numEl.textContent = count;
            numEl.style.animation = 'none';
            void numEl.offsetWidth;
            numEl.style.animation = 'countdownNum 0.6s ease';
            SoundEngine.countdown();
        } else if (count === 0) {
            numEl.textContent = 'GO!';
            numEl.style.color = 'var(--neon-green)';
            SoundEngine.countdownGo();
        } else {
            clearInterval(iv);
            overlay.style.display = 'none';
            overlay.classList.add('hidden');
            numEl.style.color = '';
            if (callback) callback();
        }
    }, 800);
}

/* ---------- Round ---------- */

function startRound(roundNum) {
    currentRound = roundNum;
    const levelForRound = Math.min(roundNum, 3);
    GameEngine.configure({ level: levelForRound });
    GameEngine.loadRound(roundNum);

    const levelInfo = QuestionBank.getLevelInfo(levelForRound);
    document.getElementById('round-badge').textContent = `Round ${roundNum} — ${levelInfo.label}`;

    // Reset positions for new round (keep scores)
    GameEngine.getTeams().forEach(t => t.position = 0);
    updateTrackPositions();

    showNextQuestion();
}

/* ---------- Questions ---------- */

function showNextQuestion() {
    const q = GameEngine.nextQuestion();
    if (!q) {
        endRound();
        return;
    }

    answerLocked = false;
    enableBuzzers();
    GameEngine.getState().buzzedTeamIndex = -1;

    // Update question number
    const st = GameEngine.getState();
    document.getElementById('q-num-indicator').textContent = `Question ${st.questionIndex} of ${st.questionQueue.length}`;
    document.getElementById('question-count-display').textContent = `Q ${st.questionIndex}/${st.questionQueue.length}`;

    // Domain badge
    const domInfo = QuestionBank.getDomainInfo(q.domain);
    const badge = document.getElementById('q-domain-badge');
    badge.textContent = `${domInfo.icon} ${domInfo.label}`;
    badge.className = `question-domain-badge ${domInfo.cssClass}`;

    // Passage
    const passageEl = document.getElementById('q-passage');
    if (q.passage) {
        passageEl.textContent = q.passage;
        passageEl.classList.remove('hidden');
    } else {
        passageEl.classList.add('hidden');
    }

    // Question text
    document.getElementById('q-text').textContent = q.question;

    // Answers
    const grid = document.getElementById('answer-grid');
    if (q.type === 'tf') {
        grid.innerHTML = ['True', 'False'].map((text, i) => `
      <button class="answer-tile" id="ans-${i}" onclick="selectAnswer(${i})" disabled>
        <span class="answer-tile__letter">${text[0]}</span>
        <span>${text}</span>
      </button>
    `).join('');
    } else {
        grid.innerHTML = q.options.map((opt, i) => `
      <button class="answer-tile" id="ans-${i}" onclick="selectAnswer(${i})" disabled>
        <span class="answer-tile__letter">${ANSWER_LETTERS[i]}</span>
        <span>${opt}</span>
      </button>
    `).join('');
    }

    // Start timer
    const timerDur = GameEngine.getState().settings.timerDuration;
    startVisualTimer(timerDur);
    GameEngine.startTimer(timerDur, onTimerTick, onTimerUp);
}

/* ---------- Timer Visuals ---------- */

function startVisualTimer(seconds) {
    const circle = document.getElementById('timer-circle');
    const circumference = 2 * Math.PI * 36; // r=36
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = 0;
    document.getElementById('timer-text').textContent = seconds;
    document.getElementById('timer-ring').className = 'timer-ring';
    document.getElementById('timer-text').className = 'timer-text';
}

function onTimerTick(remaining) {
    const total = GameEngine.getState().settings.timerDuration;
    const circle = document.getElementById('timer-circle');
    const circumference = 2 * Math.PI * 36;
    const offset = circumference * (1 - remaining / total);
    circle.style.strokeDashoffset = offset;
    document.getElementById('timer-text').textContent = remaining;

    const ring = document.getElementById('timer-ring');
    const text = document.getElementById('timer-text');
    if (remaining <= 3) {
        ring.className = 'timer-ring danger';
        text.className = 'timer-text danger';
        SoundEngine.tick();
    } else if (remaining <= 5) {
        ring.className = 'timer-ring warning';
        text.className = 'timer-text';
        SoundEngine.tick();
    }
}

function onTimerUp() {
    answerLocked = true;
    showToast("⏰ Time's up!", 'wrong');
    SoundEngine.wrong();

    // Penalize buzzed team if any
    const buzzed = GameEngine.getState().buzzedTeamIndex;
    if (buzzed >= 0) {
        GameEngine.timeoutPenalty(buzzed);
        updateScoreboard();
    }

    // Highlight correct answer
    highlightCorrectAnswer();

    setTimeout(showNextQuestion, 2500);
}

/* ---------- Buzzers ---------- */

function buildBuzzers() {
    const teams = GameEngine.getTeams();
    const cols = teams.length <= 3 ? teams.length : (teams.length <= 4 ? 2 : 3);
    const panel = document.getElementById('buzzer-panel');
    panel.style.gridTemplateColumns = `repeat(${Math.min(teams.length, 6)}, 1fr)`;
    panel.innerHTML = teams.map((t, i) => `
    <button class="buzzer-btn" id="buzzer-${i}"
            style="border-color:${t.color}; color:${t.color}; background:rgba(${hexToRgb(t.color)},0.1);"
            onclick="teamBuzzIn(${i})">
      ${t.car} ${t.name}
    </button>
  `).join('');
}

function teamBuzzIn(teamIndex) {
    if (answerLocked) return;
    const success = GameEngine.buzzIn(teamIndex);
    if (!success) {
        if (GameEngine.getTeam(teamIndex)?.frozen) {
            showToast(`❄️ ${GameEngine.getTeam(teamIndex).name} is FROZEN!`, 'powerup');
        }
        return;
    }

    SoundEngine.buzzIn();

    // Highlight buzzed team
    const teams = GameEngine.getTeams();
    teams.forEach((_, i) => {
        const btn = document.getElementById(`buzzer-${i}`);
        if (i === teamIndex) {
            btn.classList.add('buzzed-in');
            btn.style.boxShadow = `0 0 40px ${teams[i].color}`;
        } else {
            btn.style.opacity = '0.3';
            btn.disabled = true;
        }
    });

    // Enable answer tiles
    const q = GameEngine.getCurrentQuestion();
    const count = q.type === 'tf' ? 2 : q.options.length;
    for (let i = 0; i < count; i++) {
        document.getElementById(`ans-${i}`).disabled = false;
    }
}

function enableBuzzers() {
    const teams = GameEngine.getTeams();
    teams.forEach((_, i) => {
        const btn = document.getElementById(`buzzer-${i}`);
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.classList.remove('buzzed-in');
        btn.style.boxShadow = '';
    });
}

/* ---------- Answers ---------- */

function selectAnswer(index) {
    if (answerLocked) return;
    answerLocked = true;
    GameEngine.stopTimer();

    const q = GameEngine.getCurrentQuestion();
    const buzzedTeam = GameEngine.getState().buzzedTeamIndex;
    const timeLeft = GameEngine.getTimerRemaining();

    // Determine correct answer index
    let correctIdx;
    if (q.type === 'tf') {
        correctIdx = q.answer === true ? 0 : 1;
    } else {
        correctIdx = q.answer;
    }

    const isCorrect = index === correctIdx;
    const tile = document.getElementById(`ans-${index}`);

    if (isCorrect) {
        tile.classList.add('correct');
        SoundEngine.correct();

        const result = GameEngine.correctAnswer(buzzedTeam, timeLeft);
        showToast(`✅ +${result.points} pts!`, 'correct');

        // Car boost animation
        const carEl = document.querySelector(`#lane-${buzzedTeam} .track-car`);
        if (carEl) carEl.classList.add('car-boost');
        setTimeout(() => carEl?.classList.remove('car-boost'), 600);

        // Confetti burst on the question area
        ConfettiEngine.burst(window.innerWidth / 2, window.innerHeight / 3, 30);

        // Streak notification
        if (result.streak === 3) {
            showToast('🔥 TURBO MODE! ×1.5 multiplier!', 'powerup');
            SoundEngine.turboBoost();
        } else if (result.streak === 5) {
            showToast('🔥🔥 NITRO BOOST! ×2.0 multiplier!', 'powerup');
            SoundEngine.nitro();
        }

        // Badge notifications
        if (result.newBadges) {
            result.newBadges.forEach(b => showToast(`${b.icon} Badge: ${b.label}`, 'badge'));
        }

        // Power-up reward
        if (result.gainedPowerUp) {
            showToast(`🎁 Earned power-up: ${getPowerUpEmoji(result.gainedPowerUp)}`, 'powerup');
            SoundEngine.powerup();
        }

        updateTrackPositions();
    } else {
        tile.classList.add('wrong');
        SoundEngine.wrong();

        const result = GameEngine.wrongAnswer(buzzedTeam);
        if (result.shielded) {
            showToast('🛡️ Shield blocked the penalty!', 'powerup');
        } else {
            showToast('❌ Wrong answer! Streak reset.', 'wrong');
            const carEl = document.querySelector(`#lane-${buzzedTeam} .track-car`);
            if (carEl) carEl.classList.add('engine-stall');
            setTimeout(() => carEl?.classList.remove('engine-stall'), 500);
        }

        // Highlight correct answer
        highlightCorrectAnswer();
    }

    updateScoreboard();

    // Disable remaining tiles
    const count = q.type === 'tf' ? 2 : q.options.length;
    for (let i = 0; i < count; i++) {
        if (i !== index) document.getElementById(`ans-${i}`).classList.add('disabled');
    }

    setTimeout(showNextQuestion, 2500);
}

function highlightCorrectAnswer() {
    const q = GameEngine.getCurrentQuestion();
    let correctIdx;
    if (q.type === 'tf') {
        correctIdx = q.answer === true ? 0 : 1;
    } else {
        correctIdx = q.answer;
    }
    const el = document.getElementById(`ans-${correctIdx}`);
    if (el && !el.classList.contains('correct')) {
        el.classList.add('correct');
    }
}

/* ---------- Race Track ---------- */

function buildRaceTrack() {
    const teams = GameEngine.getTeams();
    const track = document.getElementById('race-track');
    track.innerHTML = teams.map((t, i) => `
    <div class="track-lane" id="lane-${i}">
      <div class="track-lane__markers"></div>
      <div class="track-lane__finish"></div>
      <span class="track-team-name" style="color:${t.color}">${t.name}</span>
      <span class="track-car" style="color:${t.color}; margin-left:0%">${t.car}</span>
      <span class="track-progress-pct" id="pos-${i}">0%</span>
    </div>
  `).join('');
}

function updateTrackPositions() {
    const teams = GameEngine.getTeams();
    teams.forEach((t, i) => {
        const car = document.querySelector(`#lane-${i} .track-car`);
        if (car) {
            const maxMargin = 70; // max 70% margin-left
            car.style.marginLeft = `${(t.position / 100) * maxMargin}%`;
        }
        const posEl = document.getElementById(`pos-${i}`);
        if (posEl) posEl.textContent = `${Math.round(t.position)}%`;
    });
}

/* ---------- Scoreboard ---------- */

function buildScoreboard() {
    updateScoreboard();
}

function updateScoreboard() {
    const rankings = GameEngine.getRankings();
    const container = document.getElementById('score-rows');
    container.innerHTML = rankings.map((t, rank) => {
        let streakHtml = '';
        if (t.streak >= 5) {
            streakHtml = '<span class="streak-badge streak-nitro">🔥 NITRO</span>';
        } else if (t.streak >= 3) {
            streakHtml = '<span class="streak-badge streak-turbo">🔥 TURBO</span>';
        }
        return `
      <div class="team-score-row">
        <span style="font-weight:900; color:var(--neon-gold); width:20px;">${rank + 1}</span>
        <span class="team-score-car">${t.car}</span>
        <span class="team-score-name" style="color:${t.color}">${t.name}</span>
        ${streakHtml}
        <span class="team-score-pts">${t.score}</span>
      </div>
    `;
    }).join('');
}

/* ---------- Round End ---------- */

function endRound() {
    GameEngine.stopTimer();
    const rankings = GameEngine.getRankings();

    const screen = document.getElementById('round-end-screen');
    screen.classList.remove('hidden');
    screen.style.display = 'flex';

    document.getElementById('round-end-title').textContent =
        currentRound < maxRounds ? `🏁 Round ${currentRound} Complete!` : '🏁 Qualifying Rounds Complete!';

    // Build podium
    buildPodium('round-podium', rankings);

    // Rankings list
    const rankingsDiv = document.getElementById('round-rankings');
    rankingsDiv.innerHTML = rankings.map((t, i) => `
    <div style="display:flex; align-items:center; gap:0.5rem; padding:0.4rem 0; justify-content:center;">
      <span style="font-weight:900; color:var(--neon-gold);">#${i + 1}</span>
      <span>${t.car}</span>
      <span style="color:${t.color}; font-family:var(--font-display);">${t.name}</span>
      <span class="score-text" style="color:var(--neon-gold);">${t.score} pts</span>
    </div>
  `).join('');

    // Change button text
    const btn = document.getElementById('btn-next-round');
    if (currentRound >= maxRounds) {
        btn.textContent = '🏁 PHOTO FINISH!';
        btn.onclick = showPhotoFinishIntro;
    } else {
        btn.textContent = '🏁 Next Round!';
        btn.onclick = nextRound;
    }

    SoundEngine.finishLine();
    ConfettiEngine.victory();
}

function nextRound() {
    document.getElementById('round-end-screen').style.display = 'none';
    document.getElementById('round-end-screen').classList.add('hidden');

    currentRound++;
    GameEngine.getTeams().forEach(t => t.position = 0);
    updateTrackPositions();

    showCountdown(() => startRound(currentRound));
}

/* ---------- Photo Finish ---------- */

function showPhotoFinishIntro() {
    document.getElementById('round-end-screen').style.display = 'none';

    const topTwo = GameEngine.getTopTwo();
    const intro = document.getElementById('photo-finish-intro');
    intro.classList.remove('hidden');
    intro.style.display = 'flex';

    document.getElementById('photo-finish-matchup').innerHTML = `
    <span style="color:${topTwo[0].color}">${topTwo[0].car} ${topTwo[0].name}</span>
    <span class="photo-finish-vs"> VS </span>
    <span style="color:${topTwo[1]?.color || '#fff'}">${topTwo[1]?.car || '🏎️'} ${topTwo[1]?.name || 'Challenger'}</span>
  `;

    SoundEngine.engineRev();
}

function startPhotoFinish() {
    document.getElementById('photo-finish-intro').style.display = 'none';

    GameEngine.loadPhotoFinish();
    GameEngine.getTeams().forEach(t => t.position = 0);
    updateTrackPositions();

    const levelInfo = QuestionBank.getLevelInfo(4);
    document.getElementById('round-badge').textContent = `PHOTO FINISH — ${levelInfo.label}`;

    currentRound = 4;

    showCountdown(showNextQuestion);
}

/* ---------- Game Over ---------- */

function endGameEarly() {
    if (!confirm('End the race now?')) return;
    finishGame();
}

function finishGame() {
    GameEngine.stopTimer();
    GameEngine.setGameOver();
    GameEngine.saveToLeaderboard();

    const rankings = GameEngine.getRankings();

    document.getElementById('game-screen').style.display = 'none';
    const goScreen = document.getElementById('game-over-screen');
    goScreen.classList.remove('hidden');
    goScreen.style.display = 'flex';

    buildPodium('final-podium', rankings);

    const rankingsDiv = document.getElementById('final-rankings');
    rankingsDiv.innerHTML = rankings.map((t, i) => `
    <div style="display:flex; align-items:center; gap:0.5rem; padding:0.5rem 0; justify-content:center;">
      <span style="font-weight:900; color:var(--neon-gold); font-size:1.2rem;">#${i + 1}</span>
      <span style="font-size:1.5rem;">${t.car}</span>
      <span style="color:${t.color}; font-family:var(--font-display); font-size:1.1rem;">${t.name}</span>
      <span class="score-text" style="color:var(--neon-gold); font-size:1.1rem;">${t.score} pts</span>
    </div>
  `).join('');

    SoundEngine.finishLine();
    setTimeout(() => ConfettiEngine.victory(), 500);
    setTimeout(() => ConfettiEngine.victory(), 1500);
}

/* ---------- Pause ---------- */

function pauseGame() {
    GameEngine.pauseTimer();
    document.getElementById('pause-overlay').classList.remove('hidden');
    document.getElementById('pause-overlay').style.display = 'flex';
}

function resumeGame() {
    GameEngine.resumeTimer();
    document.getElementById('pause-overlay').style.display = 'none';
    document.getElementById('pause-overlay').classList.add('hidden');
}

/* ---------- Podium Builder ---------- */

function buildPodium(containerId, rankings) {
    const container = document.getElementById(containerId);
    if (rankings.length < 2) {
        container.innerHTML = `<div class="podium-place">
      <span style="font-size:2rem;">${rankings[0]?.car}</span>
      <span class="podium-team-name" style="color:${rankings[0]?.color}">${rankings[0]?.name}</span>
      <div class="podium-block podium-1st">🥇</div>
      <span class="podium-score">${rankings[0]?.score} pts</span>
    </div>`;
        return;
    }

    const order = rankings.length >= 3
        ? [rankings[1], rankings[0], rankings[2]]
        : [rankings[1], rankings[0]];

    const classes = ['podium-2nd', 'podium-1st', 'podium-3rd'];
    const medals = ['🥈', '🥇', '🥉'];

    container.innerHTML = order.map((t, i) => `
    <div class="podium-place">
      <span style="font-size:2rem;">${t.car}</span>
      <span class="podium-team-name" style="color:${t.color}">${t.name}</span>
      <div class="podium-block ${classes[i]}">${medals[i]}</div>
      <span class="podium-score">${t.score} pts</span>
    </div>
  `).join('');
}

/* ---------- Toast ---------- */

function showToast(message, type = 'correct') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

/* ---------- Helpers ---------- */

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
}

function getPowerUpEmoji(type) {
    const map = { turbo: '🚀 Turbo Boost', freeze: '❄️ Freeze', shield: '🛡️ Shield', eliminator: '💣 Eliminator', draft: '🌀 Draft' };
    return map[type] || type;
}

// Handle round completion in Photo Finish
const _origShowNext = showNextQuestion;
// Override to detect game end after photo finish
const origShowNextRef = showNextQuestion;
