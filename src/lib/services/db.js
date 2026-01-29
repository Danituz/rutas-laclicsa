import { openDB } from 'idb';
import { rutasLunesViernes } from '$lib/data/rutasLunesViernes.js';
import { rutasSabados } from '$lib/data/rutasSabados.js';
import { mensajerosDefault } from '$lib/data/mensajeros.js';

const DB_NAME = 'mensajeros-db';
const DB_VERSION = 1;

let dbPromise = null;

/**
 * Inicializa y retorna la base de datos
 */
export async function getDB() {
	if (!dbPromise) {
		dbPromise = openDB(DB_NAME, DB_VERSION, {
			upgrade(db) {
				// Store para rutas L-V
				if (!db.objectStoreNames.contains('rutasLV')) {
					db.createObjectStore('rutasLV', { keyPath: 'id' });
				}

				// Store para rutas Sábado
				if (!db.objectStoreNames.contains('rutasSabado')) {
					db.createObjectStore('rutasSabado', { keyPath: 'id' });
				}

				// Store para mensajeros
				if (!db.objectStoreNames.contains('mensajeros')) {
					db.createObjectStore('mensajeros', { keyPath: 'id' });
				}

				// Store para configuración
				if (!db.objectStoreNames.contains('config')) {
					db.createObjectStore('config', { keyPath: 'key' });
				}

				// Store para historial de rotaciones
				if (!db.objectStoreNames.contains('historialRotaciones')) {
					const store = db.createObjectStore('historialRotaciones', {
						keyPath: 'id',
						autoIncrement: true
					});
					store.createIndex('fecha', 'fecha');
				}
			}
		});
	}
	return dbPromise;
}

/**
 * Inicializa los datos por defecto si no existen
 */
export async function initializeData() {
	const db = await getDB();

	// Verificar si ya hay datos
	const rutasLVCount = await db.count('rutasLV');
	if (rutasLVCount === 0) {
		const tx = db.transaction('rutasLV', 'readwrite');
		for (const ruta of rutasLunesViernes) {
			await tx.store.put(ruta);
		}
		await tx.done;
	}

	const rutasSabCount = await db.count('rutasSabado');
	if (rutasSabCount === 0) {
		const tx = db.transaction('rutasSabado', 'readwrite');
		for (const ruta of rutasSabados) {
			await tx.store.put(ruta);
		}
		await tx.done;
	}

	const mensajerosCount = await db.count('mensajeros');
	if (mensajerosCount === 0) {
		const tx = db.transaction('mensajeros', 'readwrite');
		for (const m of mensajerosDefault) {
			await tx.store.put(m);
		}
		await tx.done;
	}

	// Configuración por defecto
	const config = await db.get('config', 'rotacionConfig');
	if (!config) {
		await db.put('config', {
			key: 'rotacionConfig',
			semanaInicio: new Date().toISOString(),
			rotacionInicial: [1, 2, 3, 4] // Mensajero 1 -> Ruta 1, etc.
		});
	}

	const perfil = await db.get('config', 'perfilActual');
	if (!perfil) {
		await db.put('config', {
			key: 'perfilActual',
			mensajeroId: 1
		});
	}
}

// ========== RUTAS ==========

export async function getRutasLV() {
	const db = await getDB();
	return db.getAll('rutasLV');
}

export async function getRutasSabado() {
	const db = await getDB();
	return db.getAll('rutasSabado');
}

export async function getRutaLVById(id) {
	const db = await getDB();
	return db.get('rutasLV', id);
}

export async function getRutaSabadoById(id) {
	const db = await getDB();
	return db.get('rutasSabado', id);
}

// ========== MENSAJEROS ==========

export async function getMensajeros() {
	const db = await getDB();
	return db.getAll('mensajeros');
}


// ========== CONFIGURACIÓN ==========


export async function getPerfilActual() {
	const db = await getDB();
	const perfil = await db.get('config', 'perfilActual');
	return perfil?.mensajeroId || 1;
}

export async function setPerfilActual(mensajeroId) {
	const db = await getDB();
	return db.put('config', { key: 'perfilActual', mensajeroId });
}

export async function getRotacionConfig() {
	const db = await getDB();
	return db.get('config', 'rotacionConfig');
}

