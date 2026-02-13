<script>
	import { onMount } from 'svelte';
	import { format, startOfWeek, addWeeks } from 'date-fns';
	import { es } from 'date-fns/locale';
	import { Users, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { mensajeros } from '$lib/stores/mensajeroStore.js';
	import { rutasLV } from '$lib/stores/rutasStore.js';
	import {
		asignacionesSemana,
		cargarAsignacionesSemana
	} from '$lib/stores/rotacionStore.js';
	import { obtenerAsignacionesSemana } from '$lib/services/rotacionService.js';

	let semanaVista = $state(new Date());
	let asignacionesSemanaVista = $state([]);

	onMount(async () => {
		await cargarAsignacionesSemana();
		await actualizarAsignaciones();
	});

	async function actualizarAsignaciones() {
		asignacionesSemanaVista = await obtenerAsignacionesSemana(semanaVista);
	}

	async function cambiarSemana(direccion) {
		semanaVista = addWeeks(semanaVista, direccion);
		await actualizarAsignaciones();
	}

	function obtenerNombreMensajero(id) {
		return $mensajeros.find((m) => m.id === id)?.nombre || `Mensajero ${id}`;
	}

	function obtenerRuta(id) {
		return $rutasLV.find((r) => r.id === id);
	}

	const inicioSemana = $derived(startOfWeek(semanaVista, { weekStartsOn: 1 }));
</script>

<div class="mx-auto max-w-lg px-4 py-6">
	<header class="mb-6">
		<h1 class="text-xl font-semibold text-gray-800">Rotación</h1>
		<p class="text-sm text-gray-400">Rotación semanal de rutas</p>
	</header>

	<!-- Navegación de semanas -->
	<div class="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3">
		<button
			type="button"
			class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
			onclick={() => cambiarSemana(-1)}
		>
			<ChevronLeft size={20} />
		</button>

		<div class="text-center">
			<p class="text-xs text-gray-400">Semana del</p>
			<p class="font-medium text-gray-800">
				{format(inicioSemana, "d 'de' MMMM", { locale: es })}
			</p>
		</div>

		<button
			type="button"
			class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
			onclick={() => cambiarSemana(1)}
		>
			<ChevronRight size={20} />
		</button>
	</div>

	<!-- Asignaciones de la semana -->
	<section class="mb-6">
		<h2 class="mb-3 flex items-center gap-2 text-sm font-medium text-gray-600">
			<Users size={16} />
			Asignaciones
		</h2>

		<div class="space-y-2">
			{#each asignacionesSemanaVista as asignacion}
				{@const ruta = obtenerRuta(asignacion.rutaId)}
				<div
					class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
				>
					<div class="flex items-center gap-3">
						<div
							class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600"
						>
							{asignacion.mensajeroId}
						</div>
						<div>
							<p class="font-medium text-gray-800">
								{obtenerNombreMensajero(asignacion.mensajeroId)}
							</p>
							<p class="text-xs text-gray-400">Mensajero</p>
						</div>
					</div>

					{#if ruta}
						<div class="text-right">
							<p class="text-sm font-medium" style="color: {ruta.color}">
								Ruta {ruta.id}
							</p>
							<p class="text-xs text-gray-400">{ruta.nombre.split(' - ')[1]}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Info de rotación -->
	<section class="rounded-lg border border-gray-200 bg-white p-4">
		<h3 class="mb-1 text-xs font-medium text-gray-400">Orden de rotación</h3>
		<p class="text-sm text-gray-700">
			Cada lunes los mensajeros rotan a la siguiente ruta (1→2→3→4→1).
		</p>
	</section>
</div>
