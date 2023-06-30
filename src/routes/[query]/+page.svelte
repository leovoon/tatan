<script lang="ts">
	import Gif from '$lib/components/Gif.svelte';
	import Info from '$lib/components/Info.svelte';
	import GifSkeleton from '$lib/components/GifSkeleton.svelte';
	import { onMount } from 'svelte';
	import { i } from '@inlang/sdk-js';

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
		{#if items}
			{#each items as { link }, key}
				<Gif gifImg={link} id={key} likable />
			{:else}
				<Info>{i('no-result')}😊</Info>
			{/each}
		{:else}
			<Info>{i('not-found')}😊</Info>
		{/if}
	</div>
	{#if error}
		<Info>{i('not-found')} - {error.message}</Info>
	{/if}
{:catch error}
	<Info>{i('something-went-wrong')} - {error.message}</Info>
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
