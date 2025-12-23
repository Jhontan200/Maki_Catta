import { restaurantService } from './services/restaurantService.js';

async function cargarPuntuaciones() {
    // 1. Usamos el servicio que ya maneja la lógica de Supabase y el JSON
    const restaurantes = await restaurantService.getAllRestaurants();

    if (!restaurantes || restaurantes.length === 0) {
        console.error('No se pudieron obtener los datos de los restaurantes.');
        return;
    }

    // 2. Buscamos todos los elementos con la clase score-value
    const scoreElements = document.querySelectorAll('.score-value');

    scoreElements.forEach(element => {
        const restaurantId = element.getAttribute('data-id');

        // 3. Buscamos el restaurante en la lista ya procesada por el servicio
        // Importante: restaurantId del DOM es String, lo pasamos a Number
        const restaurantData = restaurantes.find(r => r.id == restaurantId);

        if (restaurantData) {
            // El servicio ya nos devuelve 'puntuacion' formateada con toFixed(1)
            element.textContent = restaurantData.puntuacion;
        } else {
            element.textContent = "0.0";
        }
    });
}

// Ejecución al cargar el DOM
document.addEventListener('DOMContentLoaded', cargarPuntuaciones);