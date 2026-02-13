<script>
	import { onMount } from 'svelte';
	import { format } from 'date-fns';
	import { es } from 'date-fns/locale';
	import { MapPin, Coffee, CheckCircle } from 'lucide-svelte';
	import SucursalItem from '$lib/components/SucursalItem.svelte';
	import { mensajeroActual, mensajeroActualId } from '$lib/stores/mensajeroStore.js';
	import {
		rutaHoy,
		paradaActual,
		cargarRutaHoy,
		iniciarActualizacionAutomatica,
		actualizarEstadoActual
	} from '$lib/stores/rotacionStore.js';
	import { obtenerInfoDia } from '$lib/services/rotacionService.js';

	let infoDia = $state(obtenerInfoDia());
	let horaActual = $state(format(new Date(), 'HH:mm'));

	onMount(() => {
		const clockInterval = setInterval(() => {
			horaActual = format(new Date(), 'HH:mm');
		}, 1000);

		// Actualizar inmediatamente al volver de background
		function handleVisibility() {
			if (document.visibilityState === 'visible') {
				horaActual = format(new Date(), 'HH:mm');
				infoDia = obtenerInfoDia();
				if ($rutaHoy?.paradas) {
					actualizarEstadoActual($rutaHoy.paradas);
				}
			}
		}
		document.addEventListener('visibilitychange', handleVisibility);

		return () => {
			clearInterval(clockInterval);
			document.removeEventListener('visibilitychange', handleVisibility);
		};
	});

	// Cargar ruta cuando cambia el mensajero
	$effect(() => {
		if ($mensajeroActualId) {
			cargarRutaHoy($mensajeroActualId);
		}
	});

	// Reiniciar auto-update cuando cambia la ruta
	$effect(() => {
		if (!$rutaHoy?.paradas) return;
		const stop = iniciarActualizacionAutomatica($rutaHoy.paradas);
		return () => stop();
	});
</script>

<div class="mx-auto max-w-lg px-4 py-6">
	<!-- Header -->
	<header class="mb-6">
		<div class="flex items-start justify-between">
			<div>
				<p class="text-xs font-medium text-gray-400">Hola,</p>
				<h1 class="text-xl font-semibold text-gray-900">{$mensajeroActual.nombre}</h1>
			</div>
			<div class="text-right">
				<p class="text-2xl font-light text-gray-900">{horaActual}</p>
				<p class="text-xs text-gray-400">{infoDia.tipoHorario}</p>
			</div>
		</div>

		<!-- Ruta info -->
		{#if $rutaHoy && !infoDia.esDomingo}
			<div class="mt-4 flex items-center gap-2">
				<span
					class="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium"
					style="border-color: {$rutaHoy.color}; color: {$rutaHoy.color}"
				>
					<MapPin size={12} />
					{$rutaHoy.nombre}
				</span>
				<span class="text-xs text-gray-400">
					{$rutaHoy.paradas?.filter((p) => p.tipo === 'normal').length || 0} paradas
				</span>
			</div>
		{/if}

		<p class="mt-3 text-xs capitalize text-gray-400">
			{infoDia.fechaFormateada}
		</p>
	</header>

	{#if infoDia.esDomingo}
		<div class="rounded-lg border border-gray-200 bg-white p-8 text-center">
			<Coffee size={28} class="mx-auto mb-3 text-gray-300" />
			<h2 class="text-base font-medium text-gray-700">Hoy es Domingo</h2>
			<p class="mt-1 text-sm text-gray-400">Disfruta tu descanso</p>
		</div>
	{:else if $rutaHoy}
		<!-- Tarjeta de estado actual -->
		{#if $paradaActual}
			<div class="mb-6 overflow-hidden rounded-xl border-2 shadow-sm" style="border-color: {$rutaHoy.color}20">
				{#if $paradaActual.turnoTerminado}
					<!-- Turno finalizado -->
					<div class="flex items-center justify-center gap-2 bg-green-50 px-4 py-3">
						<CheckCircle size={16} class="text-green-500" />
						<p class="text-sm font-semibold text-green-700">Turno Finalizado</p>
					</div>
				{:else if $paradaActual.paradaActual}
					<!-- En una parada -->
					<div class="flex items-center justify-between px-4 py-3" style="background-color: {$rutaHoy.color}08">
						<div class="flex items-center gap-2">
							<span class="text-[10px] font-semibold uppercase tracking-wider" style="color: {$rutaHoy.color}">Ahora</span>
							<p class="text-sm font-bold text-gray-900">{$paradaActual.paradaActual.nombre}</p>
						</div>
						<span class="rounded-full px-2 py-0.5 text-[10px] font-medium text-white" style="background-color: {$rutaHoy.color}">
							{$paradaActual.paradaActual.hora} - {$paradaActual.paradaActual.horaFin}
						</span>
					</div>
				{:else if $paradaActual.enCamino}
					<!-- En camino a la siguiente -->
					<div class="flex items-center justify-between bg-amber-50 px-4 py-3">
						<div class="flex items-center gap-2">
							<span class="text-[10px] font-semibold uppercase tracking-wider text-amber-600">En camino</span>
							<p class="text-sm font-bold text-gray-900">{$paradaActual.proximaParada.nombre}</p>
						</div>
						<span class="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
							{$paradaActual.proximaParada.hora} - {$paradaActual.proximaParada.horaFin}
						</span>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Lista de paradas -->
		<section>
			<div class="mb-3 flex items-center justify-between">
				<h3 class="text-xs font-medium uppercase tracking-wide text-gray-400">Itinerario</h3>
				<span class="text-xs text-gray-400">
					{$rutaHoy.paradas?.[0]?.hora} - {$rutaHoy.paradas?.[$rutaHoy.paradas.length - 1]?.horaFin}
				</span>
			</div>
			<div class="space-y-1.5">
				{#each $rutaHoy.paradas || [] as parada, index}
					{@const isPasada = $paradaActual?.indiceActual > index}
					{@const isActual = $paradaActual?.indiceActual === index}
					{@const isProxima =
						$paradaActual?.proximaParada?.hora === parada.hora && !isActual && !isPasada}
					<SucursalItem {parada} {isActual} {isPasada} {isProxima} color={$rutaHoy.color} />
				{/each}
			</div>
		</section>
	{:else}
		<div class="py-12 text-center">
			<div class="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-400"></div>
		</div>
	{/if}
</div>
