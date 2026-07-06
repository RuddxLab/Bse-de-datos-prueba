import type { Agendamiento } from '../../types'
import {
  HORA_INICIO_DIA,
  HORA_FIN_DIA,
  NOMBRES_DIA,
  toISODate
} from '../../utils/calendarUtils'
import { AppointmentBlock } from './AppointmentBlock'

const HORAS = Array.from(
  { length: HORA_FIN_DIA - HORA_INICIO_DIA },
  (_, i) => HORA_INICIO_DIA + i
)

export function WeekView({
  dias,
  citasPorDia,
  onSlotClick,
  onCitaClick
}: {
  dias: Date[]
  citasPorDia: Record<string, Agendamiento[]>
  onSlotClick: (fecha: string, hora: string) => void
  onCitaClick: (cita: Agendamiento) => void
}) {
  const hoyISO = toISODate(new Date())

  return (
    <div className="calendar">
      <div className="calendar__gutter">
        <div style={{ height: 49, borderBottom: '1px solid var(--color-border)' }} />
        {HORAS.map((h) => (
          <div key={h} className="calendar__gutter-cell">
            {String(h).padStart(2, '0')}:00
          </div>
        ))}
      </div>

      <div className="calendar__days">
        {dias.map((dia) => {
          const iso = toISODate(dia)
          const esHoy = iso === hoyISO
          const citas = citasPorDia[iso] ?? []

          return (
            <div key={iso}>
              <div className={`calendar__day-header ${esHoy ? 'calendar__day-header--today' : ''}`}>
                <div className="calendar__day-name">{NOMBRES_DIA[dia.getDay()]}</div>
                <div className="calendar__day-number">{dia.getDate()}</div>
              </div>
              <div className="calendar__day-column">
                {HORAS.map((h) => (
                  <div
                    key={h}
                    className="calendar__hour-line"
                    onClick={() => onSlotClick(iso, `${String(h).padStart(2, '0')}:00`)}
                  />
                ))}
                {citas.map((cita) => (
                  <AppointmentBlock key={cita.id_agendamiento} cita={cita} onClick={onCitaClick} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
