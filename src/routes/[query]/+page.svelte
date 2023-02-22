<script lang="ts">
	import type { PageData } from './$types';
	import Gif from '$lib/components/Gif.svelte';
	import Info from '$lib/components/Info.svelte';
	import GifSkeleton from '$lib/components/GifSkeleton.svelte';

	export let data: PageData;
</script>

{#await data.lazy.tatan}
	<div class="gifsContainer">
		{#each Array(10) as _, i}
			<GifSkeleton />
		{/each}
	</div>
{:then { items, error }}
	<div class="gifsContainer">
		{#each items as { link }, key}
			<Gif gifImg={link} id={key} likable />
		{/each}
	</div>
	{#if error}
		<Info>没找到 - {error.message}</Info>
	{/if}
{:catch error}
	<Info>出错了 - {error.message}</Info>
{/await}

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
