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
      defaults={{ id_empresa: 1, id_sucursal: 1, activo: true, reserva_online: 1 } as any}
      columnas={[
        { key: 'nombre_prestador', label: 'Nombre' },
        { key: 'ciudad', label: 'Región' },
        { key: 'comuna', label: 'Comuna' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'reserva_online', label: 'Reserva online', render: (r) => (r.reserva_online ? 'Sí' : 'No') },
        { key: 'activo', label: 'Activo', render: (r) => (r.activo ? 'Sí' : 'No') }
      ]}
      campos={[
        { key: 'nombre_prestador', label: 'Nombre', required: true },
        { key: 'rut', label: 'RUT' },
        { key: 'email', label: 'Correo' },
        { key: 'telefono', label: 'Teléfono' },
        { key: 'direccion', label: 'Dirección' },
        { key: 'ciudad', label: 'Región', type: 'region' },
        { key: 'comuna', label: 'Comuna', type: 'comuna', dependsOn: 'ciudad' },
        { key: 'comision', label: 'Comisión (%)', type: 'number' },
        { key: 'reserva_online', label: 'Reserva online', type: 'sino' },
        { key: 'activo', label: 'Activo', type: 'checkbox' }
      ]}
    />
  )
}
