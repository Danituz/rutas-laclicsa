<script>
	import { Clock, Coffee, Utensils, Flag, MapPin } from 'lucide-svelte';

	let { parada, isActual = false, isPasada = false, isProxima = false, color = '#3B82F6' } = $props();

	const iconosPorTipo = {
		normal: MapPin,
		descanso: Coffee,
		comida: Utensils,
		especial: Flag
	};

	const Icono = $derived(iconosPorTipo[parada.tipo] || MapPin);
</script>

<div
	class="flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-all {isActual
		? ''
		: isPasada
			? 'border-gray-100 bg-gray-50 opacity-50'
			: 'border-gray-200 bg-white hover:border-gray-300'}"
	style={isActual ? `border-color: ${color}30; background-color: ${color}10` : ''}
>
	<!-- Hora -->
	<div class="w-24 shrink-0 text-right">
		<span class="text-xs font-medium {isPasada ? 'text-gray-400' : 'text-gray-600'}">
			{#if parada.hora === parada.horaFin}
				{parada.hora}
			{:else}
				{parada.hora} - {parada.horaFin}
			{/if}
		</span>
	</div>

	<!-- Linea vertical -->
	<div class="flex flex-col items-center">
		<div
			class="h-2 w-2 rounded-full {isActual ? '' : isPasada ? 'bg-gray-300' : 'border-2 border-gray-300 bg-white'}"
			style={isActual ? `background-color: ${color}` : ''}
		></div>
	</div>

	<!-- Contenido -->
	<div class="min-w-0 flex-1">
		<div class="flex items-center gap-2">
			<Icono
				size={14}
				class={parada.tipo === 'normal' ? '' : parada.tipo === 'descanso' ? 'text-amber-500' : parada.tipo === 'comida' ? 'text-orange-500' : 'text-gray-400'}
				style={parada.tipo === 'normal' ? `color: ${color}` : ''}
			/>
			<span class="truncate text-sm font-medium {isPasada ? 'text-gray-400' : 'text-gray-800'}">
				{parada.nombre}
			</span>
		</div>
	</div>

	<!-- Badge -->
	{#if isProxima}
		<span
			class="shrink-0 rounded border px-2 py-0.5 text-[10px] font-medium"
			style="border-color: {color}40; background-color: {color}10; color: {color}"
		>
			Siguiente
		</span>
	{/if}
	{#if isActual}
		<span class="shrink-0 rounded border px-2 py-0.5 text-[10px] font-medium text-white" style="background-color: {color}; border-color: {color}">
			Ahora
		</span>
	{/if}
</div>
