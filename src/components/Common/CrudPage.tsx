import { useEffect, useState, ReactNode } from 'react'
import { Modal } from './Modal'

export interface CrudField {
  key: string
  label: string
  type?: 'text' | 'number' | 'checkbox'
  required?: boolean
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
          {campos.map((campo) => (
            <div className="field" key={campo.key}>
              <label>{campo.label}</label>
              {campo.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  checked={Boolean((editando as any)[campo.key])}
                  onChange={(e) => setEditando({ ...editando, [campo.key]: e.target.checked })}
                />
              ) : (
                <input
                  type={campo.type ?? 'text'}
                  required={campo.required}
                  value={(editando as any)[campo.key] ?? ''}
                  onChange={(e) =>
                    setEditando({
                      ...editando,
                      [campo.key]: campo.type === 'number' ? Number(e.target.value) : e.target.value
                    })
                  }
                />
              )}
            </div>
          ))}
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
