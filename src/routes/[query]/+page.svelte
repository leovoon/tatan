<script lang="ts">
	import type { PageData } from './$types';
	import Gif from '$lib/components/Gif.svelte';
	import Info from '$lib/components/Info.svelte';
	import GifSkeleton from '$lib/components/GifSkeleton.svelte';
	import { navigating } from '$app/stores';
	import { onMount, type ComponentType } from 'svelte';

	export let data: PageData;

	let pagination: ComponentType;

	onMount(async () => {
		pagination = (await import('$lib/components/Pagination.svelte')).default;
	});

	$: totalResults = +data.tatan.queries.request[0].totalResults;

	$: isNavigating = $navigating !== null && $navigating.from?.route.id === '/[query]';
</script>

{#if data.tatan.error}
	<Info>{data.tatan.error.status === 'RESOURCE_EXHAUSTED' ? '明天再来吧。' : '出错了'}</Info>
{:else if data.tatan.items}
	<div class="gifsContainer">
		{#if isNavigating}
			{#each Array(10) as _, i}
				<GifSkeleton />
			{/each}
		{:else}
			{#each data.tatan.items as { link }, key}
				<Gif gifImg={link} id={key} likable />
			{/each}
		{/if}
	</div>
	<svelte:component this={pagination} {totalResults} />
{:else}
	<Info>没有找到，你可能试下中文 😶‍🌫️</Info>
{/if}

<style global>
	.gifsContainer {
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		grid-template-rows: masonry;
	}

	@media (min-width: 500px) {
		.gifsContainer {
			grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
		}
	}
</style>
