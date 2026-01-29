<script>
	import { onMount } from 'svelte';
	import { Check, MapPin, Calendar } from 'lucide-svelte';
	import {
		mensajeros,
		mensajeroActual,
		mensajeroActualId,
		cambiarMensajero
	} from '$lib/stores/mensajeroStore.js';
	import { rutaHoy, cargarRutaHoy } from '$lib/stores/rotacionStore.js';
	import { obtenerInfoDia } from '$lib/services/rotacionService.js';

	let infoDia = $state(obtenerInfoDia());

	onMount(async () => {
		await cargarRutaHoy($mensajeroActualId);
	});

	async function seleccionarMensajero(id) {
		await cambiarMensajero(id);
		await cargarRutaHoy(id);
	}

</script>

<div class="mx-auto max-w-lg px-5 py-8">
	<header class="mb-6">
		<h1 class="text-xl font-semibold text-gray-800">Perfil</h1>
		<p class="text-sm text-gray-400">Selecciona tu perfil de mensajero</p>
	</header>

	<!-- Mensajero actual -->
	<section class="mb-6">
		<div class="overflow-hidden rounded-lg border-2 border-blue-400 bg-blue-50 p-4">
			<div class="flex items-center gap-4">
				<div class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white">
					{$mensajeroActual.id}
				</div>
				<div class="flex-1">
					<p class="text-xs font-medium text-blue-500">Perfil activo</p>
					<h2 class="text-lg font-semibold text-gray-800">{$mensajeroActual.nombre}</h2>
				</div>
				<Check size={22} class="text-blue-500" />
			</div>

			{#if $rutaHoy && !infoDia.esDomingo}
				<div class="mt-4 flex items-center gap-4 border-t border-blue-200 pt-4 text-sm">
					<div class="flex items-center gap-2">
						<MapPin size={14} style="color: {$rutaHoy.color}" />
						<span class="text-gray-700">{$rutaHoy.nombre}</span>
					</div>
					<div class="flex items-center gap-2 text-gray-400">
						<Calendar size={14} />
						<span>{infoDia.tipoHorario}</span>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Lista de mensajeros -->
	<section>
		<h3 class="mb-3 text-sm font-medium text-gray-600">Cambiar perfil</h3>
		<div class="space-y-2">
			{#each $mensajeros as mensajero}
				{@const isSelected = mensajero.id === $mensajeroActualId}
				<div
					class="flex items-center gap-3 rounded-lg border p-3 transition-all {isSelected
						? 'border-blue-300 bg-blue-50'
						: 'border-gray-200 bg-white hover:border-gray-300'}"
				>
					<button
						type="button"
						class="flex flex-1 items-center gap-3"
						onclick={() => seleccionarMensajero(mensajero.id)}
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold {isSelected
								? 'bg-blue-500 text-white'
								: 'bg-gray-100 text-gray-600'}"
						>
							{mensajero.id}
						</div>

						<div class="flex-1 text-left">
							<p class="font-medium text-gray-800">{mensajero.nombre}</p>
							<p class="text-xs text-gray-400">
								{isSelected ? 'Perfil activo' : 'Toca para seleccionar'}
							</p>
						</div>
					</button>

				</div>
			{/each}
		</div>
	</section>

	<!-- Info adicional -->
	<section class="mt-8 rounded-lg border border-gray-200 bg-white p-4">
		<h3 class="mb-1 text-xs font-medium text-gray-400">Acerca de</h3>
		<p class="text-sm text-gray-700">Mensajeros Laclicsa v1.0.0</p>
		<p class="mt-1 text-xs text-gray-400">
			App offline para gestionar rutas de mensajeros Laclicsa.
		</p>
	</section>
</div>
