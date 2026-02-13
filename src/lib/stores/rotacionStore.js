import { writable } from 'svelte/store';
import {
	obtenerRutaCompleta,
	obtenerAsignacionesSemana,
	encontrarParadaActual
} from '$lib/services/rotacionService.js';

// Store para la ruta del dia actual del mensajero
export const rutaHoy = writable(null);

// Store para las asignaciones de la semana
export const asignacionesSemana = writable([]);

// Store para la parada actual
export const paradaActual = writable(null);

/**
 * Carga la ruta del dia para un mensajero
 */
export async function cargarRutaHoy(mensajeroId) {
	const ruta = await obtenerRutaCompleta(mensajeroId);
	rutaHoy.set(ruta);

	if (ruta?.paradas) {
		const parada = encontrarParadaActual(ruta.paradas);
		paradaActual.set(parada);
	}

	return ruta;
}

/**
 * Carga las asignaciones de la semana
 */
export async function cargarAsignacionesSemana() {
	const asignaciones = await obtenerAsignacionesSemana();
	asignacionesSemana.set(asignaciones);
	return asignaciones;
}

/**
 * Actualiza la parada actual
 */
export function actualizarEstadoActual(paradas) {
	if (!paradas) return;
	const parada = encontrarParadaActual(paradas, new Date());
	paradaActual.set(parada);
}

/**
 * Inicia la actualizacion automatica cada 30 segundos
 */
export function iniciarActualizacionAutomatica(paradas) {
	actualizarEstadoActual(paradas);

	const interval = setInterval(() => {
		actualizarEstadoActual(paradas);
	}, 30000);

	return () => clearInterval(interval);
}
