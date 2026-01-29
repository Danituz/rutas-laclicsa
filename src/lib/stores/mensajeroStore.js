import { writable, derived } from 'svelte/store';
import { getMensajeros, getPerfilActual, setPerfilActual } from '$lib/services/db.js';

// Store para el mensajero actual seleccionado
export const mensajeroActualId = writable(1);

// Store para la lista de mensajeros
export const mensajeros = writable([]);

// Store derivado para el mensajero actual
export const mensajeroActual = derived(
	[mensajeroActualId, mensajeros],
	([$id, $mensajeros]) => {
		return $mensajeros.find(m => m.id === $id) || { id: 1, nombre: 'Mensajero 1' };
	}
);

/**
 * Carga los mensajeros desde IndexedDB
 */
export async function cargarMensajeros() {
	const lista = await getMensajeros();
	mensajeros.set(lista);
	return lista;
}

/**
 * Carga el perfil actual desde IndexedDB
 */
export async function cargarPerfilActual() {
	const id = await getPerfilActual();
	mensajeroActualId.set(id);
	return id;
}

/**
 * Cambia el mensajero actual
 */
export async function cambiarMensajero(id) {
	await setPerfilActual(id);
	mensajeroActualId.set(id);
}
