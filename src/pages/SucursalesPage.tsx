import { CrudPage } from '../components/Common/CrudPage'
import { sucursalesService } from '../services/entityServices'
import type { Sucursal } from '../types'

export function SucursalesPage() {
  return (
    <CrudPage<Sucursal>
      titulo="Sucursales"
      idKey="id_sucursal"
      service={sucursalesService}
      orderBy="nombre_sucursal"
      defaults={{ id_empresa: 1, activo: true } as any}
      columnas={[
        { key: 'nombre_sucursal', label: 'Nombre' },
        { key: 'activo', label: 'Activa', render: (r) => (r.activo ? 'Sí' : 'No') }
      ]}
      campos={[
        { key: 'nombre_sucursal', label: 'Nombre', required: true },
        { key: 'activo', label: 'Activa', type: 'checkbox' }
      ]}
    />
  )
}
