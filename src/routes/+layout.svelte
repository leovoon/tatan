<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import githubIcon from '$lib/assets/github.svg';
	import { page, navigating } from '$app/stores';
	import './global.css';
	import type { LayoutServerData } from './$types';
	import SplashLoading from '$lib/components/SplashLoading.svelte';
	import SearchKeyword from '$lib/components/SearchKeyword.svelte';
	import { savedKeywords } from '$lib/store';

	export let data: LayoutServerData;
	let search: string = '';
	let keywordDiv: HTMLDivElement;
	let maxKeywords: number = 3;

	$: isNavigating =
		$navigating !== null &&
		$navigating.from?.route.id === '/' &&
		$navigating.to?.params?.query === search;

	$: beforeNavigate(() => {
		if ($navigating?.from?.url.origin !== $navigating?.to?.url.origin) {
			isNavigating = false;
		}
	});

	$: hasKeywords = $savedKeywords.length > 0;

	const handleQuery = () => {
		if (!search) {
			alert('人生不留空白哦 ❤️ ');
			return;
		}
		if (search === $page.params.query || search === 'saved' || search === '...') return;

		goto(`/${search}`, { replaceState: true });
		addKeyword(search);
	};

	const addKeyword = (keyword: string) => {
		const newSet: Set<string> = new Set([]);
		newSet.add(keyword);

		savedKeywords.set([...Array.from(newSet), ...$savedKeywords]);
	};

	$: {
		if (keywordDiv) {
			const childrenWidths = Array.from(keywordDiv.children, (child) => child.clientWidth);
			const totalWidth = childrenWidths.reduce((a, b) => a + b, 0);
			const maxWidth = keywordDiv.clientWidth;
			if (totalWidth > maxWidth / 2) {
				maxKeywords = keywordDiv.childElementCount - 1;
			}
		}
	}
</script>

{#if isNavigating}
	<SplashLoading />
{/if}
<div class="container">
	<nav>
		{#if hasKeywords}
			<div class="searchKeywords" bind:this={keywordDiv}>
				{#each $savedKeywords.slice(0, maxKeywords) as keyword}
					<SearchKeyword {keyword} />
				{/each}

				{#if $savedKeywords.length > maxKeywords}
					<SearchKeyword keyword="..." />
				{/if}
			</div>
		{/if}

		<form action={search} on:submit={handleQuery} class="searchBar">
			<a class="saved" data-sveltekit-preload-code="eager" href="/saved">⭐️</a>

			<div class="inputWrapper">
				<input type="text" maxlength="5" placeholder="Search tatan.." bind:value={search} />
			</div>
			<button type="submit">🔍</button>
		</form>
	</nav>

	<main>
		<slot />
	</main>

	<footer>
		<small>tatan world v{data.npm_package_version}</small>
		<a href="https://github.com/leovoon/tatan">
			<img width={15} height={15} src={githubIcon} alt="source" />
		</a>
		<small>leovoon</small>
	</footer>
</div>

<style>
	.container {
		width: 600px;
		max-width: 65ch;
		height: 100%;
		position: relative;
		z-index: 97;
		pointer-events: auto;
	}
	main {
		padding: 2em;
	}
	nav {
		width: 100%;
		max-width: 100vw;
		height: max-content;
		min-height: max-content;
		max-height: 20vh;
		border-bottom: 1px solid rgba(250, 128, 114, 0.259);
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: aliceblue;
		z-index: 99;
		pointer-events: auto;
	}

	.searchKeywords {
		order: 2;
		position: relative;
		padding: 1em;
		gap: 1em;
		display: grid;
		align-items: center;
		background-color: #fefefe;
		grid-template-columns: repeat(auto-fit, minmax(30px, max-content));
	}

	.searchBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		order: 1;
	}

	.saved {
		display: grid;
		place-items: center;
		text-decoration: none;
		padding: 1rem;
		font-size: xx-large;
	}

	.inputWrapper {
		width: 100%;
		display: flex;
		align-items: center;
		flex: 1;
	}

	input {
		width: 90%;
		padding-top: 0.8rem;
		padding-bottom: 0.8rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		background-color: #ffffff;
		transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
			transform;
		transition-duration: 150ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		color: #626974;
		border-radius: 0.375rem;
		border-width: 1px;
		border-color: #d1d5db;
		appearance: none;
	}

	button {
		background: linear-gradient(90deg, #00ff91 0%, #3ad58d 100%);
		border-color: #00ff91;
		font-size: x-large;
		border-radius: 0.375rem;
		width: 50px;
		height: 45px;
		margin-inline: 1rem;
		cursor: pointer;
	}

	button:active,
	button:hover {
		border: #3ad58d;
		background: #20d9a8;
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		margin-bottom: 120px;
		column-gap: 1rem;
		color: #626974;
	}

	@media (max-width: 640px) {
		.container {
			width: 100%;
			max-width: 100vw;
		}
		main {
			padding: 1em;
		}
		nav {
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1px solid rgba(250, 128, 114, 0.259);
		}
		input {
			font-size: 0.875rem;
			line-height: 1.25rem;
		}

		.searchBar {
			order: 2;
		}
	}
</style>
