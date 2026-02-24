/* ============================================
   READING RUSH — Chromebook Mode Controller
   WITH AI OPPONENTS for competitive racing!
   ============================================ */

const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];
let answerLocked = false;
let selectedLevel = 1;
let selectedCarIndex = 0;
let currentRound = 1;
const maxRounds = 3;
const timerDuration = 15;

/* ---------- AI Opponents ---------- */

const AI_NAMES = [
    'Speed Reader', 'Grammar Bot', 'Word Wizard',
    'Book Worm', 'Vocab King', 'Sentence Slayer',
    'Page Turner', 'Spell Champ'
];

const AI_COLORS = ['#ff2e63', '#00f0ff', '#b14eff', '#ff6f00', '#39ff14'];

let aiOpponents = [];
let aiIntervals = [];

function createAIOpponents(count = 3) {
    // Pick random names (non-repeating)
    const shuffledNames = [...AI_NAMES].sort(() => Math.random() - 0.5);
    // Pick cars that aren't the player's car
    const availableCars = GameEngine.CAR_EMOJIS.filter((_, i) => i !== selectedCarIndex);

    aiOpponents = [];
    for (let i = 0; i < count; i++) {
        aiOpponents.push({
            name: shuffledNames[i],
            car: availableCars[i % availableCars.length],
            color: AI_COLORS[i % AI_COLORS.length],
            position: 0,
            score: 0,
            // AI skill: how likely to answer correctly per question tick
            // Varies per difficulty to keep it competitive
            skill: 0.55 + Math.random() * 0.25, // 55-80% correct rate
            speed: 2 + Math.random() * 3,        // seconds to "answer" (2-5s)
            streak: 0
        });
    }
}

function startAIRacing() {
    stopAIRacing();

    const questionsPerRound = 10;
    const advancePerQ = 100 / questionsPerRound;

    aiOpponents.forEach((ai, idx) => {
        // Each AI "answers" a question at a semi-random interval
        const interval = setInterval(() => {
            if (answerLocked && GameEngine.getState().paused) return;

            // Simulate the AI answering
            const correct = Math.random() < ai.skill;
            if (correct) {
                ai.streak++;
                let pts = 100;
                if (ai.streak >= 5) pts = Math.round(pts * 2.0);
                else if (ai.streak >= 3) pts = Math.round(pts * 1.5);
                pts += Math.round(Math.random() * 50); // speed bonus
                ai.score += pts;
                ai.position = Math.min(100, ai.position + advancePerQ * (0.7 + Math.random() * 0.6));
            } else {
                ai.streak = 0;
                // AI doesn't move on wrong
            }
            updateMiniTrack();
            updateLeaderboardSidebar();
        }, ai.speed * 1000 + Math.random() * 1500);

        aiIntervals.push(interval);
    });
}

function stopAIRacing() {
    aiIntervals.forEach(iv => clearInterval(iv));
    aiIntervals = [];
}

function resetAIPositions() {
    aiOpponents.forEach(ai => {
        ai.position = 0;
    });
}

/* ---------- Login ---------- */

(function initLogin() {
    const picker = document.getElementById('car-picker');
    picker.innerHTML = GameEngine.CAR_EMOJIS.map((car, i) => `
    <div class="car-option ${i === 0 ? 'selected' : ''}" id="car-opt-${i}" onclick="pickCar(${i})">
      ${car}
    </div>
  `).join('');
})();

function pickCar(index) {
    document.querySelectorAll('.car-option').forEach(el => el.classList.remove('selected'));
    document.getElementById(`car-opt-${index}`).classList.add('selected');
    selectedCarIndex = index;
}

function pickLevel(el) {
    document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedLevel = parseInt(el.dataset.level);
}

/* ---------- Start Game ---------- */

