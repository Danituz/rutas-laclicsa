import { writable } from 'svelte/store';
import { getRutasLV, getRutasSabado } from '$lib/services/db.js';

// Store para rutas de L-V
export const rutasLV = writable([]);

// Store para rutas de Sabado
export const rutasSabado = writable([]);

// Store para el tipo de dia seleccionado
export const tipoDia = writable('lv'); // 'lv' o 'sabado'

/**
 * Carga todas las rutas desde IndexedDB
 */
export async function cargarRutas() {
	const [lv, sab] = await Promise.all([getRutasLV(), getRutasSabado()]);

	rutasLV.set(lv);
	rutasSabado.set(sab);

	return { lv, sab };
}

/**
 * Cambia el tipo de dia visualizado
 */
export function cambiarTipoDia(tipo) {
	tipoDia.set(tipo);
}

/**
 * Detecta automaticamente si es sabado
 */
export function detectarTipoDia() {
	const hoy = new Date();
	const esSabado = hoy.getDay() === 6;
	tipoDia.set(esSabado ? 'sabado' : 'lv');
	return esSabado ? 'sabado' : 'lv';
}
