import { useEffect, useMemo, useState, useCallback } from 'react'
import { WeekView } from '../components/Calendar/WeekView'
import { AppointmentModal } from '../components/Calendar/AppointmentModal'
import { listAgendamientosPorRango } from '../services/agendamientosService'
import { listPrestadoresPublico, serviciosService } from '../services/entityServices'
import { getWeekDays, toISODate } from '../utils/calendarUtils'
import { useUserRole } from '../hooks/useUserRole'
import type { Agendamiento, PrestadorPublico, Servicio } from '../types'

// TODO: cuando exista más de una sucursal por empresa, agregar un selector;
// hoy se asume la primera sucursal de la empresa del usuario.
const ID_SUCURSAL = 1

export function CalendarPage() {
  const { idEmpresa, loading: cargandoRol } = useUserRole()
  const [anchor, setAnchor] = useState(new Date())
  const [citas, setCitas] = useState<Agendamiento[]>([])
  const [prestadores, setPrestadores] = useState<PrestadorPublico[]>([])
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [slotSeleccionado, setSlotSeleccionado] = useState<{ fecha: string; hora: string } | null>(null)
  const [citaSeleccionada, setCitaSeleccionada] = useState<Agendamiento | null>(null)
  const [cargando, setCargando] = useState(true)

  const dias = useMemo(() => getWeekDays(anchor), [anchor])

  const cargarCitas = useCallback(async () => {
    setCargando(true)
    try {
      const desde = toISODate(dias[0])
      const hasta = toISODate(dias[6])
      const data = await listAgendamientosPorRango(desde, hasta)
      setCitas(data)
    } finally {
      setCargando(false)
    }
  }, [dias])

  useEffect(() => {
    cargarCitas()
  }, [cargarCitas])

  useEffect(() => {
    listPrestadoresPublico().then(setPrestadores).catch(() => setPrestadores([]))
    serviciosService.listAll('nombre_servicio').then(setServicios).catch(() => setServicios([]))
  }, [])

  const citasPorDia = useMemo(() => {
    const grupos: Record<string, Agendamiento[]> = {}
    for (const cita of citas) {
      grupos[cita.fecha] = grupos[cita.fecha] ?? []
      grupos[cita.fecha].push(cita)
    }
    return grupos
  }, [citas])

  function moverSemana(delta: number) {
    const nueva = new Date(anchor)
    nueva.setDate(nueva.getDate() + delta * 7)
    setAnchor(nueva)
  }

  if (cargandoRol) {
    return <p style={{ color: 'var(--color-ink-soft)' }}>Cargando tu perfil…</p>
  }

  if (!idEmpresa) {
    return (
      <p style={{ color: 'var(--color-danger)' }}>
        Tu usuario no tiene un rol asignado todavía. Pide que te lo asignen para poder ver el calendario.
      </p>
    )
  }

  return (
    <div>
      <div className="main__header">
        <h1>Calendario</h1>
      </div>

      <div className="calendar__nav">
        <button className="btn btn--ghost" onClick={() => moverSemana(-1)}>← Semana anterior</button>
        <button className="btn btn--ghost" onClick={() => setAnchor(new Date())}>Hoy</button>
        <button className="btn btn--ghost" onClick={() => moverSemana(1)}>Semana siguiente →</button>
        <span className="calendar__nav-label">
          {dias[0].toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })} – {dias[6].toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}
        </span>
      </div>

      {cargando ? (
        <p style={{ color: 'var(--color-ink-soft)' }}>Cargando agenda…</p>
      ) : (
        <WeekView
          dias={dias}
          citasPorDia={citasPorDia}
          onSlotClick={(fecha, hora) => setSlotSeleccionado({ fecha, hora })}
          onCitaClick={(cita) => setCitaSeleccionada(cita)}
        />
      )}

      {(slotSeleccionado || citaSeleccionada) && (
        <AppointmentModal
          fecha={citaSeleccionada?.fecha ?? slotSeleccionado!.fecha}
          horaInicial={citaSeleccionada?.hora_inicio ?? slotSeleccionado!.hora}
          citaExistente={citaSeleccionada}
          prestadores={prestadores}
          servicios={servicios}
          idEmpresa={idEmpresa}
          idSucursal={ID_SUCURSAL}
          onClose={() => {
            setSlotSeleccionado(null)
            setCitaSeleccionada(null)
          }}
          onSaved={() => {
            setSlotSeleccionado(null)
            setCitaSeleccionada(null)
            cargarCitas()
          }}
        />
      )}
    </div>
  )
}
