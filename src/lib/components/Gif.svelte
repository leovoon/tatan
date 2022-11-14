<script lang="ts">
	export let gifImg: string;
	import { page } from '$app/stores';
	import imageFailedSVG from '$lib/assets/image-failed.svg';
	$: query = $page.params.query;

	const getFileFromUrl = async (url: string, defaultFileFormat = 'image/gif') => {
		const response = await fetch(url, { mode: 'cors' });
		const data = await response.blob();

		return new File([data], url, {
			type: response.headers.get('content-type') || defaultFileFormat
		});
	};

	const handleClick = async () => {
		const file = await getFileFromUrl(gifImg);
		const shareData = {
			files: [file],
			title: '',
			text: ''
		};
		try {
			if (!navigator.canShare(shareData)) throw new Error('Your browser does not support.');
			navigator.share(shareData);
		} catch (error) {
			alert(
				'You probably share from an unsecured context. It is not supported. Contact the developer for more information. @leovoon'
			);
		}
	};

	const handleImageLoadFailed = (e: Event) => {
		const target = e.target as HTMLImageElement;
		target.src = imageFailedSVG;
		target.onerror = null;
	};
</script>

<div class="gif" on:click={handleClick} on:keydown={handleClick}>
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
</style>
