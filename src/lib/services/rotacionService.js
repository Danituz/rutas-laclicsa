import {
	getRotacionConfig,
	getRutasLV,
	getRutasSabado
} from './db.js';
import {
	startOfWeek,
	differenceInWeeks,
	format,
	isSaturday,
	parseISO
} from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Calcula la ruta asignada a un mensajero para una fecha específica
 * @param {number} mensajeroId - ID del mensajero (1-4)
 * @param {Date} fecha - Fecha a consultar
 * @returns {Promise<{rutaId: number, esSabado: boolean}>}
 */
export async function calcularRutaParaFecha(mensajeroId, fecha = new Date()) {
	const config = await getRotacionConfig();

	if (!config) {
		return { rutaId: mensajeroId, esSabado: isSaturday(fecha) };
	}

	const semanaInicio = parseISO(config.semanaInicio);
	const rotacionInicial = config.rotacionInicial || [1, 2, 3, 4];

	// Calcular inicio de semana (lunes)
	const inicioSemanaActual = startOfWeek(fecha, { weekStartsOn: 1 });
	const inicioSemanaConfig = startOfWeek(semanaInicio, { weekStartsOn: 1 });

	// Calcular semanas transcurridas
	const semanasTranscurridas = differenceInWeeks(inicioSemanaActual, inicioSemanaConfig);

	// Encontrar posición inicial del mensajero
	const posicionInicial = rotacionInicial.indexOf(mensajeroId);
	if (posicionInicial === -1) {
		return { rutaId: mensajeroId, esSabado: isSaturday(fecha) };
	}

	// Calcular nueva posicion con rotacion (maneja semanas negativas)
	const rutaId = (((posicionInicial + semanasTranscurridas) % 4) + 4) % 4 + 1;

	return {
		rutaId,
		esSabado: isSaturday(fecha)
	};
}

/**
 * Obtiene la ruta completa para un mensajero en una fecha
 */
export async function obtenerRutaCompleta(mensajeroId, fecha = new Date()) {
	const { rutaId, esSabado } = await calcularRutaParaFecha(mensajeroId, fecha);

	const rutas = esSabado ? await getRutasSabado() : await getRutasLV();
	const ruta = rutas.find((r) => r.id === rutaId);

	return {
		...ruta,
		esSabado,
		fecha: format(fecha, "EEEE d 'de' MMMM", { locale: es })
	};
}

/**
 * Obtiene las asignaciones de todos los mensajeros para una semana
 */
export async function obtenerAsignacionesSemana(fecha = new Date()) {
	const config = await getRotacionConfig();

	if (!config) {
		return [
			{ mensajeroId: 1, rutaId: 1 },
			{ mensajeroId: 2, rutaId: 2 },
			{ mensajeroId: 3, rutaId: 3 },
			{ mensajeroId: 4, rutaId: 4 }
		];
	}

	const asignaciones = [];
	for (let i = 1; i <= 4; i++) {
		const { rutaId } = await calcularRutaParaFecha(i, fecha);
		asignaciones.push({ mensajeroId: i, rutaId });
	}

	return asignaciones;
}

/**
 * Obtiene información del día actual
 */
export function obtenerInfoDia(fecha = new Date()) {
	const esSabado = isSaturday(fecha);
	const diaSemana = fecha.getDay();

	// Domingo = 0, así que si es domingo, no hay ruta
	const esDomingo = diaSemana === 0;

	return {
		fecha,
		fechaFormateada: format(fecha, "EEEE d 'de' MMMM yyyy", { locale: es }),
		esSabado,
		esDomingo,
		tipoHorario: esSabado ? 'Sábado' : 'Lunes a Viernes'
	};
}

/**
 * Encuentra la parada actual según la hora
 */
export function encontrarParadaActual(paradas, horaActual = new Date()) {
	const horaMinutos = horaActual.getHours() * 60 + horaActual.getMinutes();

	for (let i = 0; i < paradas.length; i++) {
		const parada = paradas[i];
		const [horaInicio, minInicio] = parada.hora.split(':').map(Number);
		const [horaFin, minFin] = parada.horaFin.split(':').map(Number);

		const inicioMinutos = horaInicio * 60 + minInicio;
		const finMinutos = horaFin * 60 + minFin;

		if (horaMinutos >= inicioMinutos && horaMinutos <= finMinutos) {
			return {
				paradaActual: parada,
				indiceActual: i,
				proximaParada: i < paradas.length - 1 ? paradas[i + 1] : null
			};
		}

		if (horaMinutos < inicioMinutos) {
			return {
				paradaActual: null,
				indiceActual: -1,
				proximaParada: parada,
				enCamino: true
			};
		}
	}

	// Después de la última parada
	return {
		paradaActual: null,
		indiceActual: paradas.length,
		proximaParada: null,
		turnoTerminado: true
	};
}

/**
 * Calcula el progreso del día
 */
export function calcularProgreso(paradas, horaActual = new Date()) {
	if (!paradas || paradas.length === 0) return 0;

	const horaMinutos = horaActual.getHours() * 60 + horaActual.getMinutes();

	const [horaInicio, minInicio] = paradas[0].hora.split(':').map(Number);
	const ultimaParada = paradas[paradas.length - 1];
	const [horaFin, minFin] = ultimaParada.horaFin.split(':').map(Number);

	const inicioMinutos = horaInicio * 60 + minInicio;
	const finMinutos = horaFin * 60 + minFin;

	if (horaMinutos < inicioMinutos) return 0;
	if (horaMinutos >= finMinutos) return 100;

	const progreso = ((horaMinutos - inicioMinutos) / (finMinutos - inicioMinutos)) * 100;
	return Math.min(100, Math.max(0, progreso));
}
