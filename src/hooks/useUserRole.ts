import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from './useAuth'

export type NombreRol = 'admin' | 'recepcionista' | 'agenda_operador' | 'prestador'

interface RolUsuario {
  idEmpresa: number | null
  rol: NombreRol | null
  loading: boolean
}

/**
 * Obtiene la empresa y el rol del usuario autenticado desde usuario_roles.
 * Hoy un usuario tiene un solo rol/empresa; si más adelante se soporta
 * multi-empresa por usuario, esto debe evolucionar a una lista + selector.
 */
export function useUserRole(): RolUsuario {
  const { session } = useAuth()
  const [idEmpresa, setIdEmpresa] = useState<number | null>(null)
  const [rol, setRol] = useState<NombreRol | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      setLoading(false)
      return
    }
    let activo = true
    setLoading(true)

    supabase
      .from('usuario_roles')
      .select('id_empresa, roles(nombre_rol)')
      .eq('id_usuario', session.user.id)
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (!activo) return
        setIdEmpresa(data?.id_empresa ?? null)
        setRol((data?.roles as any)?.nombre_rol ?? null)
        setLoading(false)
      })

    return () => {
      activo = false
    }
  }, [session])

  return { idEmpresa, rol, loading }
}

export const PUEDE_GESTIONAR_CATALOGO: NombreRol[] = ['admin']
export const PUEDE_GESTIONAR_CLIENTES: NombreRol[] = ['admin', 'recepcionista']
