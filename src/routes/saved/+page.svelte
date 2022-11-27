<script lang="ts">
	import Gif from '$lib/components/Gif.svelte';
	import { savedGifs } from '$lib/store';
	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	let singleDeleteMode = false;

	const handleDeleteAll = () => {
		confirm('确定要删除所有吗？') && savedGifs.set([]);
	};

	const handleSingleSelect = (event: { detail: { url: string } }) => {
		const url = event.detail.url;
		const index = $savedGifs.indexOf(url);
		if (index > -1) {
			savedGifs.update((gifs) => gifs.filter((gif) => gif !== url));
		} else {
			savedGifs.set([...$savedGifs, url]);
		}
	};
</script>

<h1>⭐️ 库存</h1>

{#if !$savedGifs.length}
	<p>没有东东，去点 ❤️ 保存至此。</p>
{:else}
	<div class="control">
		<button on:click={handleDeleteAll}>删除所有</button>
		<button class="single" on:click={() => (singleDeleteMode = !singleDeleteMode)}
			>逐个修改
			{#if singleDeleteMode}
				<div
					style="display:inline-block"
					transition:fly|local={{ x: -10, duration: 300, easing: linear }}
				>
					已开启
				</div>
			{/if}
		</button>
	</div>
	<div class="gifsContainer">
		{#each $savedGifs as gif, id}
			<Gif {id} gifImg={gif} likable={singleDeleteMode} on:gifSelected={handleSingleSelect} />
		{/each}
	</div>
{/if}

<style>
	.control {
		margin-block: 1rem;
		display: flex;
		justify-content: flex-start;
		column-gap: 1rem;
	}
	button {
		color: white;
		background: linear-gradient(75deg, #d57373 0%, #f32727 100%);
		border-radius: 14px;
		padding-inline: 8px;
		padding-block: 3px;
		border: none;
		cursor: pointer;
	}

	button.single {
		background: linear-gradient(75deg, #6187e0 0%, #345aa7 100%);
	}

	button.single:hover {
		background: linear-gradient(75deg, #09276e 0%, #8694af 100%);
	}

	button:hover {
		background: linear-gradient(75deg, #f32727 0%, #d57373 100%);
	}
</style>
