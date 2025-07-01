// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Your existing code...

    document.body.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.log(`Error attempting fullscreen: ${err.message}`);
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const teamName1 = document.querySelector('#team1 .team-name');
    const teamName2 = document.querySelector('#team2 .team-name');

    // Load saved names
    teamName1.textContent = localStorage.getItem('team1Name') || 'TEAM 1';
    teamName2.textContent = localStorage.getItem('team2Name') || 'TEAM 2';

    // Save on change
    teamName1.addEventListener('input', () => {
        localStorage.setItem('team1Name', teamName1.textContent.trim());
    });

    teamName2.addEventListener('input', () => {
        localStorage.setItem('team2Name', teamName2.textContent.trim());
    });
  
  function addTouchControls(element, onAdd, onSubtract) {
    let timer;

    element.addEventListener('touchstart', () => {
        timer = setTimeout(() => {
            onSubtract(); // Long press subtracts
        }, 500); // 500ms threshold
    });

    element.addEventListener('touchend', () => {
        if (timer) {
            clearTimeout(timer);
            onAdd(); // Short tap adds
        }
    });
}
  
    const period = document.getElementById('period');
    const fouls1 = document.getElementById('fouls1');
    const fouls2 = document.getElementById('fouls2');
    const mainClock = document.getElementById('mainClock');
    let countdownInterval;
    let timeRemaining = 10 * 60; // 10 minutes in seconds
    let isRunning = false;

    team1.addEventListener('click', () => updateScore(team1, 1));
team1.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    updateScore(team1, -1);
});

team2.addEventListener('click', () => updateScore(team2, 1));
team2.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    updateScore(team2, -1);
});
   period.addEventListener('click', () => updatePeriod(1));
period.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    updatePeriod(-1);
});
    fouls1.addEventListener('click', () => updateFouls(fouls1));
    fouls2.addEventListener('click', () => updateFouls(fouls2));
    mainClock.addEventListener('click', toggleClock);

    function updateScore(team, delta) {
    const scoreDiv = team.querySelector('.score');
    let currentScore = parseInt(scoreDiv.textContent);
    currentScore = Math.max(0, currentScore + delta); // Prevent negative
    scoreDiv.textContent = currentScore < 10 ? '0' + currentScore : currentScore;
}

    function updatePeriod(delta) {
    const periodNumDiv = document.querySelector('.period-num');
    let currentPeriod = parseInt(periodNumDiv.textContent);
    currentPeriod = (currentPeriod + delta + 6) % 6; // Keep it between 0–5
    periodNumDiv.textContent = currentPeriod;
}

    function updateFouls(fouls) {
        const foulsScoreDiv = fouls.querySelector('.fouls-score');
        let currentFouls = parseInt(foulsScoreDiv.textContent);
        currentFouls = (currentFouls + 1) % 11; // Increment fouls and reset to 0 after 10
        foulsScoreDiv.textContent = currentFouls;
    }

    function toggleClock() {
        if (isRunning) {
            clearInterval(countdownInterval);
        } else {
            countdownInterval = setInterval(updateClock, 1000);
        }
        isRunning = !isRunning;
    }

    function updateClock() {
        if (timeRemaining > 0) {
            timeRemaining -= 1;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            mainClock.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            clearInterval(countdownInterval);
            isRunning = false;
        }
    }
});