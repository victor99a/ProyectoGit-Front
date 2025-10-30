import { Link, Routes, Route, NavLink } from 'react-router-dom'
import Productos from './pages/Productos.jsx'
import Carrito from './pages/Carrito.jsx'

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-secondary sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-semibold" to="/">Mini E-Commerce</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="nav" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto gap-2">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Productos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="btn btn-outline-light" to="/carrito">
                  <i className="bi bi-cart3 me-1"></i> Carrito
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="py-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<Productos/>}/>
            <Route path="/carrito" element={<Carrito/>}/>
          </Routes>
        </div>
      </main>

      <footer className="border-top border-secondary py-3 text-center text-secondary">
        BASE = {import.meta.env.VITE_API}
      </footer>
    </>
  )
}
