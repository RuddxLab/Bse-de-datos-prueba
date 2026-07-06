import { CrudPage } from '../components/Common/CrudPage'
import { serviciosService } from '../services/entityServices'
import type { Servicio } from '../types'

export function ServiciosPage() {
  return (
    <CrudPage<Servicio>
      titulo="Servicios"
      idKey="id_servicio"
      service={serviciosService}
      orderBy="nombre_servicio"
      defaults={{ id_empresa: 1, id_sucursal: 1, id_categoria: 1, activo: true } as any}
      columnas={[
        { key: 'nombre_servicio', label: 'Servicio' },
        { key: 'duracion', label: 'Duración (min)' },
        { key: 'valor', label: 'Valor', render: (r) => `$${Number(r.valor).toLocaleString('es-CL')}` },
        { key: 'activo', label: 'Activo', render: (r) => (r.activo ? 'Sí' : 'No') }
      ]}
      campos={[
        { key: 'nombre_servicio', label: 'Nombre', required: true },
        { key: 'duracion', label: 'Duración (minutos)', type: 'number', required: true },
        { key: 'valor', label: 'Valor', type: 'number', required: true },
        { key: 'comision', label: 'Comisión (%)', type: 'number' },
        { key: 'activo', label: 'Activo', type: 'checkbox' }
      ]}
    />
  )
}
