import { CrudPage } from '../components/Common/CrudPage'
import { clientesService } from '../services/entityServices'
import type { Cliente } from '../types'

export function ClientesPage() {
  return (
    <CrudPage<Cliente>
      titulo="Clientes"
      idKey="id_cliente"
      service={clientesService}
      orderBy="nombre_cliente"
      defaults={{ id_empresa: 1, activo: true } as any}
      columnas={[
        { key: 'nombre_cliente', label: 'Nombre' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'email', label: 'Correo' },
        { key: 'activo', label: 'Activo', render: (r) => (r.activo ? 'Sí' : 'No') }
      ]}
      campos={[
        { key: 'nombre_cliente', label: 'Nombre', required: true },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'email', label: 'Correo' },
        { key: 'rut', label: 'RUT' },
        { key: 'activo', label: 'Activo', type: 'checkbox' }
      ]}
    />
  )
}
