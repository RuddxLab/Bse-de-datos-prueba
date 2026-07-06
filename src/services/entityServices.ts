import { createCrudService } from './crudFactory'
import type { Cliente, Prestador, PrestadorPublico, Servicio, Sucursal, Categoria } from '../types'
import { supabase } from './supabaseClient'

export const clientesService = createCrudService<Cliente>('clientes', 'id_cliente')
export const prestadoresService = createCrudService<Prestador>('prestadores', 'id_prestador')
export const serviciosService = createCrudService<Servicio>('servicios', 'id_servicio')
export const sucursalesService = createCrudService<Sucursal>('sucursales', 'id_sucursal')
export const categoriasService = createCrudService<Categoria>('categorias', 'id_categoria')

// Lectura pública liviana para selects de "elegir prestador" (sin datos sensibles)
export async function listPrestadoresPublico(): Promise<PrestadorPublico[]> {
  const { data, error } = await supabase.from('v_prestadores_publico').select('*')
  if (error) throw error
  return (data ?? []) as PrestadorPublico[]
}
