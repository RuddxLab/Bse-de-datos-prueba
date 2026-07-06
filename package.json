export const HORA_INICIO_DIA = 8 // 08:00
export const HORA_FIN_DIA = 20 // 20:00
export const ALTO_HORA_PX = 60

export function timeToMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function startOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay() // 0 = domingo
  d.setDate(d.getDate() - day)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getWeekDays(anchor: Date): Date[] {
  const start = startOfWeek(anchor)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

/** Posición vertical (px) y alto (px) de un bloque de cita dentro de la grilla del día */
export function bloquePosicion(horaInicio: string, horaFin: string) {
  const inicioMin = timeToMinutes(horaInicio) - HORA_INICIO_DIA * 60
  const finMin = timeToMinutes(horaFin) - HORA_INICIO_DIA * 60
  const top = (inicioMin / 60) * ALTO_HORA_PX
  const height = Math.max(((finMin - inicioMin) / 60) * ALTO_HORA_PX, 24)
  return { top, height }
}

export const NOMBRES_DIA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
