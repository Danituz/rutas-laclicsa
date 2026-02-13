const CACHE_NAME = 'mensajeros-v4';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(['/']))
			.catch(() => {})
			.then(() => self.skipWaiting())
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const names = await caches.keys();
			const oldNames = names.filter((n) => n !== CACHE_NAME);

			// Migrar entradas de caches antiguos al nuevo antes de borrarlos
			if (oldNames.length > 0) {
				const newCache = await caches.open(CACHE_NAME);
				for (const oldName of oldNames) {
					const oldCache = await caches.open(oldName);
					const keys = await oldCache.keys();
					for (const key of keys) {
						const existing = await newCache.match(key);
						if (!existing) {
							const response = await oldCache.match(key);
							if (response) await newCache.put(key, response);
						}
					}
					await caches.delete(oldName);
				}
			}

			await self.clients.claim();
		})()
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.open(CACHE_NAME).then((cache) =>
			cache.match(event.request).then((cached) => {
				// Cache first - siempre devolver del cache, cero datos
				if (cached) return cached;

				// Sin cache - intentar red con timeout de 3 segundos
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 3000);

				return fetch(event.request, { signal: controller.signal })
					.then((response) => {
						clearTimeout(timeoutId);
						if (response.ok) {
							cache.put(event.request, response.clone());
						}
						return response;
					})
					.catch(() => {
						clearTimeout(timeoutId);
						// Para navegacion, devolver la raiz cacheada
						if (event.request.mode === 'navigate') {
							return cache.match('/');
						}
						return new Response('Offline', { status: 503 });
					});
			})
		)
	);
});
