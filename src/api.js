// src/api.js
const BASE = import.meta.env.VITE_API;
const USER_ID = import.meta.env.VITE_USUARIO_ID || 1;

export async function getProductos() {
  const r = await fetch(`${BASE}/productos`);
  if (!r.ok) throw new Error('Error al obtener productos');
  return r.json();
}

export async function getCarrito() {
  const r = await fetch(`${BASE}/carrito?usuarioId=${USER_ID}`);
  if (!r.ok) throw new Error('Error al obtener carrito');
  return r.json();
}

// POST /api/carrito/items?usuarioId=1   body: {productoId, cantidad}
export async function addItem(productoId, cantidad = 1) {
  const r = await fetch(`${BASE}/carrito/items?usuarioId=${USER_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productoId, cantidad }),
  });
  if (!r.ok) throw new Error('No se pudo agregar al carrito');
  return r.json();
}

export async function updateItem(itemId, cantidad) {
  const r = await fetch(`${BASE}/carrito/items/${itemId}?usuarioId=${USER_ID}&cantidad=${cantidad}`, {
    method: 'PUT',
  });
  if (!r.ok) throw new Error('No se pudo actualizar cantidad');
  return r.json();
}

export async function removeItem(itemId) {
  const r = await fetch(`${BASE}/carrito/items/${itemId}?usuarioId=${USER_ID}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('No se pudo eliminar item');
}

export async function vaciarCarrito() {
  const r = await fetch(`${BASE}/carrito?usuarioId=${USER_ID}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('No se pudo vaciar carrito');
}
