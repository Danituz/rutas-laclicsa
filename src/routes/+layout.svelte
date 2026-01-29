<script>
	import './layout.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import { initializeData } from '$lib/services/db.js';
	import { cargarMensajeros, cargarPerfilActual } from '$lib/stores/mensajeroStore.js';
	import { cargarRutas, detectarTipoDia } from '$lib/stores/rutasStore.js';

	let { children } = $props();
	let isLoading = $state(true);

	onMount(async () => {
		try {
			await initializeData();
			await Promise.all([
				cargarMensajeros(),
				cargarPerfilActual(),
				cargarRutas()
			]);
			detectarTipoDia();
		} catch (error) {
			console.error('Error inicializando datos:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<title>Rutas Mensajeros</title>
	<meta name="description" content="App para gestionar rutas de mensajeros" />
</svelte:head>

{#if isLoading}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<div class="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500"></div>
			<p class="mt-4 text-slate-400 text-sm">Cargando...</p>
		</div>
	</div>
{:else}
	<div class="min-h-screen pb-20">
		{@render children()}
	</div>
	<NavBar />
{/if}
