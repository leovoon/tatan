<script lang="ts">
	import { goto, preloadData } from '$app/navigation';
	import { page, navigating } from '$app/stores';
	import * as m from '../../paraglide/messages';

	export let totalResults: number;
	let showPrevious = false;
	let showNext = false;
	let pageNum = 1;

	$: isNavigating = $navigating !== null;
	$: query = $page.params.query;

	$: if (pageNum <= 0 || pageNum > 91) pageNum = 1;

	$: if (+totalResults > pageNum + 10 && pageNum + 10 <= 91) {
		showNext = true;
	}

	$: if (pageNum > 10) {
		showPrevious = true;
	}

	$: if (pageNum <= 10) {
		showPrevious = false;
	}

	const handleNext = () => {
		pageNum += 10;
		goto(`/${query}?page=${pageNum}`, { noScroll: true });
		preloadData(`/${query}?page=${pageNum + 10}`);
	};

	const handlePrevious = () => {
		pageNum -= 10;
		goto(`/${query}?page=${pageNum}`, { noScroll: true });
	};
</script>

<div class="buttonGroup">
	<button disabled={!showPrevious || isNavigating} on:click={handlePrevious}>
		<span>{m.previous_page()}</span>
	</button>
	<button disabled={!showNext || isNavigating} on:click={handleNext}>
		<span style:display={isNavigating ? 'block' : 'none'}> {m.loading_text()} </span>
		<span style:display={isNavigating ? 'none' : 'block'}>{m.next_page()}</span>
	</button>
</div>

<style>
	.buttonGroup {
		width: 100%;
		display: flex;
		justify-content: center;
		column-gap: 1rem;
		margin-block: 2rem;
	}

	button {
		padding: 0.5em 1em;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
		cursor: pointer;
		position: relative;
		display: grid;
		place-items: center;
		min-width: max-content;
		min-height: max-content;
		width: 200px;
		height: 3.2rem;
	}

	button[disabled] {
		opacity: 0.5;
		cursor: not-allowed;
	}

	button:hover {
		background-color: #eee;
	}

	button[disabled]:hover {
		background-color: white;
	}

	span {
		transition: opacity 0.2s ease-in-out;
		position: absolute;
	}
</style>
