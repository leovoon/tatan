<script lang="ts">
	import { savedKeywords } from '$lib/store';
	import { base } from '$app/paths';

	$: hasKeywords = $savedKeywords.length > 0;

	const handleDelete = () => {
		if (hasKeywords) {
			confirm('确定清楚历史吗?') && savedKeywords.set([]);
		}
		return;
	};
</script>

<header>
	<h2>搜索历史 History</h2>
	<button on:click={handleDelete}>清楚</button>
</header>
{#if hasKeywords}
	<div>
		{#each $savedKeywords as keyword}
			<a href="{base}/{keyword}">{keyword}</a>
		{/each}
	</div>
{:else}
	<p>空空如也，暂无历史</p>
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
