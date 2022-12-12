<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher, onMount, type ComponentType } from 'svelte';
	import imageFailedSVG from '$lib/assets/imageFailed.svg';
	import { savedGifs } from '$lib/store';
	import { base } from '$app/paths';

	export let gifImg: string;
	export let id: number;
	export let likable: boolean = false;

	let likeButton: ComponentType;
	let controller: AbortController;

	onMount(async () => {
		likeButton = (await import('$lib/components/LikeButton.svelte')).default;
	});

	$: query = $page.params.query;
	$: localStorageGifs = $savedGifs.length ? $savedGifs : [];
	$: isSaved = localStorageGifs.includes(gifImg) || false;

	const dispatch = createEventDispatcher();

	const getFileFromUrl = async (url: string, defaultFileFormat = 'image/gif') => {
		controller = new AbortController();
		const response = await fetch(`${base}/api/get-image?url=${url}`, { signal: controller.signal });
		const data = await response.blob();

		return new File([data], url, {
			type: response.headers.get('content-type') || defaultFileFormat
		});
	};

	const handleClick = async () => {
		if (controller) controller.abort();
		const file = await getFileFromUrl(gifImg);
		const shareData = {
			files: [file],
			title: '',
			text: ''
		};
		if (!navigator.canShare(shareData)) alert('Your browser does not support.');
		await navigator.share(shareData);
		dispatch('gifSelected', { url: gifImg });
	};

	const handleImageLoadFailed = (e: Event) => {
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
</script>

<div class="gif" on:click={handleClick} on:keydown={handleClick}>
	{#if likable}
		<button on:click|stopPropagation>
			<svelte:component
				this={likeButton}
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
