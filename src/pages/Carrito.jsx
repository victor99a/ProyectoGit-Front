import { useEffect, useState } from 'react'
import { getCarrito, updateItem, removeItem, vaciarCarrito } from '../api.js'

export default function Carrito() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const cargar = async () => {
    try {
      setError(null)
      setLoading(true)
      const c = await getCarrito()
      setData(c) // { items:[{id, productoId, cantidad, subtotal, ...}], total }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const cambiarCantidad = async (itemId, nueva) => {
    await updateItem(itemId, nueva)
    await cargar()
  }
  const quitar = async (itemId) => {
    await removeItem(itemId)
    await cargar()
  }
  const vaciar = async () => {
    if (confirm('¿Vaciar carrito?')) {
      await vaciarCarrito()
      await cargar()
    }
  }

  if (loading) return <p className="text-secondary">Cargando carrito</p>
  if (error)   return <div className="alert alert-danger">Error!: {error}</div>

  const items = data?.items ?? []
  const total = data?.total ?? 0

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 m-0">Carrito</h1>
        <button className="btn btn-outline-danger btn-sm" onClick={vaciar} disabled={!items.length}>
          Vaciar
        </button>
      </div>

      {!items.length ? (
        <p className="text-secondary">El carrito está vacío.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id}>
                  <td>{it.productoNombre ?? `#${it.productoId}`}</td>
                  <td className="text-center">
                    <div className="btn-group btn-group-sm" role="group">
                      <button className="btn btn-outline-light" onClick={() => cambiarCantidad(it.id, it.cantidad - 1)} disabled={it.cantidad <= 1}>-</button>
                      <span className="btn btn-outline-secondary disabled">{it.cantidad}</span>
                      <button className="btn btn-outline-light" onClick={() => cambiarCantidad(it.id, it.cantidad + 1)}>+</button>
                    </div>
                  </td>
                  <td className="text-end">${Number(it.subtotal ?? (it.precioUnitario*it.cantidad)).toLocaleString('es-CL')}</td>
                  <td className="text-end">
                    <button className="btn btn-outline-danger btn-sm" onClick={() => quitar(it.id)}>
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="text-end fw-semibold">Total</td>
                <td className="text-end fw-bold">${Number(total).toLocaleString('es-CL')}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
