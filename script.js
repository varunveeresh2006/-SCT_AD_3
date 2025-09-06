class Stopwatch {
    constructor() {
        this.time = 0;
        this.isRunning = false;
        this.interval = null;
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.minutesElement = document.querySelector('.minutes');
        this.secondsElement = document.querySelector('.seconds');
        this.millisecondsElement = document.querySelector('.milliseconds');
        this.startPauseBtn = document.getElementById('startPauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.statusText = document.querySelector('.status-text');
        this.playIcon = document.querySelector('.play-icon');
        this.pauseIcon = document.querySelector('.pause-icon');
    }
    
    bindEvents() {
        this.startPauseBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.reset());
    }
    
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return {
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
            milliseconds: ms.toString().padStart(2, '0')
        };
    }
    
    updateDisplay() {
        const { minutes, seconds, milliseconds } = this.formatTime(this.time);
        
        this.minutesElement.textContent = minutes;
        this.secondsElement.textContent = seconds;
        this.millisecondsElement.textContent = milliseconds;
        
        // Update reset button state
        this.resetBtn.disabled = this.time === 0;
        
        // Update status text
        if (this.isRunning) {
            this.statusText.textContent = 'Timing in progress...';
        } else if (this.time === 0) {
            this.statusText.textContent = 'Ready to start';
        } else {
            this.statusText.textContent = 'Timer paused';
        }
    }
    
    toggleTimer() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }
    
    start() {
        this.isRunning = true;
        this.interval = setInterval(() => {
            this.time += 10;
            this.updateDisplay();
        }, 10);
        
        // Update button appearance
        this.startPauseBtn.classList.remove('start-btn');
        this.startPauseBtn.classList.add('pause-btn');
        this.playIcon.classList.add('hidden');
        this.pauseIcon.classList.remove('hidden');
        
        this.updateDisplay();
    }
    
    pause() {
        this.isRunning = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        
        // Update button appearance
        this.startPauseBtn.classList.remove('pause-btn');
        this.startPauseBtn.classList.add('start-btn');
        this.playIcon.classList.remove('hidden');
        this.pauseIcon.classList.add('hidden');
        
        this.updateDisplay();
    }
    
    reset() {
        this.pause();
        this.time = 0;
        this.updateDisplay();
    }
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});