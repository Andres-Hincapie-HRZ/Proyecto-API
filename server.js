// 🍽️ RESTAURANTE - COCINA (Servidor Backend)
const express = require('express'); // Importamos Express (nuestro sistema de cocina)
const fs = require('fs'); // Importamos módulo para leer/escribir archivos
const app = express(); // Creamos la aplicación (abrimos el restaurante)
const PORT = 3000; // Puerto donde escucha el servidor (dirección del restaurante)
const ARCHIVO_BD = 'pedidos.json'; // Nombre del archivo que funciona como base de datos

// Configuración para recibir pedidos en formato JSON y servir archivos estáticos
app.use(express.json()); // Permite entender pedidos en formato JSON
app.use(express.static('public')); // Sirve los archivos del menú (HTML, CSS, JS)

// 📋 FUNCIONES PARA MANEJAR LA BASE DE DATOS JSON
function leerPedidos() {
  const datos = fs.readFileSync(ARCHIVO_BD, 'utf8'); // Leemos el archivo
  return JSON.parse(datos); // Convertimos texto a objeto JavaScript
}

function guardarPedidos(pedidos) {
  const datos = JSON.stringify(pedidos, null, 2); // Convertimos a texto con formato bonito
  fs.writeFileSync(ARCHIVO_BD, datos); // Guardamos en el archivo
}

// 📖 RUTA: Ver todos los pedidos (GET)
app.get('/api/pedidos', (req, res) => {
  const pedidos = leerPedidos(); // Leemos los pedidos del archivo JSON
  res.json(pedidos); // El mesero devuelve la lista de pedidos
});

// ➕ RUTA: Crear nuevo pedido (POST)
app.post('/api/pedidos', (req, res) => {
  const pedidos = leerPedidos(); // Leemos los pedidos actuales
  const nuevoPedido = {
    id: Date.now(), // ID único basado en timestamp
    platillo: req.body.platillo, // Nombre del platillo solicitado
    entregado: false // Por defecto no está entregado
  };
  pedidos.push(nuevoPedido); // Agregamos el pedido a la lista
  guardarPedidos(pedidos); // Guardamos en el archivo JSON
  res.json(nuevoPedido); // Confirmamos el pedido al cliente
});

// 🗑️ RUTA: Eliminar pedido (DELETE)
app.delete('/api/pedidos/:id', (req, res) => {
  const id = parseInt(req.params.id); // Obtenemos el ID del pedido
  let pedidos = leerPedidos(); // Leemos los pedidos actuales
  pedidos = pedidos.filter(p => p.id !== id); // Filtramos y eliminamos
  guardarPedidos(pedidos); // Guardamos los cambios en el archivo JSON
  res.json({ mensaje: 'Pedido eliminado' }); // Confirmamos eliminación
});

// 🚀 INICIAR RESTAURANTE (Servidor escuchando)
app.listen(PORT, () => console.log(`🍽️ Restaurante abierto en http://localhost:${PORT}`));