function startChromebookGame() {
    const name = document.getElementById('player-name').value.trim() || 'Racer';

    GameEngine.resetGame();
    GameEngine.initSolo(name, selectedCarIndex);
    GameEngine.configure({
        level: selectedLevel,
        domain: 'all',
        timer: timerDuration,
        mode: 'chromebook',
        questionsPerRound: 10
    });

    // Create AI opponents
    createAIOpponents(3);

    // Set up header
    const team = GameEngine.getTeam(0);
    document.getElementById('hdr-car').textContent = team.car;
    document.getElementById('hdr-name').textContent = team.name;

    // Build mini track with all racers
    buildMiniTrackHTML();
    buildLeaderboardSidebar();
    buildPowerUps();

    // Switch screens
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';

    showCountdown(() => {
        currentRound = 1;
        startRound(currentRound);
    });
}

/* ---------- Mini Track Builder ---------- */

function buildMiniTrackHTML() {
    const player = GameEngine.getTeam(0);
    const trackContainer = document.getElementById('mini-track');

    // Build lanes for player + AI
    let lanesHTML = '';

    // Player lane (highlighted)
    lanesHTML += `
    <div class="race-lane" id="lane-player" style="position:relative; height:32px; background:rgba(57,255,20,0.08); border-radius:6px; margin-bottom:3px; border:1px solid rgba(57,255,20,0.2);">
      <div class="race-lane__markers" style="position:absolute; inset:0; background:repeating-linear-gradient(90deg, transparent 0, transparent 9.9%, rgba(255,255,255,0.04) 10%, rgba(255,255,255,0.04) 10.2%); pointer-events:none;"></div>
      <span class="race-lane__car" id="mini-car-player" style="position:absolute; top:50%; transform:translateY(-50%) scaleX(-1); font-size:1.2rem; left:2%; transition:left 0.8s cubic-bezier(0.34,1.56,0.64,1); filter:drop-shadow(0 0 6px ${player.color}); z-index:2;">${player.car}</span>
      <span style="position:absolute; right:6px; top:50%; transform:translateY(-50%); font-family:var(--font-score); font-size:0.6rem; color:var(--neon-green); opacity:0.8;" id="lane-name-player">YOU</span>
    </div>
  `;

    // AI lanes
    aiOpponents.forEach((ai, i) => {
        lanesHTML += `
      <div class="race-lane" id="lane-ai-${i}" style="position:relative; height:28px; background:rgba(255,255,255,0.02); border-radius:6px; margin-bottom:2px;">
        <div style="position:absolute; inset:0; background:repeating-linear-gradient(90deg, transparent 0, transparent 9.9%, rgba(255,255,255,0.03) 10%, rgba(255,255,255,0.03) 10.2%); pointer-events:none;"></div>
        <span class="race-lane__car" id="mini-car-ai-${i}" style="position:absolute; top:50%; transform:translateY(-50%) scaleX(-1); font-size:1rem; left:2%; transition:left 0.8s cubic-bezier(0.34,1.56,0.64,1); filter:drop-shadow(0 0 4px ${ai.color}); z-index:2;">${ai.car}</span>
        <span style="position:absolute; right:6px; top:50%; transform:translateY(-50%); font-family:var(--font-body); font-size:0.55rem; color:${ai.color}; opacity:0.7;">${ai.name}</span>
      </div>
    `;
    });

    // Finish line overlay
    lanesHTML += `<div style="position:absolute; right:0; top:0; bottom:0; width:16px; background:repeating-linear-gradient(45deg,#000 0,#000 3px,#fff 3px,#fff 6px); opacity:0.15; z-index:3;"></div>`;

    trackContainer.innerHTML = lanesHTML;
}

/* ---------- Leaderboard Sidebar ---------- */

function buildLeaderboardSidebar() {
    const sidebar = document.getElementById('race-leaderboard');
    if (!sidebar) return;
    updateLeaderboardSidebar();
}

