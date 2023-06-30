<script lang="ts">
	import { savedKeywords } from '$lib/store';
	import { base } from '$app/paths';
	import { i } from '@inlang/sdk-js';
	$: hasKeywords = $savedKeywords.length > 0;

	const handleDelete = () => {
		if (hasKeywords) {
			confirm(i('clear-history-confirm')) && savedKeywords.set([]);
		}
		return;
	};
</script>

<header>
	<h2>{i('history-title')}</h2>
	<button on:click={handleDelete}>{i('history-clear-all')}</button>
</header>
{#if hasKeywords}
	<div>
		{#each $savedKeywords as keyword}
			<a href="{base}/{keyword}">{keyword}</a>
		{/each}
	</div>
{:else}
	<p>{i('no-history-text')}</p>
{/if}

<style>
	header {
		display: flex;
		column-gap: 1rem;
		align-items: center;
		justify-content: start;
	}

	button {
		flex-grow: 0;
		padding-inline: 1rem;
		width: max-content;
		height: max-content;
		background-color: rgb(253, 63, 63);
		color: white;
	}

	div {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(max-content, 30vw));
	}
</style>
