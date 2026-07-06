import type { Agendamiento } from '../../types'
import { bloquePosicion } from '../../utils/calendarUtils'

export function AppointmentBlock({
  cita,
  onClick
}: {
  cita: Agendamiento
  onClick: (cita: Agendamiento) => void
}) {
  const { top, height } = bloquePosicion(cita.hora_inicio, cita.hora_fin)

  return (
    <div
      className={`appointment-block appointment-block--${cita.estado}`}
      style={{ top, height }}
      onClick={() => onClick(cita)}
      title={`${cita.nombre_cliente} · ${cita.hora_inicio}–${cita.hora_fin}`}
    >
      <strong>{cita.hora_inicio}</strong>
      {cita.nombre_cliente}
    </div>
  )
}
