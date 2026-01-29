<script>
	import { MapPin, Calendar, Clock } from 'lucide-svelte';
	import RutaCard from '$lib/components/RutaCard.svelte';
	import SucursalItem from '$lib/components/SucursalItem.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { rutasLV, rutasSabado, tipoDia, cambiarTipoDia } from '$lib/stores/rutasStore.js';

	let rutaSeleccionada = $state(null);
	let modalAbierto = $state(false);

	function seleccionarRuta(ruta) {
		rutaSeleccionada = ruta;
		modalAbierto = true;
	}

	function cerrarModal() {
		modalAbierto = false;
	}

	const rutasActuales = $derived($tipoDia === 'lv' ? $rutasLV : $rutasSabado);
</script>

<div class="mx-auto max-w-lg px-5 py-8">
	<header class="mb-8">
		<h1 class="text-xl font-semibold text-gray-800">Rutas</h1>
		<p class="mt-1 text-sm text-gray-400">Consulta todas las rutas disponibles</p>
	</header>

	<!-- Selector de tipo de día -->
	<div class="mb-6 flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
		<button
			type="button"
			class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all {$tipoDia === 'lv'
				? 'bg-white text-gray-800 shadow-sm border border-gray-200'
				: 'text-gray-500 hover:text-gray-700 border border-transparent'}"
			onclick={() => cambiarTipoDia('lv')}
		>
			Lunes - Viernes
		</button>
		<button
			type="button"
			class="flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all {$tipoDia === 'sabado'
				? 'bg-white text-gray-800 shadow-sm border border-gray-200'
				: 'text-gray-500 hover:text-gray-700 border border-transparent'}"
			onclick={() => cambiarTipoDia('sabado')}
		>
			Sábado
		</button>
	</div>

	<!-- Lista de rutas -->
	<div class="space-y-3">
		{#each rutasActuales as ruta}
			<RutaCard {ruta} onClick={() => seleccionarRuta(ruta)} />
		{/each}
	</div>
</div>

<!-- Modal de detalles -->
<Modal isOpen={modalAbierto} title={rutaSeleccionada?.nombre || ''} onClose={cerrarModal}>
	{#if rutaSeleccionada}
		<div class="space-y-2">
			<div class="mb-4 flex items-center gap-3 text-sm text-gray-500">
				<span class="flex items-center gap-1">
					<MapPin size={14} style="color: {rutaSeleccionada.color}" />
					{rutaSeleccionada.paradas?.filter((p) => p.tipo === 'normal').length || 0} paradas
				</span>
				<span class="text-gray-300">|</span>
				<span class="flex items-center gap-1">
					<Clock size={14} />
					{rutaSeleccionada.paradas?.[0]?.hora} - {rutaSeleccionada.paradas?.[rutaSeleccionada.paradas.length - 1]?.horaFin}
				</span>
			</div>

			{#each rutaSeleccionada.paradas || [] as parada}
				<SucursalItem {parada} color={rutaSeleccionada.color} />
			{/each}
		</div>
	{/if}
</Modal>
