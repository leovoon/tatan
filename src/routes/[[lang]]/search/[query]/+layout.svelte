<script lang="ts">
	import { onMount, type ComponentType } from 'svelte';
	import { page } from '$app/stores';
	import * as m from '$paraglide/messages';

	let pagination: ComponentType;

	$: totalResults = $page.data?.totalResults;

	onMount(async () => {
		pagination = (await import('$lib/components/Pagination.svelte')).default;
	});
</script>

<header>
	<h1>🔍 {m.search_title()}</h1>
</header>
<slot />

<svelte:component this={pagination} {totalResults} />

<style>
	header {
		display: flex;
		gap: 2rem;
		align-items: center;
	}
	h1 {
		font-size: large;
	}
</style>
