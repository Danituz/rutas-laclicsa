<script>
	import { onMount } from 'svelte';
	import { differenceInYears, differenceInMonths, parseISO, format } from 'date-fns';
	import { es } from 'date-fns/locale';
	import { Check, MapPin, Calendar, Cake, Phone, Briefcase, ChevronRight, Clock } from 'lucide-svelte';
	import Modal from '$lib/components/Modal.svelte';
	import {
		mensajeros,
		mensajeroActual,
		mensajeroActualId,
		cambiarMensajero
	} from '$lib/stores/mensajeroStore.js';
	import { rutaHoy, cargarRutaHoy } from '$lib/stores/rotacionStore.js';
	import { obtenerInfoDia } from '$lib/services/rotacionService.js';

	let infoDia = $state(obtenerInfoDia());
	let cargando = $state(false);
	let mensajeroCardex = $state(null);
	let modalAbierto = $state(false);

	onMount(async () => {
		await cargarRutaHoy($mensajeroActualId);
	});

	async function seleccionarMensajero(id) {
		if (cargando) return;
		cargando = true;
		try {
			await cambiarMensajero(id);
			await cargarRutaHoy(id);
		} finally {
			cargando = false;
		}
	}

	function abrirCardex(mensajero) {
		mensajeroCardex = mensajero;
		modalAbierto = true;
	}

	function cerrarCardex() {
		modalAbierto = false;
	}

	function calcularEdad(fechaNacimiento) {
		if (!fechaNacimiento) return '-';
		return differenceInYears(new Date(), parseISO(fechaNacimiento));
	}

	function formatearFecha(fecha) {
		if (!fecha) return '-';
		return format(parseISO(fecha), "d 'de' MMMM yyyy", { locale: es });
	}

	function calcularTiempoEmpresa(fechaIngreso) {
		if (!fechaIngreso) return '-';
		const inicio = parseISO(fechaIngreso);
		const ahora = new Date();
		const anios = differenceInYears(ahora, inicio);
		const meses = differenceInMonths(ahora, inicio) % 12;
		if (anios === 0) return `${meses} mes${meses !== 1 ? 'es' : ''}`;
		if (meses === 0) return `${anios} año${anios !== 1 ? 's' : ''}`;
		return `${anios} año${anios !== 1 ? 's' : ''}, ${meses} mes${meses !== 1 ? 'es' : ''}`;
	}
</script>

<div class="mx-auto max-w-lg px-4 py-6">
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
				<button
					type="button"
					class="rounded-lg p-2 text-blue-400 transition-colors hover:bg-blue-100"
					onclick={() => abrirCardex($mensajeroActual)}
				>
					<ChevronRight size={20} />
				</button>
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
					class="flex items-center rounded-lg border transition-all {isSelected
						? 'border-blue-300 bg-blue-50'
						: 'border-gray-200 bg-white hover:border-gray-300'}"
				>
					<button
						type="button"
						class="flex flex-1 items-center gap-3 p-3 text-left"
						onclick={() => seleccionarMensajero(mensajero.id)}
						disabled={cargando}
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold {isSelected
								? 'bg-blue-500 text-white'
								: 'bg-gray-100 text-gray-600'}"
						>
							{mensajero.id}
						</div>

						<div class="flex-1">
							<p class="font-medium text-gray-800">{mensajero.nombre}</p>
							<p class="text-xs text-gray-400">
								{isSelected ? 'Perfil activo' : 'Toca para seleccionar'}
							</p>
						</div>
					</button>

					<button
						type="button"
						class="shrink-0 p-3 text-gray-300 transition-colors hover:text-gray-500"
						onclick={() => abrirCardex(mensajero)}
					>
						<ChevronRight size={18} />
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

<!-- Modal Cardex -->
<Modal isOpen={modalAbierto} title="Cardex" onClose={cerrarCardex}>
	{#if mensajeroCardex}
		<div class="space-y-5">
			<!-- Header del cardex -->
			<div class="flex items-center gap-4">
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white">
					{mensajeroCardex.id}
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">{mensajeroCardex.nombre}</h3>
					<p class="text-sm text-gray-400">Mensajero #{mensajeroCardex.id}</p>
				</div>
			</div>

			<!-- Datos del cardex -->
			<div class="space-y-3">
				<!-- Fecha de nacimiento -->
				<div class="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
						<Cake size={16} />
					</div>
					<div class="flex-1">
						<p class="text-xs font-medium text-gray-400">Fecha de nacimiento</p>
						<p class="text-sm font-medium text-gray-800">
							{formatearFecha(mensajeroCardex.fechaNacimiento)}
						</p>
						<p class="text-xs text-gray-500">
							{calcularEdad(mensajeroCardex.fechaNacimiento)} años
						</p>
					</div>
				</div>

				<!-- Telefono -->
				<div class="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-500">
						<Phone size={16} />
					</div>
					<div class="flex-1">
						<p class="text-xs font-medium text-gray-400">Telefono</p>
						<p class="text-sm font-medium text-gray-800">
							{mensajeroCardex.telefono || '-'}
						</p>
					</div>
				</div>

				<!-- Fecha de ingreso -->
				<div class="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
						<Briefcase size={16} />
					</div>
					<div class="flex-1">
						<p class="text-xs font-medium text-gray-400">Fecha de ingreso</p>
						<p class="text-sm font-medium text-gray-800">
							{formatearFecha(mensajeroCardex.fechaIngreso)}
						</p>
					</div>
				</div>

				<!-- Tiempo en empresa -->
				<div class="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
						<Clock size={16} />
					</div>
					<div class="flex-1">
						<p class="text-xs font-medium text-gray-400">Tiempo en la empresa</p>
						<p class="text-sm font-medium text-gray-800">
							{calcularTiempoEmpresa(mensajeroCardex.fechaIngreso)}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</Modal>
