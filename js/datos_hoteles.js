const dbHoteles = [
    {
        id: 1,
        nombre: "Constance Tsarabanjina",
        ubicacion: "Isla Tsarabanjina, Noroeste",
        precio: "$450 / noche",
        img: "imagenes/constance.jpg",
        descripcion_corta: "Lujo descalzo en una isla privada virgen.",
        descripcion_larga: "Disfruta de la exclusividad en su máxima expresión. Constance Tsarabanjina es una isla sagrada donde no se requieren zapatos. Ofrece bungalows de madera de rosa con techos de paja, comida todo incluido con mariscos frescos y buceo de clase mundial.",
        servicios: ["Playa Privada", "Todo Incluido", "Buceo PADI", "Spa", "Wi-Fi"],
        // --- DATOS NUEVOS ---
        politicas: {
            checkin: "14:00 PM",
            checkout: "12:00 PM",
            cancelacion: "Reembolso completo hasta 7 días antes de la llegada.",
            mascotas: "No se permiten mascotas."
        },
        habitaciones: [
            { tipo: "Bungalow Playa Sur", capacidad: "2 Adultos", precio: "$450" },
            { tipo: "Bungalow Playa Norte", capacidad: "2 Adultos + 1 Niño", precio: "$520" }
        ],
        resenas: [
            { usuario: "Marta G.", fecha: "Oct 2024", comentario: "El paraíso en la tierra. La comida es espectacular.", rating: 5 },
            { usuario: "John Doe", fecha: "Sep 2024", comentario: "Increíble experiencia de buceo.", rating: 5 }
        ]
    },
    {
        id: 2,
        nombre: "Princesse Bora Lodge",
        ubicacion: "Isla Sainte Marie",
        precio: "$280 / noche",
        img: "imagenes/princesse.jpg",
        descripcion_corta: "Elegancia tropical y avistamiento de ballenas.",
        descripcion_larga: "Situado en un vasto palmeral junto a una laguna turquesa. Este lodge combina lujo y ecología. Es famoso por ser el mejor lugar para el avistamiento de ballenas jorobadas entre julio y septiembre.",
        servicios: ["Piscina Infinity", "Avistamiento Ballenas", "Bodega de Vinos", "Spa"],
        politicas: {
            checkin: "13:00 PM",
            checkout: "11:00 AM",
            cancelacion: "Flexible hasta 48 horas antes.",
            mascotas: "Se permiten bajo petición."
        },
        habitaciones: [
            { tipo: "Villa Confort", capacidad: "2 Personas", precio: "$280" },
            { tipo: "Villa Lujo", capacidad: "4 Personas", precio: "$400" }
        ],
        resenas: [
            { usuario: "Laura S.", fecha: "Dic 2024", comentario: "Vimos ballenas desde la piscina. Inolvidable.", rating: 5 },
            { usuario: "Pierre L.", fecha: "Nov 2024", comentario: "Muy buen servicio, aunque el wifi es lento.", rating: 4 }
        ]
    },
    {
        id: 3,
        nombre: "Ravintsara Wellness Hotel",
        ubicacion: "Nosy Be",
        precio: "$320 / noche",
        img: "imagenes/ravintsara.jpg",
        descripcion_corta: "Santuario de bienestar en un jardín botánico.",
        descripcion_larga: "Ravintsara fusiona la naturaleza exuberante con el lujo de 4 estrellas. Sus bungalows están inmersos en una vegetación densa para máxima privacidad.",
        servicios: ["Jardín Botánico", "Spa de Lujo", "Piscina", "Restaurante Gourmet"],
        politicas: {
            checkin: "14:00 PM",
            checkout: "12:00 PM",
            cancelacion: "Estricta en temporada alta.",
            mascotas: "No permitidas."
        },
        habitaciones: [
            { tipo: "Bungalow Jardín", capacidad: "2 Adultos", precio: "$320" },
            { tipo: "Suite Vista Mar", capacidad: "2 Adultos", precio: "$450" }
        ],
        resenas: [
            { usuario: "Carlos Ruiz", fecha: "Ago 2024", comentario: "El jardín es impresionante, mucha paz.", rating: 5 }
        ]
    },
    {
        id: 4,
        nombre: "Mantasaly Resort",
        ubicacion: "Norte de Madagascar",
        precio: "$200 / noche",
        img: "imagenes/mantasaly.jpg",
        descripcion_corta: "El paraíso para los amantes del Kitesurf.",
        descripcion_larga: "Ubicado en una de las mejores bahías del mundo para el Kitesurf. Mantasaly ofrece una experiencia vibrante y activa con habitaciones modernas con vistas al Océano Índico.",
        servicios: ["Escuela Kitesurf", "Gimnasio", "Piscina", "Bar de Playa"],
        politicas: {
            checkin: "15:00 PM",
            checkout: "11:00 AM",
            cancelacion: "Moderada.",
            mascotas: "Consultar con el hotel."
        },
        habitaciones: [
            { tipo: "Habitación Standard", capacidad: "2 Personas", precio: "$200" },
            { tipo: "Bungalow Familiar", capacidad: "4 Personas", precio: "$350" }
        ],
        resenas: [
            { usuario: "Mike Kite", fecha: "Ene 2025", comentario: "El mejor spot para navegar. Viento garantizado.", rating: 5 }
        ]
    },
    {
        id: 5,
        nombre: "Palissandre Côte Ouest",
        ubicacion: "Morondava",
        precio: "$180 / noche",
        img: "imagenes/palissandre.jpg",
        descripcion_corta: "La puerta de entrada a la Avenida de los Baobabs.",
        descripcion_larga: "Situado en la playa de Morondava, es el punto de partida ideal para visitar los famosos Baobabs. Bungalows construidos con materiales locales que ofrecen confort moderno.",
        servicios: ["Cerca de Baobabs", "Piscina", "Restaurante Local", "Bar"],
        politicas: {
            checkin: "12:00 PM",
            checkout: "10:00 AM",
            cancelacion: "Flexible.",
            mascotas: "No."
        },
        habitaciones: [
            { tipo: "Bungalow Piedra", capacidad: "2 Personas", precio: "$180" }
        ],
        resenas: [
            { usuario: "Ana Maria", fecha: "Feb 2024", comentario: "Ideal para ir a los Baobabs al amanecer.", rating: 4 }
        ]
    },
    {
        id: 6,
        nombre: "Anjajavy le Lodge",
        ubicacion: "Reserva Privada Anjajavy",
        precio: "$600 / noche",
        img: "imagenes/anjajavy.jpg",
        descripcion_corta: "Lujo Relais & Châteaux en una reserva natural.",
        descripcion_larga: "La joya de la corona. Un hotel exclusivo Relais & Châteaux ubicado en una península privada accesible solo por aire. Aquí los lémures juegan en los jardines.",
        servicios: ["Reserva Privada", "Pista Aterrizaje", "Relais & Châteaux", "Deportes Acuáticos"],
        politicas: {
            checkin: "A la llegada del vuelo",
            checkout: "A la salida del vuelo",
            cancelacion: "Estricta (30 días).",
            mascotas: "No permitidas por ser reserva natural."
        },
        habitaciones: [
            { tipo: "Villa Marina", capacidad: "2 Adultos + 2 Niños", precio: "$600" }
        ],
        resenas: [
            { usuario: "Sophie T.", fecha: "Mar 2024", comentario: "Vale cada centavo. Es otro mundo.", rating: 5 },
            { usuario: "Richie R.", fecha: "Dic 2024", comentario: "Servicio impecable.", rating: 5 }
        ]
    }
];