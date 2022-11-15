<script lang="ts">
	import type { PageData } from './$types';
	import Gif from '$lib/components/Gif.svelte';
	import Info from '$lib/components/Info.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	export let data: PageData;

	$: totalResults = +data.tatan.queries.request[0].totalResults;
</script>

{#if data.tatan.error}
	<Info>{data.tatan.error.status === 'RESOURCE_EXHAUSTED' ? '明天再来吧。' : '出错了'}</Info>
{:else if data.tatan.items}
	<div class="container">
		{#each data.tatan.items as { link }}
			<Gif gifImg={link} />
		{/each}
	</div>
	<Pagination {totalResults} />
{:else}
	<Info>没有找到，你可能试下中文 😶‍🌫️</Info>
{/if}

<style>
	.container {
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		grid-template-rows: masonry;
	}

	@media (min-width: 500px) {
		.container {
			grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
		}
	}
</style>
