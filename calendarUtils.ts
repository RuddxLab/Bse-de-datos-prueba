import { supabase } from './supabaseClient'

/**
 * Fábrica de operaciones CRUD para tablas simples.
 * Evita repetir el mismo select/insert/update/delete en cada servicio.
 */
export function createCrudService<T extends Record<string, any>>(
  table: string,
  idColumn: string
) {
  return {
    async listAll(orderBy?: string): Promise<T[]> {
      const query = supabase.from(table).select('*')
      const { data, error } = orderBy ? await query.order(orderBy) : await query
      if (error) throw error
      return (data ?? []) as T[]
    },

    async getById(id: number | string): Promise<T | null> {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq(idColumn, id)
        .maybeSingle()
      if (error) throw error
      return data as T | null
    },

    async create(payload: Partial<T>): Promise<T> {
      const { data, error } = await supabase.from(table).insert(payload).select().single()
      if (error) throw error
      return data as T
    },

    async update(id: number | string, payload: Partial<T>): Promise<T> {
      const { data, error } = await supabase
        .from(table)
        .update(payload)
        .eq(idColumn, id)
        .select()
        .single()
      if (error) throw error
      return data as T
    },

    async remove(id: number | string): Promise<void> {
      const { error } = await supabase.from(table).delete().eq(idColumn, id)
      if (error) throw error
    }
  }
}
