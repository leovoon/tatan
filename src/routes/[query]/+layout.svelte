<script lang="ts">
	import { onMount, type ComponentType } from 'svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	let pagination: ComponentType;

	$: totalResults = +data.tatan.queries.request[0].totalResults;

	onMount(async () => {
		pagination = (await import('$lib/components/Pagination.svelte')).default;
	});
</script>

<h1>🔍 搜寻结果</h1>

<slot />
<svelte:component this={pagination} {totalResults} />

<style>
	h1 {
		font-size: large;
	}
</style>
