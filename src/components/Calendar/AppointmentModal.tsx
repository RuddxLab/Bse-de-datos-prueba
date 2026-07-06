import { useState } from 'react'
import { Modal } from '../Common/Modal'
import { crearAgendamiento, cancelarAgendamiento, DobleReservaError } from '../../services/agendamientosService'
import type { Agendamiento, PrestadorPublico, Servicio } from '../../types'

interface Props {
  fecha: string
  horaInicial: string
  citaExistente: Agendamiento | null
  prestadores: PrestadorPublico[]
  servicios: Servicio[]
  idEmpresa: number
  idSucursal: number
  onClose: () => void
  onSaved: () => void
}

export function AppointmentModal({
  fecha,
  horaInicial,
  citaExistente,
  prestadores,
  servicios,
  idEmpresa,
  idSucursal,
  onClose,
  onSaved
}: Props) {
  const [nombreCliente, setNombreCliente] = useState(citaExistente?.nombre_cliente ?? '')
  const [telefono, setTelefono] = useState(citaExistente?.telefono ?? '')
  const [email, setEmail] = useState(citaExistente?.email ?? '')
  const [idPrestador, setIdPrestador] = useState<number>(citaExistente?.id_prestador ?? prestadores[0]?.id_prestador ?? 0)
  const [idServicio, setIdServicio] = useState<number>(servicios[0]?.id_servicio ?? 0)
  const [horaInicio, setHoraInicio] = useState(citaExistente?.hora_inicio ?? horaInicial)
  const [error, setError] = useState<string | null>(null)
  const [guardando, setGuardando] = useState(false)

  const servicioSeleccionado = servicios.find((s) => s.id_servicio === idServicio)

  function calcularHoraFin(inicio: string, duracionMin: number) {
    const [h, m] = inicio.split(':').map(Number)
    const total = h * 60 + m + duracionMin
    return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
  }

  async function handleGuardar() {
    setError(null)
    if (!nombreCliente.trim()) {
      setError('El nombre del cliente es obligatorio.')
      return
    }
    if (!servicioSeleccionado) {
      setError('Selecciona un servicio.')
      return
    }

    setGuardando(true)
    try {
      const horaFin = calcularHoraFin(horaInicio, servicioSeleccionado.duracion)
      await crearAgendamiento({
        id_empresa: idEmpresa,
        id_sucursal: idSucursal,
        id_prestador: idPrestador,
        id_cliente: 0, // el trigger v_verificar_o_crear_cliente resuelve/crea el cliente
        nombre_cliente: nombreCliente,
        telefono,
        email,
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        estado: 'AGENDADA'
      } as any)
      onSaved()
    } catch (err) {
      if (err instanceof DobleReservaError) {
        setError(err.message)
      } else {
        setError('No se pudo guardar la cita. Intenta de nuevo.')
      }
    } finally {
      setGuardando(false)
    }
  }

  async function handleCancelar() {
    if (!citaExistente) return
    setGuardando(true)
    try {
      await cancelarAgendamiento(citaExistente.id_agendamiento)
      onSaved()
    } catch {
      setError('No se pudo cancelar la cita.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <Modal title={citaExistente ? 'Detalle de la cita' : 'Nueva cita'} onClose={onClose}>
      <div className="field">
        <label>Cliente</label>
        <input value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} disabled={!!citaExistente} />
      </div>
      <div className="field">
        <label>Teléfono</label>
        <input value={telefono ?? ''} onChange={(e) => setTelefono(e.target.value)} disabled={!!citaExistente} />
      </div>
      <div className="field">
        <label>Correo</label>
        <input type="email" value={email ?? ''} onChange={(e) => setEmail(e.target.value)} disabled={!!citaExistente} />
      </div>
      <div className="field">
        <label>Prestador</label>
        <select value={idPrestador} onChange={(e) => setIdPrestador(Number(e.target.value))} disabled={!!citaExistente}>
          {prestadores.map((p) => (
            <option key={p.id_prestador} value={p.id_prestador}>{p.nombre_prestador}</option>
          ))}
        </select>
      </div>
      {!citaExistente && (
        <div className="field">
          <label>Servicio</label>
          <select value={idServicio} onChange={(e) => setIdServicio(Number(e.target.value))}>
            {servicios.map((s) => (
              <option key={s.id_servicio} value={s.id_servicio}>
                {s.nombre_servicio} · {s.duracion} min
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="field">
        <label>Hora de inicio</label>
        <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} disabled={!!citaExistente} />
      </div>

      {error && <div className="error-text">{error}</div>}

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {citaExistente ? (
          citaExistente.estado !== 'CANCELADA' && (
            <button className="btn btn--danger" onClick={handleCancelar} disabled={guardando}>
              Cancelar cita
            </button>
          )
        ) : (
          <button className="btn btn--primary" onClick={handleGuardar} disabled={guardando}>
            {guardando ? 'Guardando…' : 'Guardar cita'}
          </button>
        )}
        <button className="btn btn--ghost" onClick={onClose}>Cerrar</button>
      </div>
    </Modal>
  )
}
