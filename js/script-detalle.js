// --- CONFIGURACIÓN ---
const API_KEY = 'c2f1a30c08bf1465f982f10da498c31a';
const TELEFONO_WHATSAPP = "1234567890"; // Reemplaza con tu número (ej: 34600000000)

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'nosy-be';

    fetch('json/destinos.json')
        .then(res => res.json())
        .then(data => {
            const dest = data[id];
            if (!dest) { window.location.href = 'destinos2.html'; return; }

            // 1. Datos Dinámicos Básicos
            document.title = `${dest.titulo} - Maki Catta`;
            document.getElementById('dest-titulo').innerText = dest.titulo;
            document.getElementById('dest-tagline').innerText = dest.tagline;
            document.getElementById('dest-desc').innerText = dest.descripcion;
            document.getElementById('dest-precio').innerText = `$${dest.precio}`;
            document.getElementById('dest-precio-det').innerText = dest.precioDetalle;
            document.getElementById('dest-duracion').innerText = dest.duracion;
            document.getElementById('dest-idiomas').innerText = dest.idiomas;

            // --- LÓGICA WHATSAPP ---
            const mensajeWa = encodeURIComponent(`¡Hola! Me gustaría reservar el tour: *${dest.titulo}* ($${dest.precio}).`);
            const btnWa = document.getElementById('btn-whatsapp');
            if (btnWa) {
                btnWa.href = `https://wa.me/${TELEFONO_WHATSAPP}?text=${mensajeWa}`;
            }

            // 2. Banner
            const banner = document.getElementById('dest-banner');
            banner.src = dest.bannerImg;
            banner.onload = () => banner.classList.remove('opacity-0');

            // 3. Info Adicional y Cancelación
            document.getElementById('dest-fady').innerText = dest.infoAdicional;
            document.getElementById('dest-cancel').innerText = dest.cancelacion;

            // 4. Ventajas
            document.getElementById('dest-ventajas').innerHTML = dest.porQueElegir.map(v => `
                <div class="flex gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
                    <span class="material-symbols-outlined text-[#3E2723]">stars</span>
                    <span class="text-[17px] font-medium">${v}</span>
                </div>
            `).join('');

            // 5. Itinerario
            document.getElementById('itin-list').innerHTML = dest.itinerario.map(step => `
                <div class="relative pl-8">
                    <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-white dark:border-card-dark"></div>
                    <h4 class="font-bold text-primary dark:text-white uppercase text-[20px] tracking-widest mb-1">${step.punto}</h4>
                    <p class="text-[17px] text-secondary font-bold mb-1">${step.tiempo}</p>
                    <p class="text-[15px] text-gray-500 leading-relaxed">${step.desc}</p>
                </div>
            `).join('');

            // 6. Incluye
            document.getElementById('incluye-lista').innerHTML = dest.incluido.map(i => `
                <div class="flex items-center gap-3 text-[15px] text-gray-600">
                    <span class="material-symbols-outlined text-green-500 text-lg">check_circle</span> ${i}
                </div>
            `).join('');

            // 7. Galería
            const mainImg = document.getElementById('main-img');
            mainImg.src = dest.imagenes[0];
            document.getElementById('thumb-grid').innerHTML = dest.imagenes.map((src, idx) => `
                <div class="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer hover:ring-2 ring-accent transition-all ${idx === 0 ? 'ring-2' : ''}">
                    <img src="${src}" class="w-full h-full object-cover" onclick="updateMainImg('${src}', this)" alt="Miniatura">
                </div>
            `).join('');

            // 8. Lógica del Modal
            const modal = document.getElementById('image-modal');
            const modalImg = document.getElementById('modal-img');
            if (mainImg) {
                mainImg.addEventListener('click', () => {
                    modalImg.src = mainImg.src;
                    modal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                });
            }

            // 9. Cargar Pronóstico del Tiempo
            if (dest.weatherId) {
                fetchWeather(dest.weatherId);
            } else {
                document.getElementById('weather-forecast').innerHTML = '<p class="text-xs">Clima no disponible</p>';
            }
        })
        .catch(err => console.error("Error cargando el JSON:", err));
});

// --- FUNCIONES PARA EL CLIMA ---
async function fetchWeather(cityId) {
    const container = document.getElementById('weather-forecast');
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=metric&lang=es&APPID=${API_KEY}`);
        if (!response.ok) throw new Error('Error en API');
        
        const data = await response.json();
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        container.innerHTML = dailyData.map(day => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            const icon = day.weather[0].icon;
            const desc = day.weather[0].description;

            return `
                <div class="flex items-center justify-between p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent hover:border-accent/30 transition-all">
                    <div class="flex items-center gap-3">
                        <span class="text-sm font-bold uppercase w-8 text-secondary dark:text-accent">${dayName}</span>
                        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="clima" class="w-10 h-10">
                    </div>
                    <div class="text-right">
                        <span class="text-lg font-bold text-primary dark:text-white">${temp}°C</span>
                        <p class="text-[10px] text-gray-500 capitalize leading-none">${desc}</p>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        container.innerHTML = '<p class="text-xs text-red-400">Error al cargar el clima.</p>';
    }
}

// --- FUNCIONES GLOBALES ---
function updateMainImg(src, el) {
    const main = document.getElementById('main-img');
    main.style.opacity = '0';
    setTimeout(() => { 
        main.src = src; 
        main.style.opacity = '1'; 
    }, 200);
    document.querySelectorAll('#thumb-grid div').forEach(d => d.classList.remove('ring-2'));
    el.parentElement.classList.add('ring-2');
}

function openTab(evt, tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active', 'border-primary', 'text-primary', 'dark:text-accent'));
    
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active', 'border-primary', 'text-primary', 'dark:text-accent');
}

// Cerrar Modal
const modalClose = document.getElementById('image-modal');
if (modalClose) {
    modalClose.addEventListener('click', function () {
        this.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
}