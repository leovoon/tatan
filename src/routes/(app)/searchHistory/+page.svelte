<script lang="ts">
	import { savedKeywords } from '$lib/store';
	import * as m from '$paraglide/messages';
	$: hasKeywords = $savedKeywords.length > 0;

	const handleDelete = () => {
		if (hasKeywords) {
			confirm(m.clear_history_confirm()) && savedKeywords.set([]);
		}
		return;
	};
</script>

<header>
	<h2>{m.history_title()}</h2>
	{#if hasKeywords}
		<button on:click={handleDelete}>{m.history_clear_all()}</button>
	{/if}
</header>
{#if hasKeywords}
	<div>
		{#each $savedKeywords as keyword}
			<a href="/search/{keyword}">{keyword}</a>
		{/each}
	</div>
{:else}
	<p>{m.no_history_text()}</p>
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
