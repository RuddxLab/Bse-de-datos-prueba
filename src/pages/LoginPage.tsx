import { FormEvent, useState } from 'react'
import { signIn, signUp } from '../services/authService'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modo, setModo] = useState<'login' | 'registro'>('login')
  const [error, setError] = useState<string | null>(null)
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setCargando(true)
    try {
      if (modo === 'login') {
        await signIn(email, password)
      } else {
        await signUp(email, password)
        setError('Cuenta creada. Revisa tu correo si se requiere confirmación, luego inicia sesión.')
        setModo('login')
      }
    } catch (err: any) {
      setError(err.message ?? 'Ocurrió un error.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="login-shell">
      <form className="card" style={{ padding: 32, width: 360 }} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 6 }}>Nexus Booking</h2>
        <p style={{ color: 'var(--color-ink-soft)', marginBottom: 20, fontSize: 13 }}>
          {modo === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta'}
        </p>

        <div className="field">
          <label>Correo</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Contraseña</label>
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button className="btn btn--primary" style={{ width: '100%', marginTop: 8 }} disabled={cargando}>
          {cargando ? 'Procesando…' : modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </button>

        <button
          type="button"
          className="btn btn--ghost"
          style={{ width: '100%', marginTop: 8 }}
          onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}
        >
          {modo === 'login' ? 'Crear una cuenta nueva' : 'Ya tengo cuenta'}
        </button>
      </form>
    </div>
  )
}
