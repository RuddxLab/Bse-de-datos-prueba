import { NavLink } from 'react-router-dom'
import { signOut } from '../../services/authService'
import { useUserRole, PUEDE_GESTIONAR_CATALOGO } from '../../hooks/useUserRole'

const LINK_CALENDARIO = { to: '/', label: 'Calendario' }
const LINKS_CATALOGO = [
  { to: '/clientes', label: 'Clientes' },
  { to: '/prestadores', label: 'Prestadores' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/sucursales', label: 'Sucursales' },
  { to: '/empresas', label: 'Empresas' }
]

export function Sidebar() {
  const { rol, loading } = useUserRole()
  const puedeVerCatalogo = !loading && rol && PUEDE_GESTIONAR_CATALOGO.includes(rol)
  // Clientes: admin y recepcionista lo gestionan; agenda_operador solo necesita
  // verlo de refilón desde el calendario, así que no le mostramos el link aparte.
  const links = [LINK_CALENDARIO, ...(puedeVerCatalogo ? LINKS_CATALOGO : [])]

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">Nexus Booking</div>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            'sidebar__link' + (isActive ? ' sidebar__link--active' : '')
          }
        >
          {link.label}
        </NavLink>
      ))}
      <div style={{ flex: 1 }} />
      <button
        className="sidebar__link"
        style={{ textAlign: 'left', background: 'none', border: 'none' }}
        onClick={() => signOut()}
      >
        Cerrar sesión
      </button>
    </aside>
  )
}
