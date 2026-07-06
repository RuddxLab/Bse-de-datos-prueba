// Tipos alineados 1:1 con el esquema de Supabase (public schema)

export type EstadoAgendamiento =
  | 'AGENDADA'
  | 'CONFIRMADA'
  | 'CANCELADA'
  | 'COMPLETADA'
  | 'NO_ASISTIO'
  | 'PAGADA'

export interface Empresa {
  id_empresa: number
  nombre_empresa: string
  rut_empresa: string | null
  email_contacto: string | null
  direccion_empresa: string | null
  db_empresa: string | null
  activo: boolean
  fecha_creacion: string
}

export interface Sucursal {
  id_sucursal: number
  id_empresa: number
  nombre_sucursal: string
  activo: boolean
}

export interface Cliente {
  id_cliente: number
  id_empresa: number
  nombre_cliente: string
  telefono: string | null
  email: string | null
  rut: string | null
  activo: boolean
}

export interface Prestador {
  id_prestador: number
  id_empresa: number
  id_sucursal: number
  id_usuario: string | null
  nombre_prestador: string
  email: string | null
  telefono: string | null
  rut: string | null
  ciudad: string | null
  comuna: string | null
  comision: number | null
  activo: boolean
}

export interface Categoria {
  id_categoria: number
  id_empresa: number
  id_sucursal: number
  id_tipocategoria: number
  nombre_categoria: string
  activo: boolean
}

export interface Servicio {
  id_servicio: number
  id_empresa: number
  id_sucursal: number
  id_categoria: number
  nombre_servicio: string
  duracion: number // minutos
  valor: number
  comision: number | null
  activo: boolean
}

export interface Agendamiento {
  id_agendamiento: number
  id_empresa: number
  id_sucursal: number
  id_cliente: number
  id_prestador: number
  nombre_cliente: string
  telefono?: string | null
  email?: string | null
  rut?: string | null
  fecha: string // YYYY-MM-DD
  hora_inicio: string // HH:MM
  hora_fin: string // HH:MM
  estado: EstadoAgendamiento
}

// Vista pública segura (sin datos sensibles de prestadores)
export interface PrestadorPublico {
  id_prestador: number
  id_sucursal: number
  nombre_prestador: string
  ciudad: string | null
  comuna: string | null
  activo: boolean
}
