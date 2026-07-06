import { CrudPage } from '../components/Common/CrudPage'
import { prestadoresService } from '../services/entityServices'
import type { Prestador } from '../types'

export function PrestadoresPage() {
  return (
    <CrudPage<Prestador>
      titulo="Prestadores"
      idKey="id_prestador"
      service={prestadoresService}
      orderBy="nombre_prestador"
      defaults={{ id_empresa: 1, id_sucursal: 1, activo: true } as any}
      columnas={[
        { key: 'nombre_prestador', label: 'Nombre' },
        { key: 'ciudad', label: 'Ciudad' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'activo', label: 'Activo', render: (r) => (r.activo ? 'Sí' : 'No') }
      ]}
      campos={[
        { key: 'nombre_prestador', label: 'Nombre', required: true },
        { key: 'email', label: 'Correo' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'ciudad', label: 'Ciudad' },
        { key: 'comuna', label: 'Comuna' },
        { key: 'comision', label: 'Comisión (%)', type: 'number' },
        { key: 'activo', label: 'Activo', type: 'checkbox' }
      ]}
    />
  )
}
