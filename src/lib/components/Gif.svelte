<script lang="ts">
	import type { Item } from '../../routes/types/Tatan';
	import loadingImagePath from '$lib/assets/loading.webp';
	export let gifItem: Item;

	$: ({ link, title, fileFormat } = gifItem);
	const getFileFromUrl = async (url: string, defaultType = fileFormat) => {
		const response = await fetch(url, { mode: 'cors' });
		const data = await response.blob();

		return new File([data], url, {
			type: response.headers.get('content-type') || defaultType
		});
	};

	const handleClick = async () => {
		const file = await getFileFromUrl(link);
		const shareData = {
			files: [file],
			title,
			text: title
		};

		if (!navigator.canShare(shareData)) throw new Error('Your browser does not support.');

		navigator.share(shareData);
	};
</script>

<div class="gif" on:click={handleClick} on:keydown={handleClick}>
	<img
		src={gifItem.link || loadingImagePath}
		alt={gifItem.title}
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
	}

	.gif > img {
		width: 100%;
		height: 100%;
		border-radius: 10px;
		object-fit: cover;
	}
</style>
