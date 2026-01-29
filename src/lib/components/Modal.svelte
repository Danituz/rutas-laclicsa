<script>
	import { X } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';

	let { isOpen = false, title = '', onClose = () => {}, children } = $props();

	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(e) {
		if (e.key === 'Escape') {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-end justify-center bg-black/10 p-4 backdrop-blur-sm sm:items-center"
		transition:fade={{ duration: 200 }}
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
	>
		<div
			class="w-full max-w-lg overflow-hidden rounded-t-2xl border border-gray-200 bg-white shadow-lg sm:rounded-xl"
			transition:fly={{ y: 100, duration: 300 }}
		>
			<div class="flex items-center justify-between border-b border-gray-100 px-5 py-4">
				<h2 id="modal-title" class="text-base font-medium text-gray-800">{title}</h2>
				<button
					type="button"
					class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
					onclick={onClose}
				>
					<X size={18} />
				</button>
			</div>

			<div class="max-h-[70vh] overflow-y-auto p-5">
				{@render children()}
			</div>
		</div>
	</div>
{/if}
