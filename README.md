Frontend – Mini Comercio (React + Vite + Bootstrap Dark)

Interfaz web oscura y elegante para el mini e-commerce.
Consume la API Spring Boot: http://localhost:8080/api.

🚀 Tecnologías

React + Vite

Bootstrap 5 (tema oscuro)

React Router DOM

(Opcional) bootstrap-icons

🧩 Requisitos

Node.js 18+

Backend corriendo en http://localhost:8080 con CORS habilitado

⚙️ Configuración rápida

Clonar e instalar

git clone <tu-repo-front>
cd <carpeta-del-front>
npm i


Variables de entorno (crear archivo .env en la raíz):

# URL base del backend
VITE_API=http://localhost:8080/api

# Usuario “simulado” para el carrito
VITE_USUARIO_ID=1


(Opcional) Íconos Bootstrap

npm i bootstrap-icons

▶️ Scripts
# ambiente de desarrollo
npm run dev

# build de producción
npm run build

# previsualizar build local
npm run preview


Vite suele abrir en http://localhost:5173 (puede variar a 5174/5175).

🗂️ Estructura principal
src/
  api.js                 # funciones para llamar al backend
  App.jsx                # layout + rutas
  main.jsx               # arranque (Bootstrap & Router)
  pages/
    Productos.jsx        # grid de productos + "Agregar al carrito"
    Carrito.jsx          # ver/actualizar/vaciar carrito

🔌 Endpoints usados (contrato esperado)

Ajusta si tus DTO cambian.

GET /api/productos → lista de:

[{ "id":1, "nombre":"Polera", "descripcion":"...", "precio":14990, "stock":20 }]


GET /api/carrito?usuarioId=:id →

{ "items":[
    { "id":10, "productoId":1, "productoNombre":"Polera", "cantidad":2, "precioUnitario":14990, "subtotal":29980 }
  ],
  "total": 29980
}


POST /api/carrito/items?usuarioId=:id
Body: { "productoId": 1, "cantidad": 1 } → 200 con carrito actualizado.

PUT /api/carrito/items/:itemId?usuarioId=:id&cantidad=:n → 200 con carrito actualizado.

DELETE /api/carrito/items/:itemId?usuarioId=:id → 204.

DELETE /api/carrito?usuarioId=:id → 204 vacía carrito.

(Si tienes Pedido/checkout, se puede agregar luego.)

🎨 Estilos

Bootstrap 5 (tema oscuro): en index.html se usa data-bs-theme="dark".

Importes en main.jsx:

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// opcional
import 'bootstrap-icons/font/bootstrap-icons.css'

🧪 Prueba rápida

Levanta backend (./gradlew bootRun).

npm run dev

Abre Productos, agrega artículos y revisa Carrito.

🛡️ CORS (si ves “Error: No se pudo obtener”)

Asegúrate de permitir el puerto de Vite en el backend. Ejemplo en Spring:

registry.addMapping("/api/**")
  .allowedOriginPatterns("http://localhost:*")
  .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
  .allowedHeaders("*")
  .allowCredentials(true);

🧭 Roadmap (ideas próximas)

Página de Checkout → POST /api/pedidos/checkout

Filtro por Categoría

Toasts de éxito/error

Autenticación simple

Deploy: Netlify/Vercel (front) + Render/Fly.io (back)
