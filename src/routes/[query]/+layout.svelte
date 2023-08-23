<script lang="ts">
	import { onMount, type ComponentType } from 'svelte';
	import { page } from '$app/stores';
	import { i } from '@inlang/sdk-js';
	import { fly } from 'svelte/transition';

	export let data;

	let pagination: ComponentType;

	$: totalResults = $page.data?.totalResults;

	onMount(async () => {
		pagination = (await import('$lib/components/Pagination.svelte')).default;
	});
</script>

<header>
	<h1>🔍 {i('search-title')}</h1>
</header>
{#key data.url}
	<div in:fly={{ x: 50, duration: 300, delay: 300 }} out:fly={{ x: -50, duration: 300 }}>
		<slot />
	</div>
{/key}

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
