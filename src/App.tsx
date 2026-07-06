import { ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { useUserRole, PUEDE_GESTIONAR_CATALOGO } from './hooks/useUserRole'
import { AppShell } from './components/Layout/AppShell'
import { LoginPage } from './pages/LoginPage'
import { CalendarPage } from './pages/CalendarPage'
import { ClientesPage } from './pages/ClientesPage'
import { PrestadoresPage } from './pages/PrestadoresPage'
import { ServiciosPage } from './pages/ServiciosPage'
import { SucursalesPage } from './pages/SucursalesPage'

function RutaLogin() {
  const { session, loading } = useAuth()
  if (loading) return <div style={{ padding: 40 }}>Cargando…</div>
  if (session) return <Navigate to="/" replace />
  return <LoginPage />
}

// La seguridad real vive en las políticas RLS de Supabase; este guard es solo
// para no mostrar en la UI secciones que el usuario no puede usar igual.
function RutaSoloCatalogo({ children }: { children: ReactNode }) {
  const { rol, loading } = useUserRole()
  if (loading) return <div style={{ padding: 40 }}>Cargando…</div>
  if (!rol || !PUEDE_GESTIONAR_CATALOGO.includes(rol)) return <Navigate to="/" replace />
  return <>{children}</>
}

function RutasProtegidas() {
  const { session, loading } = useAuth()

  if (loading) return <div style={{ padding: 40 }}>Cargando…</div>
  if (!session) return <Navigate to="/login" replace />

  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/clientes" element={<RutaSoloCatalogo><ClientesPage /></RutaSoloCatalogo>} />
        <Route path="/prestadores" element={<RutaSoloCatalogo><PrestadoresPage /></RutaSoloCatalogo>} />
        <Route path="/servicios" element={<RutaSoloCatalogo><ServiciosPage /></RutaSoloCatalogo>} />
        <Route path="/sucursales" element={<RutaSoloCatalogo><SucursalesPage /></RutaSoloCatalogo>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<RutaLogin />} />
          <Route path="/*" element={<RutasProtegidas />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
