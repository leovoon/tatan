<script lang="ts">
	import { page } from '$app/stores';
	import imageFailedSVG from '$lib/assets/imageFailed.svg';
	import { savedGifs } from '$lib/store';
	import LikeButton from './LikeButton.svelte';

	export let gifImg: string;
	export let id: number;
	export let likable = false;
	let imageFailedToLoad = false;

	const handleImageLoadFailed = (e: Event) => {
		imageFailedToLoad = true;
		const target = e.target as HTMLImageElement;
		target.src = imageFailedSVG;
		target.onerror = null;
	};

	const handleSaveTatan = () => {
		if (isSaved) {
			savedGifs.update((gifs) => gifs.filter((gif) => gif !== gifImg));
			return;
		}
		savedGifs.set([...$savedGifs, gifImg]);
	};

	$: query = $page.params.query;
	$: localStorageGifs = $savedGifs.length ? $savedGifs : [];
	$: isSaved = localStorageGifs.includes(gifImg) || false;
</script>

{#if !imageFailedToLoad}
	<div class="gif" role="button" tabindex="-1">
		{#if likable}
			<button on:click|stopPropagation>
				<svelte:component
					this={LikeButton}
					liked={isSaved}
					id={'like-' + id}
					on:change={handleSaveTatan}
				/>
			</button>
		{/if}
		<img
			src={gifImg}
			on:error={handleImageLoadFailed}
			alt={query}
			loading="lazy"
			referrerpolicy="no-referrer"
		/>
	</div>
{/if}

<style>
	.gif {
		background-color: rgba(220, 220, 220, 0.485);
		color: white;
		border-radius: 10px;
		aspect-ratio: 1/1;
		padding: 0.2rem;
		min-height: max-content;
		cursor: pointer;
		position: relative;
	}

	.gif > img {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		object-fit: cover;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-image: url('$lib/assets/loading.webp');
	}

	button {
		--likeButtonWidth: 26px;
		--likeButtonBackgroundColor: rgba(210, 166, 166, 0.296)
		background-color: var(--likeButtonBackgroundColor);
		border: none;
		position: absolute;
		display: grid;
		place-content: center;
		top: 0;
		right: 0;
		border: solid 1px var(--likeButtonBackgroundColor);
		border-radius: 10px;
		max-width: var(--likeButtonWidth);
		max-height: var(--likeButtonWidth);
	}
</style>
