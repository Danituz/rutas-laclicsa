<script>
	import { MapPin, Clock, ChevronRight } from 'lucide-svelte';

	let { ruta, onClick = null } = $props();

	const totalParadas = $derived(ruta.paradas?.filter((p) => p.tipo === 'normal').length || 0);
	const primeraParada = $derived(ruta.paradas?.[0]?.hora || '08:00');
	const ultimaParada = $derived(ruta.paradas?.[ruta.paradas.length - 1]?.horaFin || '16:00');
</script>

<button
	type="button"
	class="group w-full rounded-lg border border-gray-200 bg-white p-3 text-left transition-all hover:border-gray-300"
	onclick={onClick}
>
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-md"
				style="background-color: {ruta.color}15; color: {ruta.color}"
			>
				<MapPin size={16} />
			</div>
			<div>
				<h3 class="text-sm font-medium text-gray-800">{ruta.nombre}</h3>
				<p class="text-xs text-gray-400">
					{totalParadas} paradas · {primeraParada} - {ultimaParada}
				</p>
			</div>
		</div>

		<ChevronRight size={16} class="text-gray-300 group-hover:text-gray-400" />
	</div>
</button>
