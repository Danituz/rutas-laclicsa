/**
 * Rutas de Lunes a Viernes
 * Tipos de parada: 'normal', 'descanso', 'comida', 'especial'
 */

export const rutasLunesViernes = [
	{
		id: 1,
		nombre: 'Ruta 1 - Cancún',
		color: '#22C55E',
		colorName: 'green',
		paradas: [
			{ hora: '08:00', horaFin: '08:30', nombre: 'E-30 MIN', tipo: 'descanso' },
			{ hora: '08:50', horaFin: '09:00', nombre: 'Arbolada', tipo: 'normal' },
			{ hora: '09:15', horaFin: '09:20', nombre: 'Viocenter', tipo: 'normal' },
			{ hora: '09:30', horaFin: '09:35', nombre: 'Santa Fe', tipo: 'normal' },
			{ hora: '09:50', horaFin: '09:55', nombre: 'Luna', tipo: 'normal' },
			{ hora: '10:05', horaFin: '10:15', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '10:35', horaFin: '10:40', nombre: 'Cumbres', tipo: 'normal' },
			{ hora: '10:50', horaFin: '10:55', nombre: 'Colosio', tipo: 'normal' },
			{ hora: '11:15', horaFin: '11:20', nombre: 'Pabellón', tipo: 'normal' },
			{ hora: '11:25', horaFin: '11:30', nombre: 'Infinity', tipo: 'normal' },
			{ hora: '11:35', horaFin: '11:40', nombre: 'Azuna', tipo: 'normal' },
			{ hora: '11:45', horaFin: '11:50', nombre: 'Bonampack', tipo: 'normal' },
			{ hora: '12:05', horaFin: '12:15', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '12:15', horaFin: '12:40', nombre: 'Comida', tipo: 'comida' },
			{ hora: '13:10', horaFin: '13:15', nombre: 'Paraíso Maya', tipo: 'normal' },
			{ hora: '13:35', horaFin: '13:45', nombre: 'Talleres', tipo: 'normal' },
			{ hora: '13:50', horaFin: '13:55', nombre: 'Colorines', tipo: 'normal' },
			{ hora: '14:00', horaFin: '14:05', nombre: 'Xelhá', tipo: 'normal' },
			{ hora: '14:10', horaFin: '14:20', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '14:25', horaFin: '14:55', nombre: 'E - 30 MIN', tipo: 'descanso' },
			{ hora: '14:55', horaFin: '15:20', nombre: 'E - 25 MIN', tipo: 'descanso' },
			{ hora: '15:30', horaFin: '15:35', nombre: 'Bonampack', tipo: 'normal' },
			{ hora: '15:40', horaFin: '15:45', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '15:45', horaFin: '16:00', nombre: 'Entrega', tipo: 'especial' },
			{ hora: '16:00', horaFin: '16:00', nombre: 'Fin de turno', tipo: 'especial' }
		]
	},
	{
		id: 2,
		nombre: 'Ruta 2 - Playa',
		color: '#10B981',
		colorName: 'emerald',
		paradas: [
			{ hora: '08:00', horaFin: '08:00', nombre: 'Salida a Playa', tipo: 'especial' },
			{ hora: '09:40', horaFin: '09:45', nombre: 'Villas del Sol', tipo: 'normal' },
			{ hora: '10:05', horaFin: '10:10', nombre: 'Playacar', tipo: 'normal' },
			{ hora: '10:15', horaFin: '10:20', nombre: 'Playa Federal', tipo: 'normal' },
			{ hora: '10:25', horaFin: '10:30', nombre: 'Playa Centro', tipo: 'normal' },
			{ hora: '10:40', horaFin: '10:45', nombre: 'Nash', tipo: 'normal' },
			{ hora: '12:25', horaFin: '12:35', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '12:40', horaFin: '13:05', nombre: 'Comida', tipo: 'comida' },
			{ hora: '13:10', horaFin: '13:30', nombre: 'Paquetería Merida', tipo: 'normal' },
			{ hora: '13:35', horaFin: '13:45', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '13:45', horaFin: '14:05', nombre: 'E - 20 MIN', tipo: 'descanso' },
			{ hora: '14:20', horaFin: '14:25', nombre: 'Arbolada', tipo: 'normal' },
			{ hora: '14:35', horaFin: '14:40', nombre: 'Viocenter', tipo: 'normal' },
			{ hora: '14:50', horaFin: '14:55', nombre: 'Luna', tipo: 'normal' },
			{ hora: '15:10', horaFin: '15:20', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '15:20', horaFin: '15:45', nombre: 'E - 25 MIN', tipo: 'descanso' },
			{ hora: '15:45', horaFin: '16:00', nombre: 'Entrega', tipo: 'especial' },
			{ hora: '16:00', horaFin: '16:00', nombre: 'Fin de turno', tipo: 'especial' }
		]
	},
	{
		id: 3,
		nombre: 'Ruta 3 - Cancún 2',
		color: '#EAB308',
		colorName: 'yellow',
		paradas: [
			{ hora: '08:00', horaFin: '08:40', nombre: 'Infinity CS', tipo: 'normal' },
			{ hora: '08:50', horaFin: '09:05', nombre: 'Bonampack', tipo: 'normal' },
			{ hora: '09:15', horaFin: '09:20', nombre: 'Pabellón', tipo: 'normal' },
			{ hora: '09:40', horaFin: '09:45', nombre: 'Talleres', tipo: 'normal' },
			{ hora: '09:50', horaFin: '09:55', nombre: 'Colorines', tipo: 'normal' },
			{ hora: '10:05', horaFin: '10:15', nombre: 'Xelhá', tipo: 'normal' },
			{ hora: '10:15', horaFin: '10:25', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '11:05', horaFin: '11:10', nombre: 'Paraíso Maya', tipo: 'normal' },
			{ hora: '11:30', horaFin: '11:35', nombre: 'Viocenter', tipo: 'normal' },
			{ hora: '11:45', horaFin: '11:50', nombre: 'Arbolada', tipo: 'normal' },
			{ hora: '12:05', horaFin: '12:15', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '12:15', horaFin: '12:40', nombre: 'Comida', tipo: 'comida' },
			{ hora: '12:50', horaFin: '12:55', nombre: 'Luna', tipo: 'normal' },
			{ hora: '13:10', horaFin: '13:15', nombre: 'Santa Fe', tipo: 'normal' },
			{ hora: '13:25', horaFin: '13:30', nombre: 'Cumbres', tipo: 'normal' },
			{ hora: '13:45', horaFin: '13:50', nombre: 'Infinity', tipo: 'normal' },
			{ hora: '14:00', horaFin: '14:05', nombre: 'Azuna', tipo: 'normal' },
			{ hora: '14:15', horaFin: '14:25', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '14:30', horaFin: '15:15', nombre: 'E - 45 MIN', tipo: 'descanso' },
			{ hora: '15:25', horaFin: '15:35', nombre: 'Pabellón', tipo: 'normal' },
			{ hora: '15:40', horaFin: '15:45', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '15:45', horaFin: '16:00', nombre: 'Entrega', tipo: 'especial' },
			{ hora: '16:00', horaFin: '16:00', nombre: 'Fin de turno', tipo: 'especial' }
		]
	},
	{
		id: 4,
		nombre: 'Ruta 4 - Tulum',
		color: '#F43F5E',
		colorName: 'rose',
		paradas: [
			{ hora: '08:00', horaFin: '08:00', nombre: 'Salida a Tulum', tipo: 'especial' },
			{ hora: '10:40', horaFin: '10:45', nombre: 'Tulum', tipo: 'normal' },
			{ hora: '11:20', horaFin: '11:25', nombre: 'Puerto Aventuras', tipo: 'normal' },
			{ hora: '11:55', horaFin: '12:00', nombre: 'Playacar', tipo: 'normal' },
			{ hora: '12:05', horaFin: '12:10', nombre: 'Playa Federal', tipo: 'normal' },
			{ hora: '12:15', horaFin: '12:20', nombre: 'Playa Centro', tipo: 'normal' },
			{ hora: '12:25', horaFin: '12:35', nombre: 'Cozumel', tipo: 'normal' },
			{ hora: '12:50', horaFin: '12:55', nombre: 'Villas del Sol', tipo: 'normal' },
			{ hora: '13:15', horaFin: '13:30', nombre: 'Nash', tipo: 'normal' },
			{ hora: '14:40', horaFin: '14:50', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '14:50', horaFin: '15:15', nombre: 'Comida', tipo: 'comida' },
			{ hora: '15:20', horaFin: '15:45', nombre: 'E - 30 MIN', tipo: 'descanso' },
			{ hora: '15:45', horaFin: '16:00', nombre: 'Entrega', tipo: 'especial' },
			{ hora: '16:00', horaFin: '16:00', nombre: 'Fin de turno', tipo: 'especial' }
		]
	}
];
