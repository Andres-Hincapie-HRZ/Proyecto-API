// 🍽️ RESTAURANTE - MESERO (Frontend JavaScript)
// Al cargar la página, mostramos todos los pedidos
cargarPedidos(); // Llamamos a la función para cargar pedidos cuando se carga la página
// 📋 FUNCIÓN: Cargar y mostrar todos los pedidos
async function cargarPedidos() {
    const respuesta = await fetch('/api/pedidos'); // Hacemos petición HTTP GET al servidor para obtener todos los pedidos
    const pedidos = await respuesta.json(); // Convertimos la respuesta HTTP a formato JSON para poder trabajar con los datos
    const lista = document.getElementById('listaPedidos'); // Obtenemos referencia al elemento HTML con id 'listaPedidos'
    lista.innerHTML = ''; // Vaciamos completamente el contenido HTML del elemento lista

    // Recorremos cada pedido y lo mostramos en pantalla
    pedidos.forEach(pedido => { // Iteramos sobre cada pedido del array de pedidos
        const li = document.createElement('li'); // Creamos un nuevo elemento HTML de tipo lista (li)
        // Establecemos el contenido HTML interno del elemento li
        li.innerHTML = `
            <span>🍽️ ${pedido.platillo}</span>
            <button class="btn-eliminar" onclick="eliminarPedido(${pedido.id})">Cancelar</button>
        `;
        lista.appendChild(li); // Agregamos el elemento li como hijo del elemento lista en el DOM
    });
}

// ➕ FUNCIÓN: Agregar nuevo pedido
async function agregarPedido() {
    const input = document.getElementById('nuevoPedido'); // Obtenemos referencia al elemento input con id 'nuevoPedido'
    const platillo = input.value.trim(); // Extraemos el valor del input y eliminamos espacios en blanco al inicio y final
    if (!platillo) return; // Si el platillo está vacío o es null/undefined, salimos de la función sin hacer nada
    // Enviamos el pedido a la cocina (servidor)
    await fetch('/api/pedidos', { // Hacemos petición HTTP POST al endpoint de pedidos
        method: 'POST', // Especificamos que es una petición POST para crear un nuevo recurso
        headers: { 'Content-Type': 'application/json' }, // Establecemos el header para indicar que enviamos datos JSON
        body: JSON.stringify({ platillo }) // Convertimos el objeto JavaScript a string JSON para enviarlo en el cuerpo de la petición
    });
    input.value = ''; // Limpiamos el campo de input estableciendo su valor como string vacío
    cargarPedidos(); // Llamamos a cargarPedidos para actualizar la lista con el nuevo pedido agregado
}

// 🗑️ FUNCIÓN: Eliminar pedido
async function eliminarPedido(id) {
    await fetch(`/api/pedidos/${id}`, { method: 'DELETE' }); // Hacemos petición HTTP DELETE al endpoint específico del pedido usando template literals para incluir el id
    cargarPedidos(); // Recargamos la lista llamando a cargarPedidos para reflejar los cambios tras la eliminación
}

// ⌨️ Permitir agregar pedido presionando Enter
document.getElementById('nuevoPedido').addEventListener('keypress', (e) => { // Obtenemos el input y le agregamos un event listener para el evento keypress
    if (e.key === 'Enter') agregarPedido(); // Verificamos si la tecla presionada es Enter y si es así, llamamos a agregarPedido
});
