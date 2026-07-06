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
        { key: 'ciudad', label: 'Región' },
        { key: 'comuna', label: 'Comuna' },
        { key: 'telefono1', label: 'Teléfono' },
        { key: 'activo', label: 'Activa', render: (r) => (r.activo ? 'Sí' : 'No') }
      ]}
      campos={[
        { key: 'nombre_sucursal', label: 'Nombre', required: true },
        { key: 'direccion', label: 'Dirección' },
        { key: 'ciudad', label: 'Región', type: 'region' },
        { key: 'comuna', label: 'Comuna', type: 'comuna', dependsOn: 'ciudad' },
        { key: 'telefono1', label: 'Teléfono 1' },
        { key: 'telefono2', label: 'Teléfono 2' },
        { key: 'activo', label: 'Activa', type: 'checkbox' }
      ]}
    />
  )
}
