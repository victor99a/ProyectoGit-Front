import { useEffect, useState } from 'react'
import { getProductos, addItem } from '../api.js';



export default function Productos() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [adding, setAdding] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductos()
        setItems(data ?? [])
      } catch (e) { setError(e.message) }
      finally { setLoading(false) }
    })()
  }, [])

  const onAdd = async (id) => {
    try {
      setAdding(id)
      await addItem(id, 1)
    } catch (e) {
      alert('No se pudo agregar: ' + e.message)
    } finally {
      setAdding(null)
    }
  }

  if (loading) return <p className="text-secondary">Cargando productos…</p>
  if (error)   return <div className="alert alert-danger">Error: {error}</div>

  return (
    <>
      <h1 className="display-5 mb-4">Productos</h1>
      <div className="row g-4">
        {items.map(p => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
            <div className="card h-100 bg-dark border-secondary">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="text-secondary small mb-2">{p.descripcion ?? '—'}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">${Number(p.precio).toLocaleString('es-CL')}</span>
                  <button
                    className="btn btn-outline-light btn-sm"
                    disabled={adding === p.id || p.stock <= 0}
                    onClick={() => onAdd(p.id)}
                  >
                    {adding === p.id ? 'Agregando…' : 'Agregar'}
                  </button>
                </div>
                <small className="text-secondary mt-2">Stock: {p.stock}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
