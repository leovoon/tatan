<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { i18n } from '$lib/i18n';

	export let keyword = '';

	const handleKeyword = () => {
		if (keyword === '...') {
			goto(i18n.resolveRoute('/searchHistory'));
			return;
		}
		goto(i18n.resolveRoute(`/search/${keyword}`), { replaceState: true });
	};

	$: active = $page.params.query === keyword;
</script>

{#if keyword}
	<span role="button" tabindex="0" class:active on:keyup={handleKeyword} on:click={handleKeyword}
		>{keyword}</span
	>
{/if}

<style>
	span {
		--backgroundColor: aquamarine;
		display: flex;
		justify-content: start;
		align-items: center;
		/* white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis; */

		--max-lines: 1;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: var(--max-lines);

		border-radius: 15px;
		background-color: var(--backgroundColor);
		padding-inline: 1em;
		padding-block: 0.2em;
		height: min-content;
		cursor: pointer;
		transition: outline-color 0.3s ease-out;
	}
	.active {
		outline: 3px rgb(77, 195, 255) solid;
	}
</style>
