import { writable } from 'svelte/store';
import {
	obtenerRutaCompleta,
	obtenerAsignacionesSemana,
	encontrarParadaActual,
	calcularProgreso,
	obtenerInfoDia
} from '$lib/services/rotacionService.js';

// Store para la ruta del día actual del mensajero
export const rutaHoy = writable(null);

// Store para las asignaciones de la semana
export const asignacionesSemana = writable([]);

// Store para la información del día
export const infoDia = writable(obtenerInfoDia());

// Store para la parada actual
export const paradaActual = writable(null);

// Store para el progreso del día
export const progresoDia = writable(0);

// Store para la hora actual (se actualiza cada minuto)
export const horaActual = writable(new Date());

/**
 * Carga la ruta del día para un mensajero
 */
export async function cargarRutaHoy(mensajeroId) {
	const ruta = await obtenerRutaCompleta(mensajeroId);
	rutaHoy.set(ruta);

	// Actualizar parada actual y progreso
	if (ruta?.paradas) {
		const parada = encontrarParadaActual(ruta.paradas);
		paradaActual.set(parada);

		const progreso = calcularProgreso(ruta.paradas);
		progresoDia.set(progreso);
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
 * Actualiza la información del día
 */
export function actualizarInfoDia() {
	infoDia.set(obtenerInfoDia());
}

/**
 * Actualiza la parada actual y progreso
 */
export function actualizarEstadoActual(paradas) {
	if (!paradas) return;

	const now = new Date();
	horaActual.set(now);

	const parada = encontrarParadaActual(paradas, now);
	paradaActual.set(parada);

	const progreso = calcularProgreso(paradas, now);
	progresoDia.set(progreso);
}

/**
 * Inicia la actualización automática cada minuto
 */
export function iniciarActualizacionAutomatica(paradas) {
	// Actualizar inmediatamente
	actualizarEstadoActual(paradas);

	// Actualizar cada 30 segundos
	const interval = setInterval(() => {
		actualizarEstadoActual(paradas);
	}, 30000);

	return () => clearInterval(interval);
}
