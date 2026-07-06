:root {
  /* Paleta */
  --color-bg: #FAFAF8;
  --color-surface: #FFFFFF;
  --color-ink: #1C1B1A;
  --color-ink-soft: #55524C;
  --color-border: #E4E1D8;
  --color-primary: #2F6F6B;      /* teal profundo — acción principal */
  --color-primary-soft: #E4F0EE;
  --color-accent: #C97A4A;       /* terracota apagado — resaltes puntuales */
  --color-danger: #B3443C;
  --color-danger-soft: #F6E7E5;
  --color-success: #3F7D5C;
  --color-success-soft: #E7F1EB;
  --color-warning: #A8791E;
  --color-warning-soft: #F5EEDD;

  /* Tipografía */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;

  --radius-sm: 6px;
  --radius-md: 10px;
  --shadow-card: 0 1px 2px rgba(28, 27, 26, 0.06), 0 4px 12px rgba(28, 27, 26, 0.05);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.5;
}

#root {
  min-height: 100vh;
}

h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.01em;
}

button {
  font-family: var(--font-body);
  cursor: pointer;
}

input, select, textarea {
  font-family: var(--font-body);
  font-size: 14px;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

/* ---------- Layout ---------- */
.app-shell {
  display: grid;
  grid-template-columns: 220px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: var(--color-ink);
  color: #EFEDE7;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar__brand {
  font-family: var(--font-display);
  font-size: 20px;
  color: #fff;
  margin-bottom: 28px;
  padding: 0 8px;
}

.sidebar__link {
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: #C9C6BE;
  font-size: 14px;
  font-weight: 500;
}

.sidebar__link:hover {
  background: rgba(255,255,255,0.06);
  color: #fff;
}

.sidebar__link--active {
  background: var(--color-primary);
  color: #fff;
}

.main {
  padding: 28px 32px;
  overflow-y: auto;
}

.main__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

/* ---------- Componentes comunes ---------- */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}

.btn {
  border: none;
  border-radius: var(--radius-sm);
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 600;
  transition: opacity 0.15s ease;
}

.btn:hover { opacity: 0.9; }

.btn--primary { background: var(--color-primary); color: #fff; }
.btn--danger { background: var(--color-danger); color: #fff; }
.btn--ghost { background: transparent; color: var(--color-ink-soft); border: 1px solid var(--color-border); }

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13.5px;
}

.table th {
  text-align: left;
  color: var(--color-ink-soft);
  font-weight: 600;
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-border);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.table td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--color-border);
}

.table tr:hover td { background: #FBFAF7; }

.badge {
  display: inline-block;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(28,27,26,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 24px;
  width: 380px;
  box-shadow: var(--shadow-card);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 14px;
}

.field label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--color-ink-soft);
}

.field input, .field select {
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #fff;
}

.field input:focus, .field select:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 1px;
}

.error-text {
  color: var(--color-danger);
  font-size: 13px;
  margin-top: 8px;
}

.login-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
}
