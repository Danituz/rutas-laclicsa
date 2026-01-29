import { writable, derived } from 'svelte/store';
import { getRutasLV, getRutasSabado } from '$lib/services/db.js';

// Store para rutas de L-V
export const rutasLV = writable([]);

// Store para rutas de Sábado
export const rutasSabado = writable([]);

// Store para el tipo de día seleccionado
export const tipoDia = writable('lv'); // 'lv' o 'sabado'

// Store derivado para rutas según el tipo de día
export const rutasActuales = derived(
	[tipoDia, rutasLV, rutasSabado],
	([$tipo, $rutasLV, $rutasSabado]) => {
		return $tipo === 'lv' ? $rutasLV : $rutasSabado;
	}
);

/**
 * Carga todas las rutas desde IndexedDB
 */
export async function cargarRutas() {
	const [lv, sab] = await Promise.all([
		getRutasLV(),
		getRutasSabado()
	]);

	rutasLV.set(lv);
	rutasSabado.set(sab);

	return { lv, sab };
}

/**
 * Cambia el tipo de día visualizado
 */
export function cambiarTipoDia(tipo) {
	tipoDia.set(tipo);
}

/**
 * Detecta automáticamente si es sábado
 */
export function detectarTipoDia() {
	const hoy = new Date();
	const esSabado = hoy.getDay() === 6;
	tipoDia.set(esSabado ? 'sabado' : 'lv');
	return esSabado ? 'sabado' : 'lv';
}