function updateLeaderboardSidebar() {
    const sidebar = document.getElementById('race-leaderboard');
    if (!sidebar) return;

    const player = GameEngine.getTeam(0);
    const allRacers = [
        { name: player.name, car: player.car, score: player.score, color: player.color || '#39ff14', isPlayer: true, position: player.position }
    ];

    aiOpponents.forEach(ai => {
        allRacers.push({ name: ai.name, car: ai.car, score: ai.score, color: ai.color, isPlayer: false, position: ai.position });
    });

    // Sort by position descending
    allRacers.sort((a, b) => b.position - a.position);

    sidebar.innerHTML = allRacers.map((r, i) => {
        const posLabel = ['🥇', '🥈', '🥉', '4️⃣'][i] || `${i + 1}`;
        const highlight = r.isPlayer ? 'border:1px solid var(--neon-green); background:rgba(57,255,20,0.08);' : '';
        return `
      <div style="display:flex; align-items:center; gap:0.5rem; padding:0.35rem 0.5rem; border-radius:8px; margin-bottom:0.25rem; font-size:0.8rem; ${highlight}">
        <span style="font-size:0.9rem;">${posLabel}</span>
        <span style="font-size:1rem; display:inline-block; transform:scaleX(-1);">${r.car}</span>
        <span style="flex:1; font-family:var(--font-display); font-size:0.7rem; color:${r.color}; ${r.isPlayer ? 'color:var(--neon-green);' : ''}">${r.isPlayer ? 'YOU' : r.name}</span>
        <span style="font-family:var(--font-score); font-size:0.65rem; color:var(--neon-gold);">${r.score}</span>
      </div>
    `;
    }).join('');
}

/* ---------- Countdown ---------- */

function showCountdown(callback) {
    const overlay = document.getElementById('countdown-overlay');
    const numEl = document.getElementById('countdown-number');
    overlay.style.display = 'flex';

    let count = 3;
    numEl.textContent = count;
    numEl.style.color = '';
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
            if (callback) callback();
        }
    }, 800);
}

/* ---------- Round ---------- */

