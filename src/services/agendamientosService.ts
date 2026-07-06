import { supabase } from './supabaseClient'
import type { Agendamiento } from '../types'

// Código de error de Postgres cuando se viola una restricción EXCLUDE
// (usado aquí para bloquear el doble-agendamiento del mismo prestador).
const EXCLUSION_VIOLATION = '23P01'

export class DobleReservaError extends Error {
  constructor() {
    super('Ese prestador ya tiene una cita en ese horario.')
    this.name = 'DobleReservaError'
  }
}

export async function listAgendamientosPorRango(
  fechaInicio: string,
  fechaFin: string
): Promise<Agendamiento[]> {
  const { data, error } = await supabase
    .from('agendamientos')
    .select('*')
    .gte('fecha', fechaInicio)
    .lte('fecha', fechaFin)
    .order('fecha', { ascending: true })
    .order('hora_inicio', { ascending: true })

  if (error) throw error
  return (data ?? []) as Agendamiento[]
}

export async function crearAgendamiento(payload: Partial<Agendamiento>): Promise<Agendamiento> {
  const { data, error } = await supabase.from('agendamientos').insert(payload).select().single()

  if (error) {
    if (error.code === EXCLUSION_VIOLATION) throw new DobleReservaError()
    throw error
  }
  return data as Agendamiento
}

export async function actualizarAgendamiento(
  id: number,
  payload: Partial<Agendamiento>
): Promise<Agendamiento> {
  const { data, error } = await supabase
    .from('agendamientos')
    .update(payload)
    .eq('id_agendamiento', id)
    .select()
    .single()

  if (error) {
    if (error.code === EXCLUSION_VIOLATION) throw new DobleReservaError()
    throw error
  }
  return data as Agendamiento
}

export async function cancelarAgendamiento(id: number): Promise<Agendamiento> {
  return actualizarAgendamiento(id, { estado: 'CANCELADA' })
}
