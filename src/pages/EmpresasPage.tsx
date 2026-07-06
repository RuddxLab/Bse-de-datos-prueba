import { CrudPage } from '../components/Common/CrudPage'
import { empresasService } from '../services/entityServices'
import type { Empresa } from '../types'

export function EmpresasPage() {
  return (
    <CrudPage<Empresa>
      titulo="Empresas"
      idKey="id_empresa"
      service={empresasService}
      orderBy="nombre_empresa"
      defaults={{ activo: true } as any}
      columnas={[
        { key: 'nombre_empresa', label: 'Nombre' },
        { key: 'rut_empresa', label: 'RUT' },
        { key: 'email_contacto', label: 'Correo de contacto' },
        { key: 'activo', label: 'Activa', render: (r) => (r.activo ? 'Sí' : 'No') }
      ]}
      campos={[
        { key: 'nombre_empresa', label: 'Nombre', required: true },
        { key: 'rut_empresa', label: 'RUT' },
        { key: 'email_contacto', label: 'Correo de contacto' },
        { key: 'direccion_empresa', label: 'Dirección' },
        { key: 'activo', label: 'Activa', type: 'checkbox' }
      ]}
    />
  )
}