function startRound(roundNum) {
    currentRound = roundNum;
    const levelForRound = Math.min(selectedLevel + roundNum - 1, 4);
    GameEngine.configure({ level: levelForRound });
    GameEngine.loadRound(roundNum);

    const levelInfo = QuestionBank.getLevelInfo(levelForRound);
    document.getElementById('cb-round-badge').textContent = `Round ${roundNum} — ${levelInfo.label}`;

    // Reset positions for new round
    GameEngine.getTeam(0).position = 0;
    resetAIPositions();

    // Increase AI difficulty each round
    aiOpponents.forEach(ai => {
        ai.skill = Math.min(0.85, ai.skill + 0.05 * (roundNum - 1));
        ai.speed = Math.max(1.5, ai.speed - 0.3 * (roundNum - 1));
    });

    updateMiniTrack();
    startAIRacing();
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
    const st = GameEngine.getState();
    document.getElementById('cb-q-num').textContent = `Q ${st.questionIndex}/${st.questionQueue.length}`;

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
      <button class="answer-tile" id="ans-${i}" onclick="selectAnswer(${i})">
        <span class="answer-tile__letter">${text[0]}</span>
        <span>${text}</span>
      </button>
    `).join('');
    } else {
        grid.innerHTML = q.options.map((opt, i) => `
      <button class="answer-tile" id="ans-${i}" onclick="selectAnswer(${i})">
        <span class="answer-tile__letter">${ANSWER_LETTERS[i]}</span>
        <span>${opt}</span>
      </button>
    `).join('');
    }

    // Timer
    startVisualTimer(timerDuration);
    GameEngine.startTimer(timerDuration, onTimerTick, onTimerUp);
}

/* ---------- Timer ---------- */

function startVisualTimer(seconds) {
    const circle = document.getElementById('timer-circle');
    const circumference = 2 * Math.PI * 26; // r=26
    circle.setAttribute('stroke-dasharray', circumference);
    circle.setAttribute('stroke-dashoffset', 0);
    document.getElementById('timer-text').textContent = seconds;
    document.getElementById('timer-ring').className = 'timer-ring';
    document.getElementById('timer-text').className = 'timer-text';
}

function onTimerTick(remaining) {
    const circle = document.getElementById('timer-circle');
    const circumference = 2 * Math.PI * 26;
    const offset = circumference * (1 - remaining / timerDuration);
    circle.setAttribute('stroke-dashoffset', offset);
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
    }
}

function onTimerUp() {
    answerLocked = true;
    showToast("⏰ Time's up!", 'wrong');
    SoundEngine.wrong();
    GameEngine.timeoutPenalty(0);
    highlightCorrectAnswer();
    updateUI();
    setTimeout(showNextQuestion, 2200);
}

/* ---------- Answers ---------- */

function selectAnswer(index) {
    if (answerLocked) return;
    answerLocked = true;
    GameEngine.stopTimer();

    const q = GameEngine.getCurrentQuestion();
    const timeLeft = GameEngine.getTimerRemaining();

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

        const result = GameEngine.correctAnswer(0, timeLeft);
        showToast(`✅ +${result.points} pts!`, 'correct');
        ConfettiEngine.burst(window.innerWidth / 2, window.innerHeight / 3, 25);

        // Check if player overtook an AI
        const playerPos = GameEngine.getTeam(0).position;
        const overtaken = aiOpponents.filter(ai => ai.position > 0 && playerPos > ai.position && playerPos - ai.position < 15);
        if (overtaken.length > 0) {
            showToast(`🏎️ You overtook ${overtaken[0].name}!`, 'powerup');
        }

        if (result.streak === 3) {
            showToast('🔥 TURBO MODE! ×1.5 multiplier!', 'powerup');
            SoundEngine.turboBoost();
        } else if (result.streak === 5) {
            showToast('🔥🔥 NITRO BOOST! ×2.0 multiplier!', 'powerup');
            SoundEngine.nitro();
        }

        if (result.newBadges) {
            result.newBadges.forEach(b => showToast(`${b.icon} Badge: ${b.label}`, 'badge'));
        }

        if (result.gainedPowerUp) {
            showToast(`🎁 Power-up: ${getPowerUpEmoji(result.gainedPowerUp)}`, 'powerup');
            SoundEngine.powerup();
            buildPowerUps();
        }
    } else {
        tile.classList.add('wrong');
        SoundEngine.wrong();

        const result = GameEngine.wrongAnswer(0);
        if (result.shielded) {
            showToast('🛡️ Shield absorbed the hit!', 'powerup');
        } else {
            showToast('❌ Wrong! Streak reset.', 'wrong');
        }
        highlightCorrectAnswer();
    }

    // Disable tiles
    const count = q.type === 'tf' ? 2 : q.options.length;
    for (let i = 0; i < count; i++) {
        if (i !== index) document.getElementById(`ans-${i}`).classList.add('disabled');
    }

    updateUI();
    setTimeout(showNextQuestion, 2200);
}

function highlightCorrectAnswer() {
    const q = GameEngine.getCurrentQuestion();
    let correctIdx = q.type === 'tf' ? (q.answer === true ? 0 : 1) : q.answer;
    const el = document.getElementById(`ans-${correctIdx}`);
    if (el && !el.classList.contains('correct')) el.classList.add('correct');
}

/* ---------- UI Updates ---------- */

function updateUI() {
    const team = GameEngine.getTeam(0);
    document.getElementById('score-value').textContent = team.score;
    updateMiniTrack();
    updateStreak(team.streak);
    updateLeaderboardSidebar();

    // Check player position vs AI for race position display
    const playerPos = team.position;
    const ahead = aiOpponents.filter(ai => ai.position > playerPos).length;
    const posText = ['1st', '2nd', '3rd', '4th'][ahead] || `${ahead + 1}th`;
    const posEl = document.getElementById('race-position');
    if (posEl) {
        posEl.textContent = posText;
        posEl.style.color = ahead === 0 ? 'var(--neon-green)' : ahead <= 1 ? 'var(--neon-gold)' : 'var(--neon-orange)';
    }
}

function updateMiniTrack() {
    // Update player car
    const team = GameEngine.getTeam(0);
    const playerCar = document.getElementById('mini-car-player');
    if (playerCar) {
        playerCar.style.left = `${Math.max(2, Math.min(85, (team.position / 100) * 85))}%`;
    }

    // Update AI cars
    aiOpponents.forEach((ai, i) => {
        const aiCar = document.getElementById(`mini-car-ai-${i}`);
        if (aiCar) {
            aiCar.style.left = `${Math.max(2, Math.min(85, (ai.position / 100) * 85))}%`;
        }
    });
}

function updateStreak(streak) {
    const flames = document.getElementById('streak-flames');
    const count = document.getElementById('streak-count');
    if (streak >= 5) {
        flames.textContent = '🔥🔥🔥';
        count.textContent = `×${streak}`;
        count.style.color = 'var(--neon-pink)';
    } else if (streak >= 3) {
        flames.textContent = '🔥🔥';
        count.textContent = `×${streak}`;
        count.style.color = 'var(--neon-orange)';
    } else if (streak > 0) {
        flames.textContent = '🔥';
        count.textContent = `×${streak}`;
        count.style.color = 'var(--text-secondary)';
    } else {
        flames.textContent = '';
        count.textContent = '0';
        count.style.color = 'var(--text-secondary)';
    }
}

/* ---------- Power-Ups ---------- */

function buildPowerUps() {
    const team = GameEngine.getTeam(0);
    const pups = [
        { key: 'turbo', icon: '🚀', name: 'Turbo Boost (2× points)' },
        { key: 'shield', icon: '🛡️', name: 'Shield (block penalty)' },
        { key: 'eliminator', icon: '💣', name: '50/50 Eliminator' }
    ];

    document.getElementById('powerup-bar').innerHTML = pups.map(p => {
        const count = team.powerups[p.key] || 0;
        const cls = count > 0 ? 'available' : 'used';
        return `
      <button class="cb-powerup ${cls}" id="pup-${p.key}" onclick="usePowerUp('${p.key}')" ${count <= 0 ? 'disabled' : ''}>
        ${p.icon}
        <span class="cb-powerup__tip">${p.name}</span>
        ${count > 0 ? `<span class="powerup-item__count">${count}</span>` : ''}
      </button>
    `;
    }).join('');
}

function usePowerUp(key) {
    if (answerLocked && key !== 'shield') return;

    const result = GameEngine.usePowerUp(0, key);
    if (!result) {
        showToast('No power-ups left!', 'wrong');
        return;
    }

    SoundEngine.powerup();

    if (key === 'eliminator' && result.correctIndex !== undefined) {
        // Remove 2 wrong answers
        const q = GameEngine.getCurrentQuestion();
        if (q.type !== 'tf') {
            const wrongIndices = q.options
                .map((_, i) => i)
                .filter(i => i !== result.correctIndex);
            // Remove 2 random wrong ones
            const toRemove = wrongIndices.sort(() => Math.random() - 0.5).slice(0, 2);
            toRemove.forEach(i => {
                const el = document.getElementById(`ans-${i}`);
                if (el) { el.classList.add('disabled'); el.disabled = true; }
            });
        }
        showToast('💣 Two wrong answers eliminated!', 'powerup');
    } else if (key === 'turbo') {
        showToast('🚀 Turbo Boost active! 2× on next correct!', 'powerup');
    } else if (key === 'shield') {
        showToast('🛡️ Shield is up! One free miss!', 'powerup');
    }

    buildPowerUps();
}

/* ---------- Round End ---------- */

function endRound() {
    GameEngine.stopTimer();
    stopAIRacing();
    const team = GameEngine.getTeam(0);

    // Determine round placement
    const allRacers = [
        { name: 'You', score: team.score, position: team.position, isPlayer: true }
    ];
    aiOpponents.forEach(ai => allRacers.push({ name: ai.name, score: ai.score, position: ai.position, isPlayer: false }));
    allRacers.sort((a, b) => b.position - a.position);
    const playerPlace = allRacers.findIndex(r => r.isPlayer) + 1;
    const placeText = ['🥇 1st Place!', '🥈 2nd Place!', '🥉 3rd Place!', '4th Place'][playerPlace - 1] || `${playerPlace}th Place`;

    document.getElementById('round-score').textContent = team.score;
    document.getElementById('round-end-title').textContent =
        currentRound < maxRounds
            ? `🏁 Round ${currentRound} — ${placeText}`
            : `🏁 Final Round — ${placeText}`;

    // Show round standings
    const standingsHTML = allRacers.map((r, i) => {
        const medal = ['🥇', '🥈', '🥉', ''][i] || '';
        const style = r.isPlayer ? 'color:var(--neon-green); font-weight:bold;' : 'color:var(--text-secondary);';
        return `<div style="font-size:1rem; margin:0.3rem 0; ${style}">${medal} ${r.name} — ${r.score} pts</div>`;
    }).join('');
    document.getElementById('round-standings').innerHTML = standingsHTML;

    // Badges
    const badgeData = [
        { id: 'turbo_mode', icon: '🔥', label: 'Turbo Mode' },
        { id: 'nitro_boost', icon: '🔥🔥', label: 'NITRO Boost' },
        { id: 'speed_demon', icon: '⚡', label: 'Speed Demon' },
        { id: 'sharpshooter', icon: '🎯', label: 'Sharpshooter' },
        { id: 'perfect_round', icon: '🌟', label: 'Perfect Round' },
        { id: 'big_brain', icon: '🧠', label: 'Big Brain' }
    ];

    if (team.wrongCount === 0 && team.correctCount >= 10 && !team.badges.includes('perfect_round')) {
        team.badges.push('perfect_round');
    }
    if (team.correctCount >= GameEngine.getState().questionsPerRound && !team.badges.includes('big_brain')) {
        team.badges.push('big_brain');
    }
    // First place badge
    if (playerPlace === 1 && !team.badges.includes('race_winner')) {
        team.badges.push('race_winner');
    }

    document.getElementById('round-badges').innerHTML = badgeData.map(b => `
    <div class="badge ${team.badges.includes(b.id) ? 'earned' : ''}">
      <span class="badge__icon">${b.icon}</span>
      <span class="badge__label">${b.label}</span>
    </div>
  `).join('');

    const btn = document.getElementById('btn-next-round');
    if (currentRound >= maxRounds) {
        btn.textContent = '🏆 See Final Results';
        btn.onclick = finishGame;
    } else {
        btn.textContent = '🏁 Next Round!';
        btn.onclick = nextRound;
    }

    document.getElementById('round-end-screen').style.display = 'flex';
    SoundEngine.finishLine();
    if (playerPlace === 1) {
        ConfettiEngine.burst(window.innerWidth / 2, window.innerHeight / 3, 60);
    } else {
        ConfettiEngine.burst(window.innerWidth / 2, window.innerHeight / 3, 25);
    }
}

function nextRound() {
    document.getElementById('round-end-screen').style.display = 'none';
    currentRound++;
    GameEngine.getTeam(0).position = 0;
    resetAIPositions();
    updateMiniTrack();
    showCountdown(() => startRound(currentRound));
}

/* ---------- Game Over ---------- */

function finishGame() {
    document.getElementById('round-end-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    stopAIRacing();

    GameEngine.setGameOver();
    GameEngine.saveToLeaderboard();

    const team = GameEngine.getTeam(0);

    // Final standings
    const allRacers = [
        { name: 'You', score: team.score, isPlayer: true }
    ];
    aiOpponents.forEach(ai => allRacers.push({ name: ai.name, score: ai.score, car: ai.car, color: ai.color, isPlayer: false }));
    allRacers.sort((a, b) => b.score - a.score);
    const playerPlace = allRacers.findIndex(r => r.isPlayer) + 1;
    const placeText = ['🥇 1ST PLACE!', '🥈 2ND PLACE!', '🥉 3RD PLACE!', '4TH PLACE'][playerPlace - 1];

    document.getElementById('final-place').textContent = placeText;
    document.getElementById('final-place').style.color = playerPlace === 1 ? 'var(--neon-gold)' : playerPlace === 2 ? '#c0c0c0' : 'var(--neon-orange)';
    document.getElementById('final-score').textContent = `${team.score} pts`;

    // Final leaderboard
    document.getElementById('final-leaderboard').innerHTML = allRacers.map((r, i) => {
        const medal = ['🥇', '🥈', '🥉', ''][i] || '';
        const style = r.isPlayer
            ? 'color:var(--neon-green); font-weight:bold; background:rgba(57,255,20,0.1); border:1px solid rgba(57,255,20,0.3);'
            : 'color:var(--text-secondary);';
        return `<div style="padding:0.6rem 1rem; border-radius:8px; margin:0.4rem 0; font-size:1.1rem; ${style}">${medal} ${r.isPlayer ? 'YOU' : r.name} — <strong style="color:var(--neon-gold);">${r.score} pts</strong></div>`;
    }).join('');

    const badgeData = [
        { id: 'turbo_mode', icon: '🔥', label: 'Turbo Mode' },
        { id: 'nitro_boost', icon: '🔥🔥', label: 'NITRO Boost' },
        { id: 'speed_demon', icon: '⚡', label: 'Speed Demon' },
        { id: 'sharpshooter', icon: '🎯', label: 'Sharpshooter' },
        { id: 'perfect_round', icon: '🌟', label: 'Perfect Round' },
        { id: 'big_brain', icon: '🧠', label: 'Big Brain' },
        { id: 'race_winner', icon: '🏆', label: 'Race Winner' },
        { id: 'champion', icon: '👑', label: 'Champion' }
    ];

    if (!team.badges.includes('champion')) team.badges.push('champion');

    document.getElementById('final-badges').innerHTML = badgeData.map(b => `
    <div class="badge ${team.badges.includes(b.id) ? 'earned' : ''}">
      <span class="badge__icon">${b.icon}</span>
      <span class="badge__label">${b.label}</span>
    </div>
  `).join('');

    document.getElementById('final-stats').innerHTML = `
    <p>✅ Correct: ${team.correctCount} · ❌ Wrong: ${team.wrongCount}</p>
    <p>🔥 Best Streak: reached ${team.badges.includes('nitro_boost') ? 'NITRO' : team.badges.includes('turbo_mode') ? 'Turbo' : 'none'}</p>
    <p>🏅 Badges: ${team.badges.length} / ${badgeData.length}</p>
  `;

    document.getElementById('game-over-screen').style.display = 'flex';
    SoundEngine.finishLine();
    if (playerPlace === 1) {
        setTimeout(() => ConfettiEngine.victory(), 500);
        setTimeout(() => ConfettiEngine.victory(), 1500);
        setTimeout(() => ConfettiEngine.victory(), 2500);
    } else {
        setTimeout(() => ConfettiEngine.burst(window.innerWidth / 2, window.innerHeight / 3, 30), 500);
    }
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

function getPowerUpEmoji(type) {
    const map = { turbo: '🚀 Turbo Boost', freeze: '❄️ Freeze', shield: '🛡️ Shield', eliminator: '💣 Eliminator', draft: '🌀 Draft' };
    return map[type] || type;
}
