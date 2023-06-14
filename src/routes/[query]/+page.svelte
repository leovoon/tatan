<script lang="ts">
	import Gif from '$lib/components/Gif.svelte';
	import Info from '$lib/components/Info.svelte';
	import GifSkeleton from '$lib/components/GifSkeleton.svelte';
	import { onMount } from 'svelte';

	export let data;

	let LikeButton: typeof import('$lib/components/LikeButton.svelte')['default'] | null = null;

	onMount(async () => {
		LikeButton = (await import('$lib/components/LikeButton.svelte')).default;
	});
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
			<Gif gifImg={link} id={key} likeButton={LikeButton} />
		{:else}
			<Info>没找到,尝试不一样的关键字😊</Info>
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
	}

	@media (min-width: 500px) {
		.gifsContainer {
			grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
		}
	}
</style>
