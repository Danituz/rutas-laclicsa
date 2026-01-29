/**
 * Rutas de Sábados
 * Tipos de parada: 'normal', 'descanso', 'comida', 'especial'
 */

export const rutasSabados = [
	{
		id: 1,
		nombre: 'Ruta 1 - Cancún',
		color: '#22C55E',
		colorName: 'green',
		paradas: [
			{ hora: '08:00', horaFin: '08:30', nombre: 'Infinity CS', tipo: 'normal' },
			{ hora: '08:30', horaFin: '09:00', nombre: 'Infinity CS', tipo: 'normal' },
			{ hora: '09:20', horaFin: '09:25', nombre: 'Arbolada', tipo: 'normal' },
			{ hora: '09:40', horaFin: '09:45', nombre: 'Viocenter', tipo: 'normal' },
			{ hora: '10:05', horaFin: '10:10', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '10:20', horaFin: '10:25', nombre: 'Infinity', tipo: 'normal' },
			{ hora: '10:35', horaFin: '10:40', nombre: 'Pabellón', tipo: 'normal' },
			{ hora: '10:45', horaFin: '10:50', nombre: 'Azuna', tipo: 'normal' },
			{ hora: '10:55', horaFin: '11:00', nombre: 'Bonampack', tipo: 'normal' },
			{ hora: '11:10', horaFin: '11:15', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '11:55', horaFin: '12:00', nombre: 'Paraíso Maya', tipo: 'normal' },
			{ hora: '12:20', horaFin: '12:25', nombre: 'Talleres', tipo: 'normal' },
			{ hora: '12:30', horaFin: '12:35', nombre: 'Colorines', tipo: 'normal' },
			{ hora: '12:40', horaFin: '12:45', nombre: 'Xelhá', tipo: 'normal' },
			{ hora: '12:50', horaFin: '12:55', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '12:55', horaFin: '13:10', nombre: 'Descanso', tipo: 'descanso' },
			{ hora: '13:15', horaFin: '13:20', nombre: 'Infinity', tipo: 'normal' },
			{ hora: '13:25', horaFin: '13:30', nombre: 'Pabellón', tipo: 'normal' },
			{ hora: '13:45', horaFin: '13:50', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '13:50', horaFin: '13:55', nombre: 'Entrega', tipo: 'especial' },
			{ hora: '14:00', horaFin: '14:00', nombre: 'Fin de turno', tipo: 'especial' }
		]
	},
	{
		id: 2,
		nombre: 'Ruta 2 - Playa',
		color: '#10B981',
		colorName: 'emerald',
		paradas: [
			{ hora: '08:00', horaFin: '08:30', nombre: 'Salida a Playa', tipo: 'especial' },
			{ hora: '08:30', horaFin: '09:00', nombre: 'Salida a Playa', tipo: 'especial' },
			{ hora: '09:00', horaFin: '09:05', nombre: 'Villas del Sol', tipo: 'normal' },
			{ hora: '09:20', horaFin: '09:25', nombre: 'Playacar', tipo: 'normal' },
			{ hora: '09:30', horaFin: '09:35', nombre: 'Playa Federal', tipo: 'normal' },
			{ hora: '09:40', horaFin: '09:45', nombre: 'Playa Centro', tipo: 'normal' },
			{ hora: '10:00', horaFin: '10:05', nombre: 'Nash', tipo: 'normal' },
			{ hora: '11:15', horaFin: '11:20', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '11:25', horaFin: '11:40', nombre: 'Descanso', tipo: 'descanso' },
			{ hora: '11:50', horaFin: '11:55', nombre: 'Luna', tipo: 'normal' },
			{ hora: '12:00', horaFin: '12:05', nombre: 'Santa Fe', tipo: 'normal' },
			{ hora: '12:20', horaFin: '12:25', nombre: 'Viocenter', tipo: 'normal' },
			{ hora: '12:45', horaFin: '12:50', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '13:10', horaFin: '13:15', nombre: 'Cumbres', tipo: 'normal' },
			{ hora: '13:35', horaFin: '13:40', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '13:45', horaFin: '13:50', nombre: 'Entrega', tipo: 'especial' },
			{ hora: '14:00', horaFin: '14:00', nombre: 'Fin de turno', tipo: 'especial' }
		]
	},
	{
		id: 3,
		nombre: 'Ruta 3 - Cancún 2',
		color: '#EAB308',
		colorName: 'yellow',
		paradas: [
			{ hora: '08:00', horaFin: '08:30', nombre: 'Paqueteria Merida', tipo: 'normal' },
			{ hora: '08:30', horaFin: '09:00', nombre: 'Paqueteria Merida', tipo: 'normal' },
			{ hora: '09:20', horaFin: '09:25', nombre: 'Santa Fe', tipo: 'normal' },
			{ hora: '09:30', horaFin: '09:35', nombre: 'Luna', tipo: 'normal' },
			{ hora: '10:05', horaFin: '10:10', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '10:30', horaFin: '10:35', nombre: 'Talleres', tipo: 'normal' },
			{ hora: '10:40', horaFin: '10:45', nombre: 'Colorines', tipo: 'normal' },
			{ hora: '10:50', horaFin: '10:55', nombre: 'Xelhá', tipo: 'normal' },
			{ hora: '11:00', horaFin: '11:05', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '11:30', horaFin: '11:35', nombre: 'Cumbres', tipo: 'normal' },
			{ hora: '11:40', horaFin: '11:45', nombre: 'Colosio', tipo: 'normal' },
			{ hora: '12:05', horaFin: '12:10', nombre: 'Arbolada', tipo: 'normal' },
			{ hora: '12:30', horaFin: '12:35', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '12:40', horaFin: '13:05', nombre: 'Descanso', tipo: 'descanso' },
			{ hora: '13:15', horaFin: '13:20', nombre: 'Azuna', tipo: 'normal' },
			{ hora: '13:25', horaFin: '13:30', nombre: 'Bonampack', tipo: 'normal' },
			{ hora: '13:45', horaFin: '13:50', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '13:50', horaFin: '13:55', nombre: 'Entrega', tipo: 'especial' },
			{ hora: '13:55', horaFin: '14:00', nombre: 'Fin de turno', tipo: 'especial' }
		]
	},
	{
		id: 4,
		nombre: 'Ruta 4 - Tulum',
		color: '#F43F5E',
		colorName: 'rose',
		paradas: [
			{ hora: '08:00', horaFin: '08:00', nombre: 'Salida a Tulum', tipo: 'especial' },
			{ hora: '10:00', horaFin: '10:05', nombre: 'Tulum', tipo: 'normal' },
			{ hora: '10:40', horaFin: '10:45', nombre: 'Puerto Aventuras', tipo: 'normal' },
			{ hora: '11:05', horaFin: '11:10', nombre: 'Playacar', tipo: 'normal' },
			{ hora: '11:15', horaFin: '11:20', nombre: 'Playa Federal', tipo: 'normal' },
			{ hora: '11:35', horaFin: '11:40', nombre: 'Villas del Sol', tipo: 'normal' },
			{ hora: '12:00', horaFin: '12:05', nombre: 'Nash', tipo: 'normal' },
			{ hora: '12:20', horaFin: '12:35', nombre: 'Playa Centro', tipo: 'normal' },
			{ hora: '12:35', horaFin: '12:50', nombre: 'Descanso', tipo: 'descanso' },
			{ hora: '12:50', horaFin: '13:05', nombre: 'Cozumel', tipo: 'normal' },
			{ hora: '13:40', horaFin: '13:45', nombre: 'Palmas', tipo: 'normal' },
			{ hora: '13:50', horaFin: '13:55', nombre: 'Entrega', tipo: 'especial' },
			{ hora: '14:00', horaFin: '14:00', nombre: 'Fin de turno', tipo: 'especial' }
		]
	}
];
