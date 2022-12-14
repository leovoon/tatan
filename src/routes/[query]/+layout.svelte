<script lang="ts">
	import { onMount, type ComponentType } from 'svelte';
	import type { LayoutServerData } from './$types';
	import { toast } from '$lib/store';
	import { fly } from 'svelte/transition';

	export let data: LayoutServerData;

	let pagination: ComponentType;

	$: totalResults = +data.tatan.queries.request[0].totalResults;

	onMount(async () => {
		pagination = (await import('$lib/components/Pagination.svelte')).default;
	});
</script>

<header>
	<h1>🔍 搜寻结果</h1>

	{#if $toast}
		<span transition:fly={{ y: 30, duration: 600 }}>准备分享中 🔄</span>
	{/if}
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

	span {
		display: inline-block;
		color: darkgrey;
	}
</style>
