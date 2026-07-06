import { useEffect, useState, ReactNode } from 'react'
import { Modal } from './Modal'
import { REGIONES, REGIONES_COMUNAS } from '../../data/chileRegionesComunas'

export interface CrudField {
  key: string
  label: string
  type?: 'text' | 'number' | 'checkbox' | 'sino' | 'region' | 'comuna' | 'select'
  required?: boolean
  /** Para 'comuna': de qué campo del mismo formulario depende (normalmente la región/ciudad) */
  dependsOn?: string
  /** Para 'select': opciones estáticas ya cargadas por la página que usa el CRUD */
  options?: { value: string | number; label: string }[]
}

export interface CrudColumn {
  key: string
  label: string
  render?: (row: any) => ReactNode
}

interface CrudService<T> {
  listAll: (orderBy?: string) => Promise<T[]>
  create: (payload: Partial<T>) => Promise<T>
  update: (id: number | string, payload: Partial<T>) => Promise<T>
  remove: (id: number | string) => Promise<void>
}

interface Props<T extends Record<string, any>> {
  titulo: string
  idKey: string
  service: CrudService<T>
  columnas: CrudColumn[]
  campos: CrudField[]
  orderBy?: string
  defaults?: Partial<T>
}

export function CrudPage<T extends Record<string, any>>({
  titulo,
  idKey,
  service,
  columnas,
  campos,
  orderBy,
  defaults
}: Props<T>) {
  const [filas, setFilas] = useState<T[]>([])
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState<Partial<T> | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function cargar() {
    setCargando(true)
    try {
      setFilas(await service.listAll(orderBy))
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  function abrirNuevo() {
    setError(null)
    setEditando({ ...(defaults ?? {}) } as Partial<T>)
  }

  function abrirEditar(fila: T) {
    setError(null)
    setEditando(fila)
  }

  async function guardar() {
    if (!editando) return
    try {
      if ((editando as any)[idKey]) {
        await service.update((editando as any)[idKey], editando)
      } else {
        await service.create(editando)
      }
      setEditando(null)
      cargar()
    } catch (err: any) {
      setError(err.message ?? 'No se pudo guardar.')
    }
  }

  async function eliminar(fila: T) {
    if (!confirm('¿Eliminar este registro?')) return
    await service.remove((fila as any)[idKey])
    cargar()
  }

  return (
    <div>
      <div className="main__header">
        <h1>{titulo}</h1>
        <button className="btn btn--primary" onClick={abrirNuevo}>+ Nuevo</button>
      </div>

      {cargando ? (
        <p style={{ color: 'var(--color-ink-soft)' }}>Cargando…</p>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                {columnas.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filas.map((fila) => (
                <tr key={(fila as any)[idKey]}>
                  {columnas.map((c) => (
                    <td key={c.key}>{c.render ? c.render(fila) : String((fila as any)[c.key] ?? '')}</td>
                  ))}
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn btn--ghost" onClick={() => abrirEditar(fila)}>Editar</button>{' '}
                    <button className="btn btn--ghost" onClick={() => eliminar(fila)}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {filas.length === 0 && (
                <tr>
                  <td colSpan={columnas.length + 1} style={{ color: 'var(--color-ink-soft)' }}>
                    Sin registros todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {editando && (
        <Modal title={(editando as any)[idKey] ? 'Editar' : 'Nuevo registro'} onClose={() => setEditando(null)}>
          {campos.map((campo) => {
            const valor = (editando as any)[campo.key]

            if (campo.type === 'checkbox') {
              return (
                <div className="field" key={campo.key}>
                  <label>{campo.label}</label>
                  <input
                    type="checkbox"
                    checked={Boolean(valor)}
                    onChange={(e) => setEditando({ ...editando, [campo.key]: e.target.checked })}
                  />
                </div>
              )
            }

            if (campo.type === 'sino') {
              // Se guarda como 1/0 (numeric), se muestra como Sí/No
              return (
                <div className="field" key={campo.key}>
                  <label>{campo.label}</label>
                  <select
                    value={valor ? '1' : '0'}
                    onChange={(e) => setEditando({ ...editando, [campo.key]: Number(e.target.value) })}
                  >
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </div>
              )
            }

            if (campo.type === 'region') {
              return (
                <div className="field" key={campo.key}>
                  <label>{campo.label}</label>
                  <select
                    value={valor ?? ''}
                    onChange={(e) => {
                      // al cambiar la región, se limpia la comuna dependiente para evitar combinaciones inválidas
                      const dependiente = campos.find((c) => c.type === 'comuna' && c.dependsOn === campo.key)
                      setEditando({
                        ...editando,
                        [campo.key]: e.target.value,
                        ...(dependiente ? { [dependiente.key]: '' } : {})
                      })
                    }}
                  >
                    <option value="">Selecciona una región…</option>
                    {REGIONES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              )
            }

            if (campo.type === 'comuna') {
              const region = campo.dependsOn ? (editando as any)[campo.dependsOn] : null
              const comunas = region ? REGIONES_COMUNAS[region] ?? [] : []
              return (
                <div className="field" key={campo.key}>
                  <label>{campo.label}</label>
                  <select
                    value={valor ?? ''}
                    disabled={!region}
                    onChange={(e) => setEditando({ ...editando, [campo.key]: e.target.value })}
                  >
                    <option value="">{region ? 'Selecciona una comuna…' : 'Primero elige una región'}</option>
                    {comunas.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )
            }

            if (campo.type === 'select') {
              return (
                <div className="field" key={campo.key}>
                  <label>{campo.label}</label>
                  <select
                    value={valor ?? ''}
                    onChange={(e) => {
                      const opcion = campo.options?.find((o) => String(o.value) === e.target.value)
                      setEditando({ ...editando, [campo.key]: opcion ? opcion.value : e.target.value })
                    }}
                  >
                    <option value="">Selecciona…</option>
                    {(campo.options ?? []).map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              )
            }

            return (
              <div className="field" key={campo.key}>
                <label>{campo.label}</label>
                <input
                  type={campo.type ?? 'text'}
                  required={campo.required}
                  value={valor ?? ''}
                  onChange={(e) =>
                    setEditando({
                      ...editando,
                      [campo.key]: campo.type === 'number' ? Number(e.target.value) : e.target.value
                    })
                  }
                />
              </div>
            )
          })}
          {error && <div className="error-text">{error}</div>}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn btn--primary" onClick={guardar}>Guardar</button>
            <button className="btn btn--ghost" onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
