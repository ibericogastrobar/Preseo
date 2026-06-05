class Countdown {
  constructor(config) {
    this.eventDate = config.event.date;
    this.pauseAfter = config.event.pauseAfter;
    this.debug = config.debug;
    this.isPaused = false;
    this.init();
  }

  init() {
    try {
      this.checkMode();
      this.startTimer();
      if (this.debug) console.log('✓ Countdown initialized');
    } catch (error) {
      console.error('❌ Countdown error:', error.message);
    }
  }

  checkMode() {
    const now = new Date();
    if (now >= this.pauseAfter) {
      this.isPaused = true;
      const formless = document.getElementById('formless');
      const pausedScreen = document.getElementById('pausedScreen');
      if (formless) formless.classList.add('hide');
      if (pausedScreen) pausedScreen.classList.add('show');
    }
  }

  startTimer() {
    if (this.isPaused) return;
    this.updateDisplay();
    setInterval(() => this.updateDisplay(), 1000);
  }

  updateDisplay() {
    try {
      const now = new Date();
      const diff = this.eventDate - now;

      if (diff <= 0) {
        this.showZero();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      const pad = n => String(n).padStart(2, '0');

      const cdDays = document.getElementById('cd-days');
      const cdHours = document.getElementById('cd-hours');
      const cdMins = document.getElementById('cd-mins');
      const cdSecs = document.getElementById('cd-secs');

      if (cdDays) cdDays.textContent = pad(days);
      if (cdHours) cdHours.textContent = pad(hours);
      if (cdMins) cdMins.textContent = pad(mins);
      if (cdSecs) cdSecs.textContent = pad(secs);

    } catch (error) {
      console.error('❌ Countdown update error:', error.message);
    }
  }

  showZero() {
    const ids = ['cd-days', 'cd-hours', 'cd-mins', 'cd-secs'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG !== 'undefined') {
    window.countdownInstance = new Countdown(CONFIG);
  }
});
