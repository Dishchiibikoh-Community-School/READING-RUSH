/* ============================================
   READING RUSH — Core Game Engine
   Handles timer, scoring, streaks, power-ups,
   race-track progress, and localStorage leaderboard.
   ============================================ */

const GameEngine = (() => {

    /* ---------- State ---------- */
    let state = {
        teams: [],           // [{name, color, car, score, streak, position, powerups:{}, badges:[]}]
        currentQuestion: null,
        questionIndex: 0,
        questionQueue: [],
        timerSeconds: 15,
        timerRemaining: 15,
        timerInterval: null,
        round: 1,
        totalRounds: 4,
        questionsPerRound: 10,
        activeTeamIndex: -1,
        buzzedTeamIndex: -1,
        paused: false,
        gameOver: false,
        mode: 'viewboard',  // 'viewboard' | 'chromebook'
        settings: {
            level: 1,
            domain: 'all',
            timerDuration: 15
        },
        onTick: null,
        onTimeUp: null,
        onScoreChange: null,
        onStreakChange: null,
        onPositionChange: null,
        onPowerUp: null,
        onBadge: null,
        onRoundEnd: null,
        onGameEnd: null
    };

    const CAR_EMOJIS = ['🏎️', '🚗', '🏁', '🚙', '🚕', '🛻'];
    const TEAM_COLORS = ['#39ff14', '#00f0ff', '#ff2e63', '#ffd700', '#b14eff', '#ff6f00'];

    /* ---------- Initialization ---------- */

    function initTeams(teamNames) {
        state.teams = teamNames.map((name, i) => ({
            name: name || `Team ${i + 1}`,
            color: TEAM_COLORS[i % TEAM_COLORS.length],
            car: CAR_EMOJIS[i % CAR_EMOJIS.length],
            score: 0,
            streak: 0,
            position: 0,   // 0–100 %
            correctCount: 0,
            wrongCount: 0,
            powerups: { turbo: 1, freeze: 1, shield: 1, eliminator: 1, draft: 1 },
            badges: [],
            frozen: false
        }));
    }

    function initSolo(playerName, carIndex = 0) {
        state.teams = [{
            name: playerName || 'Player',
            color: TEAM_COLORS[carIndex % TEAM_COLORS.length],
            car: CAR_EMOJIS[carIndex % CAR_EMOJIS.length],
            score: 0,
            streak: 0,
            position: 0,
            correctCount: 0,
            wrongCount: 0,
            powerups: { turbo: 1, freeze: 0, shield: 1, eliminator: 1, draft: 0 },
            badges: [],
            frozen: false
        }];
    }

    function configure(opts = {}) {
        if (opts.level) state.settings.level = opts.level;
        if (opts.domain) state.settings.domain = opts.domain;
        if (opts.timer) state.settings.timerDuration = opts.timer;
        if (opts.questionsPerRound) state.questionsPerRound = opts.questionsPerRound;
        if (opts.totalRounds) state.totalRounds = opts.totalRounds;
        if (opts.mode) state.mode = opts.mode;
        state.timerSeconds = state.settings.timerDuration;
    }

    /* ---------- Question Loading ---------- */

    function loadRound(roundNum) {
        state.round = roundNum || state.round;
        const level = Math.min(state.round, 4);
        const opts = { level, count: state.questionsPerRound };
        if (state.settings.domain !== 'all') opts.domain = state.settings.domain;
        state.questionQueue = QuestionBank.getQuestions(opts);
        if (state.questionQueue.length < state.questionsPerRound) {
            // Fill with any level questions
            const extra = QuestionBank.getQuestions({ count: state.questionsPerRound - state.questionQueue.length });
            state.questionQueue.push(...extra);
        }
        state.questionIndex = 0;
    }

    function loadPhotoFinish() {
        state.questionQueue = QuestionBank.getPhotoFinishQuestions(10);
        state.questionIndex = 0;
    }

    function nextQuestion() {
        if (state.questionIndex >= state.questionQueue.length) {
            return null;
        }
        state.currentQuestion = state.questionQueue[state.questionIndex];
        state.questionIndex++;
        state.buzzedTeamIndex = -1;
        return state.currentQuestion;
    }

    function hasMoreQuestions() {
        return state.questionIndex < state.questionQueue.length;
    }

    /* ---------- Timer ---------- */

    function startTimer(duration, onTick, onTimeUp) {
        stopTimer();
        state.timerRemaining = duration || state.timerSeconds;
        state.onTick = onTick;
        state.onTimeUp = onTimeUp;
        state.timerInterval = setInterval(() => {
            if (state.paused) return;
            state.timerRemaining--;
            if (state.onTick) state.onTick(state.timerRemaining);
            if (state.timerRemaining <= 0) {
                stopTimer();
                if (state.onTimeUp) state.onTimeUp();
            }
        }, 1000);
    }

    function stopTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    function pauseTimer() { state.paused = true; }
    function resumeTimer() { state.paused = false; }

    function freezeTimer(seconds) {
        pauseTimer();
        setTimeout(() => resumeTimer(), seconds * 1000);
    }

    /* ---------- Scoring ---------- */

    function calculatePoints(teamIndex, timeLeft) {
        const team = state.teams[teamIndex];
        if (!team) return 0;

        let base = 100;

        // Speed bonus
        if (timeLeft > (state.timerSeconds - 5)) base += 50;

        // Streak multiplier
        if (team.streak >= 5) {
            base = Math.round(base * 2.0);
        } else if (team.streak >= 3) {
            base = Math.round(base * 1.5);
        }

        // Turbo power-up active
        if (team._turboActive) {
            base *= 2;
            team._turboActive = false;
        }

        return base;
    }

    function correctAnswer(teamIndex, timeLeft) {
        const team = state.teams[teamIndex];
        if (!team) return {};

        const points = calculatePoints(teamIndex, timeLeft);
        team.score += points;
        team.streak++;
        team.correctCount++;

        // Position advancement
        const advance = Math.min(100, team.position + (100 / state.questionsPerRound));
        team.position = Math.round(advance * 10) / 10;

        // Badge checks
        const newBadges = [];
        if (team.streak === 3 && !team.badges.includes('turbo_mode')) {
            team.badges.push('turbo_mode');
            newBadges.push({ id: 'turbo_mode', icon: '🔥', label: 'Turbo Mode!' });
        }
        if (team.streak === 5 && !team.badges.includes('nitro_boost')) {
            team.badges.push('nitro_boost');
            newBadges.push({ id: 'nitro_boost', icon: '🔥🔥', label: 'NITRO BOOST!' });
        }
        if (timeLeft > (state.timerSeconds - 3) && !team.badges.includes('speed_demon')) {
            team.badges.push('speed_demon');
            newBadges.push({ id: 'speed_demon', icon: '⚡', label: 'Speed Demon!' });
        }
        if (team.streak === 10 && !team.badges.includes('sharpshooter')) {
            team.badges.push('sharpshooter');
            newBadges.push({ id: 'sharpshooter', icon: '🎯', label: 'Sharpshooter!' });
        }

        // Power-up reward: gain a random power-up every 4 correct
        let gainedPowerUp = null;
        if (team.correctCount % 4 === 0) {
            const pups = ['turbo', 'shield', 'eliminator'];
            if (state.mode === 'viewboard') pups.push('freeze', 'draft');
            const chosen = pups[Math.floor(Math.random() * pups.length)];
            team.powerups[chosen] = (team.powerups[chosen] || 0) + 1;
            gainedPowerUp = chosen;
        }

        return { points, streak: team.streak, newBadges, gainedPowerUp, position: team.position };
    }

    function wrongAnswer(teamIndex) {
        const team = state.teams[teamIndex];
        if (!team) return {};

        // Shield check
        if (team._shieldActive) {
            team._shieldActive = false;
            return { shielded: true, streak: team.streak, position: team.position };
        }

        team.streak = 0;
        team.wrongCount++;
        return { shielded: false, streak: 0, position: team.position };
    }

    function timeoutPenalty(teamIndex) {
        const team = state.teams[teamIndex];
        if (!team) return;
        team.score = Math.max(0, team.score - 25);
        team.streak = 0;
    }

    /* ---------- Power-Ups ---------- */

    function usePowerUp(teamIndex, powerup) {
        const team = state.teams[teamIndex];
        if (!team || !team.powerups[powerup] || team.powerups[powerup] <= 0) return false;

        team.powerups[powerup]--;

        switch (powerup) {
            case 'turbo':
                team._turboActive = true;
                break;
            case 'shield':
                team._shieldActive = true;
                break;
            case 'freeze':
                // Freeze the leading team (not self)
                const leader = getLeaderIndex(teamIndex);
                if (leader >= 0) state.teams[leader].frozen = true;
                break;
            case 'eliminator':
                // Returns info, UI handles display
                return { type: 'eliminator', correctIndex: state.currentQuestion?.answer };
            case 'draft':
                // Steal 50 pts from nearest opponent
                const nearest = getNearestOpponent(teamIndex);
                if (nearest >= 0) {
                    const stolen = Math.min(50, state.teams[nearest].score);
                    state.teams[nearest].score -= stolen;
                    team.score += stolen;
                }
                break;
        }
        return { type: powerup, success: true };
    }

    function getLeaderIndex(excludeIndex) {
        let max = -1, idx = -1;
        state.teams.forEach((t, i) => {
            if (i !== excludeIndex && t.score > max) { max = t.score; idx = i; }
        });
        return idx;
    }

    function getNearestOpponent(teamIndex) {
        const myScore = state.teams[teamIndex].score;
        let minDiff = Infinity, idx = -1;
        state.teams.forEach((t, i) => {
            if (i !== teamIndex) {
                const diff = Math.abs(t.score - myScore);
                if (diff < minDiff) { minDiff = diff; idx = i; }
            }
        });
        return idx;
    }

    /* ---------- Buzzer (ViewBoard) ---------- */

    function buzzIn(teamIndex) {
        if (state.buzzedTeamIndex >= 0) return false; // someone already buzzed
        if (state.teams[teamIndex]?.frozen) {
            state.teams[teamIndex].frozen = false;
            return false; // frozen, skip
        }
        state.buzzedTeamIndex = teamIndex;
        return true;
    }

    /* ---------- Rankings ---------- */

    function getRankings() {
        return [...state.teams]
            .map((t, i) => ({ ...t, index: i }))
            .sort((a, b) => b.score - a.score);
    }

    function getTopTwo() {
        const ranked = getRankings();
        return ranked.slice(0, 2);
    }

    /* ---------- Leaderboard (localStorage) ---------- */

    function saveToLeaderboard() {
        try {
            const key = 'readingRush_leaderboard';
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            const entry = {
                date: new Date().toISOString(),
                mode: state.mode,
                teams: state.teams.map(t => ({ name: t.name, score: t.score, badges: t.badges }))
            };
            existing.unshift(entry);
            localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
        } catch (e) { /* silent */ }
    }

    function getLeaderboard() {
        try {
            return JSON.parse(localStorage.getItem('readingRush_leaderboard') || '[]');
        } catch { return []; }
    }

    function clearLeaderboard() {
        localStorage.removeItem('readingRush_leaderboard');
    }

    /* ---------- Reset ---------- */

    function resetGame() {
        stopTimer();
        state.teams = [];
        state.currentQuestion = null;
        state.questionIndex = 0;
        state.questionQueue = [];
        state.round = 1;
        state.activeTeamIndex = -1;
        state.buzzedTeamIndex = -1;
        state.paused = false;
        state.gameOver = false;
    }

    function resetScores() {
        state.teams.forEach(t => {
            t.score = 0;
            t.streak = 0;
            t.position = 0;
            t.correctCount = 0;
            t.wrongCount = 0;
            t.badges = [];
            t.powerups = { turbo: 1, freeze: 1, shield: 1, eliminator: 1, draft: 1 };
            t.frozen = false;
        });
    }

    /* ---------- Getters ---------- */

    function getState() { return state; }
    function getTeam(i) { return state.teams[i]; }
    function getTeams() { return state.teams; }
    function getCurrentQuestion() { return state.currentQuestion; }
    function getRound() { return state.round; }
    function getTimerRemaining() { return state.timerRemaining; }
    function isGameOver() { return state.gameOver; }
    function setGameOver() { state.gameOver = true; }

    return {
        initTeams,
        initSolo,
        configure,
        loadRound,
        loadPhotoFinish,
        nextQuestion,
        hasMoreQuestions,
        startTimer,
        stopTimer,
        pauseTimer,
        resumeTimer,
        freezeTimer,
        correctAnswer,
        wrongAnswer,
        timeoutPenalty,
        usePowerUp,
        buzzIn,
        getRankings,
        getTopTwo,
        saveToLeaderboard,
        getLeaderboard,
        clearLeaderboard,
        resetGame,
        resetScores,
        getState,
        getTeam,
        getTeams,
        getCurrentQuestion,
        getRound,
        getTimerRemaining,
        isGameOver,
        setGameOver,
        CAR_EMOJIS,
        TEAM_COLORS
    };
})();
