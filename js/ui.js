class PreseoUI {
  constructor(config) {
    this.config = config;
    this.init();
  }

  init() {
    try {
      this.setupEmailPopup();
      if (this.config.debug) console.log('✓ UI initialized');
    } catch (error) {
      console.error('❌ UI init error:', error.message);
    }
  }

  setupEmailPopup() {
    try {
      window.closePopup = () => {
        const popup = document.getElementById('emailPopup');
        if (popup) popup.classList.add('hide');
      };

      window.submitPopupEmail = () => {
        const email = document.getElementById('popupEmail').value.trim();
        if (email && email.includes('@')) {
          this.sendEmailToSheet(email);
        }
        window.closePopup();
      };

    } catch (error) {
      console.error('❌ Popup setup error:', error.message);
    }
  }

  async sendEmailToSheet(email) {
    try {
      const emailUrl = this.config.api.sheetbest + this.config.api.emailsEndpoint;
      const payload = {
        Email: email,
        Timestamp: new Date().toLocaleString()
      };

      const response = await fetch(emailUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (this.config.debug) console.log('✓ Email saved');

    } catch (error) {
      console.error('❌ Email save error:', error.message);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG !== 'undefined') {
    window.uiInstance = new PreseoUI(CONFIG);
  }
});
