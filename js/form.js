class PreseoForm {
  constructor(config) {
    this.config = config;
    this.selectedPromoter = null;
    this.selectedGender = null;
    this.debug = config.debug;
    this.init();
  }

  init() {
    try {
      this.buildPromoterGrid();
      this.attachListeners();
      if (this.debug) console.log('✓ Form initialized');
    } catch (error) {
      console.error('❌ Form init error:', error.message);
    }
  }

  buildPromoterGrid() {
    try {
      const grid = document.getElementById('promoterGrid');
      if (!grid) throw new Error('promoterGrid element not found');

      grid.innerHTML = '';
      
      this.config.promoters.forEach((p, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'promoter-btn';
        btn.dataset.index = i;
        btn.onclick = () => this.selectPromoter(i);
        
        const idStr = String(i + 1).padStart(2, '0');
        btn.innerHTML = `
          <span class="promoter-id">${idStr}</span>
          <span class="check">✓</span>
          <div class="promoter-name">${p.name}</div>
          <div class="promoter-role">${p.role.toLowerCase()}</div>
        `;
        grid.appendChild(btn);
      });
    } catch (error) {
      console.error('❌ Grid build error:', error.message);
    }
  }

  selectPromoter(i) {
    try {
      this.selectedPromoter = i;
      document.querySelectorAll('.promoter-btn').forEach((b, idx) => {
        b.classList.toggle('active', idx === i);
      });
      const p = this.config.promoters[i];
      const selectedName = document.getElementById('selectedName');
      const selectedBanner = document.getElementById('selectedBanner');
      const promoterErr = document.getElementById('promoterErr');
      
      if (selectedName) selectedName.textContent = p.name;
      if (selectedBanner) selectedBanner.classList.add('show');
      if (promoterErr) promoterErr.classList.remove('show');
    } catch (error) {
      console.error('❌ Promoter select error:', error.message);
    }
  }

  attachListeners() {
    try {
      window.selectGender = (g) => this.selectGender(g);
      window.submitForm = () => this.submitForm();
    } catch (error) {
      console.error('❌ Listener attach error:', error.message);
    }
  }

  selectGender(g) {
    try {
      this.selectedGender = g;
      document.querySelectorAll('.gender-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.gender === g);
      });
      const generoErr = document.getElementById('generoErr');
      if (generoErr) generoErr.classList.remove('show');
    } catch (error) {
      console.error('❌ Gender select error:', error.message);
    }
  }

  async submitForm() {
    try {
      const nombre = document.getElementById('nombre').value.trim();
      const apellido = document.getElementById('apellido').value.trim();
      const cedula = document.getElementById('cedula').value.trim();

      if (!this.validateForm(nombre, apellido, cedula)) return;

      const btn = document.getElementById('submitBtn');
      if (btn) {
        btn.disabled = true;
        const btnText = document.getElementById('submitBtnText');
        if (btnText) btnText.textContent = 'Enviando...';
      }

      const promoter = this.config.promoters[this.selectedPromoter];
      const payload = {
        Timestamp: new Date().toLocaleString(),
        nombre: String(nombre),
        Apellido: String(apellido),
        Cedula: String(cedula),
        Genero: String(this.selectedGender),
        Promotor: String(promoter.name)
      };

      await this.sendToSheet(payload);
      this.showSuccess(nombre, apellido, cedula, promoter.name);

    } catch (error) {
      console.error('❌ Form submit error:', error.message);
      alert('Hubo un error. Intenta de nuevo.');
      const btn = document.getElementById('submitBtn');
      if (btn) {
        btn.disabled = false;
        const btnText = document.getElementById('submitBtnText');
        if (btnText) btnText.textContent = 'Confirmar Asistencia';
      }
    }
  }

  validateForm(nombre, apellido, cedula) {
    let valid = true;

    const clearError = (id) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('show', 'error');
    };
    const showError = (id) => {
      const el = document.getElementById(id);
      if (el) el.classList.add('show');
    };
    const addInputError = (id) => {
      const el = document.getElementById(id);
      if (el) el.classList.add('error');
    };

    if (this.selectedPromoter === null) {
      showError('promoterErr');
      valid = false;
    }

    if (!nombre) {
      addInputError('nombre');
      showError('nombreErr');
      valid = false;
    } else {
      clearError('nombreErr');
      document.getElementById('nombre').classList.remove('error');
    }

    if (!apellido) {
      addInputError('apellido');
      showError('apellidoErr');
      valid = false;
    } else {
      clearError('apellidoErr');
      document.getElementById('apellido').classList.remove('error');
    }

    if (!cedula || cedula.length < 6 || !/^\d+$/.test(cedula)) {
      addInputError('cedula');
      showError('cedulaErr');
      valid = false;
    } else {
      clearError('cedulaErr');
      document.getElementById('cedula').classList.remove('error');
    }

    if (!this.selectedGender) {
      showError('generoErr');
      valid = false;
    }

    return valid;
  }

  async sendToSheet(payload) {
    try {
      const response = await fetch(this.config.api.sheetbest, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (this.debug) console.log('✓ Data sent to sheet');

    } catch (error) {
      console.error('❌ Sheet send error:', error.message);
    }
  }

  showSuccess(nombre, apellido, cedula, promotorName) {
    try {
      const coverText = this.selectedGender === 'mujer' ? 'Free Cover ✨' : '$12 Cover';
      const ticketNum = 'PRS-' + Math.floor(Math.random() * 9000 + 1000);

      const successCard = document.getElementById('successCard');
      if (successCard) {
        successCard.innerHTML = `
          <div class="success-card-header">
            <span>TICKET <strong>${ticketNum}</strong></span>
            <span>25·JUN·2026</span>
          </div>
          <div class="success-row">
            <span class="success-row-label">Nombre</span>
            <span class="success-row-val">${nombre} ${apellido}</span>
          </div>
          <div class="success-row">
            <span class="success-row-label">Cédula</span>
            <span class="success-row-val">${cedula}</span>
          </div>
          <div class="success-row">
            <span class="success-row-label">Promotor</span>
            <span class="success-row-val" style="color:var(--violet-bright)">${promotorName}</span>
          </div>
          <div class="success-row">
            <span class="success-row-label">Cover</span>
            <span class="success-row-val" style="color:var(--cyan)">${coverText}</span>
          </div>
        `;
      }

      const formArea = document.getElementById('formArea');
      const successScreen = document.getElementById('successScreen');
      if (formArea) formArea.classList.add('hide');
      if (successScreen) successScreen.classList.add('show');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('❌ Success screen error:', error.message);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CONFIG !== 'undefined') {
    window.formInstance = new PreseoForm(CONFIG);
  }
});
