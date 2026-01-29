<script>
	import { page } from '$app/stores';
	import { Home, MapPin, RefreshCw, User } from 'lucide-svelte';

	const navItems = [
		{ href: '/', icon: Home, label: 'Inicio' },
		{ href: '/rutas', icon: MapPin, label: 'Rutas' },
		{ href: '/rotacion', icon: RefreshCw, label: 'Rotación' },
		{ href: '/perfil', icon: User, label: 'Perfil' }
	];
</script>

<nav class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)]">
	<div class="mx-auto flex max-w-lg">
		{#each navItems as item}
			{@const isActive = $page.url.pathname === item.href}
			<a
				href={item.href}
				class="flex flex-1 flex-col items-center gap-0.5 py-2.5 transition-colors {isActive
					? 'text-blue-600'
					: 'text-gray-400 hover:text-gray-600'}"
			>
				<item.icon size={20} strokeWidth={isActive ? 2 : 1.5} />
				<span class="text-[10px] font-medium">{item.label}</span>
			</a>
		{/each}
	</div>
</nav>
