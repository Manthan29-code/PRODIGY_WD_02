let timer = null;
let startTime = 0;
let elapsedTime = 0;
let running = false;
let laps = [];

const timerDisplay = document.getElementById('timer');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function updateDisplay() {
    const sec = Math.floor((elapsedTime / 1000) % 60);
    const min = Math.floor((elapsedTime / 60000) % 60);
    const hr = Math.floor((elapsedTime / 3600000));
    timerDisplay.textContent =
        `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function start() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startPauseBtn.textContent = 'Pause';
    }
}

function pause() {
    if (running) {
        running = false;
        clearInterval(timer);
        startPauseBtn.textContent = 'Start';
    }
}

function reset() {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    laps = [];
    renderLaps();
    startPauseBtn.textContent = 'Start';
}

function lap() {
    if (running) {
        laps.unshift(timerDisplay.textContent);
        renderLaps();
    }
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lapTime, idx) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${laps.length - idx}: ${lapTime}`;
        lapsList.appendChild(li);
    });
}

startPauseBtn.addEventListener('click', () => {
    running ? pause() : start();
});
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initialize display
updateDisplay();
