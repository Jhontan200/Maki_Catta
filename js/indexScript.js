document.addEventListener('DOMContentLoaded', () => {
    // --- 1. REFERENCIAS ---
    const videoPlayer = document.getElementById('video-background-player');
    const weatherContainer = document.getElementById('weather-container');
    
    // --- 2. CONFIGURACIÓN ---
    const API_KEY = 'c2f1a30c08bf1465f982f10da498c31a'; 
    const CITY_ID = '1062947'; // Antananarivo
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&units=metric&lang=es&APPID=${API_KEY}`;

    // --- 3. LÓGICA DEL VIDEO ---
    const videoPlaylist = ['video/VideoFondo']; 
    let current = -1;

    const playVideo = () => {
        if (!videoPlayer) return;
        videoPlayer.style.opacity = '0';
        setTimeout(() => {
            videoPlayer.innerHTML = '';
            current = (current + 1) % videoPlaylist.length;
            const src = document.createElement('source');
            src.src = `${videoPlaylist[current]}.mp4`;
            src.type = 'video/mp4';
            videoPlayer.appendChild(src);
            videoPlayer.load();
            videoPlayer.oncanplay = () => {
                videoPlayer.play().catch(() => {});
                videoPlayer.style.opacity = '1';
            };
        }, 500);
    };

    if (videoPlayer) {
        videoPlaylist.length === 1 ? videoPlayer.loop = true : videoPlayer.addEventListener('ended', playVideo);
        playVideo();
    }

    // --- 4. LÓGICA DE CLIMA (5 DÍAS) ---
    async function getWeeklyWeather() {
        if (!weatherContainer) return;

        try {
            const response = await fetch(forecastURL);
            if (!response.ok) throw new Error('Status: ' + response.status);
            
            const data = await response.json();
            
            // Filtramos para obtener el clima del mediodía de cada día
            const dailyForecast = data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
            renderForecast(dailyForecast);

        } catch (error) {
            console.error("Weather Error:", error);
            // Datos Fake si la API falla (Modo Demo)
            const demoDays = Array(5).fill({
                main: { temp: 25 },
                weather: [{ icon: '01d', description: 'Despejado' }],
                dt: Date.now() / 1000
            });
            renderForecast(demoDays, true);
        }
    }

    function renderForecast(days, isDemo = false) {
        weatherContainer.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4 animate-fade-in">
                ${days.map((day, index) => {
                    const date = new Date(day.dt * 1000);
                    const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' });
                    
                    return `
                        <div class="bg-gray-50 dark:bg-[#221d1a] p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center hover:scale-105 transition-transform duration-300" 
                             style="animation-delay: ${index * 100}ms">
                            <span class="text-secondary font-bold text-xs uppercase tracking-tighter mb-2">${dayName}</span>
                            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="icono" class="w-16 h-16">
                            <span class="text-3xl font-display font-bold text-primary dark:text-white">${Math.round(day.main.temp)}°C</span>
                            <p class="text-[10px] text-gray-500 dark:text-gray-400 capitalize mt-2 text-center">${day.weather[0].description}</p>
                        </div>
                    `;
                }).join('')}
            </div>
            ${isDemo ? '<p class="text-[10px] text-orange-500 mt-4 italic">Mostrando datos de ejemplo (API no activa aún)</p>' : ''}
        `;
    }

    getWeeklyWeather();
});