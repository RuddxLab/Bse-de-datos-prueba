.calendar {
  display: grid;
  grid-template-columns: 56px 1fr;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.calendar__gutter {
  border-right: 1px solid var(--color-border);
}

.calendar__gutter-cell {
  height: 60px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-ink-soft);
  text-align: right;
  padding-right: 8px;
  transform: translateY(-6px);
}

.calendar__days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar__day-header {
  padding: 10px 8px;
  border-bottom: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
  text-align: center;
}

.calendar__day-header--today {
  background: var(--color-primary-soft);
}

.calendar__day-name {
  font-size: 11px;
  color: var(--color-ink-soft);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.calendar__day-number {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
}

.calendar__day-column {
  position: relative;
  border-left: 1px solid var(--color-border);
}

.calendar__hour-line {
  height: 60px;
  border-bottom: 1px solid var(--color-border);
}

.calendar__hour-line:hover {
  background: #FCFBF8;
  cursor: pointer;
}

.appointment-block {
  position: absolute;
  left: 3px;
  right: 3px;
  border-radius: var(--radius-sm);
  padding: 4px 7px;
  font-size: 11.5px;
  line-height: 1.3;
  overflow: hidden;
  border-left: 3px solid transparent;
  cursor: pointer;
}

.appointment-block strong {
  display: block;
  font-weight: 600;
}

.appointment-block--AGENDADA { background: var(--color-primary-soft); border-left-color: var(--color-primary); color: #1C1B1A; }
.appointment-block--CONFIRMADA { background: #E4EEF6; border-left-color: #2F6699; color: #1C1B1A; }
.appointment-block--PAGADA { background: var(--color-warning-soft); border-left-color: var(--color-warning); color: #1C1B1A; }
.appointment-block--COMPLETADA { background: var(--color-success-soft); border-left-color: var(--color-success); color: #1C1B1A; }
.appointment-block--CANCELADA { background: #F1F0EC; border-left-color: #A6A29A; color: #8A8681; text-decoration: line-through; }
.appointment-block--NO_ASISTIO { background: var(--color-danger-soft); border-left-color: var(--color-danger); color: #1C1B1A; }

.calendar__nav {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.calendar__nav-label {
  font-family: var(--font-display);
  font-size: 16px;
}
