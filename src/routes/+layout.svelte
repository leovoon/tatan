<script lang="ts">
	import { goto } from '$app/navigation';
	import githubIcon from '$lib/assets/github.svg';
	import { page } from '$app/stores';
	import './global.css';
	import type { LayoutServerData } from './$types';

	let search: '';
	export let data: LayoutServerData;

	const handleQuery = () => {
		if (!search) {
			alert('人生不留空白哦 ❤️ ');
			return;
		}
		if (search === $page.params.query) return;

		goto(`/${search}`, { replaceState: true });
	};
</script>

<div class="container">
	<nav>
		<a class="saved" href="/saved">⭐️</a>

		<div class="inputWrapper">
			<input
				type="text"
				on:change={() => handleQuery()}
				placeholder="Search tatan.."
				bind:value={search}
			/>
		</div>
		<button on:click={() => handleQuery()}>🔍</button>
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
	}
	main {
		padding: 2em;
	}
	nav {
		width: 100%;
		max-width: 100vw;
		height: 80px;
		max-height: 20vh;
		border-bottom: 1px solid rgba(250, 128, 114, 0.259);
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: aliceblue;
		z-index: 99;
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
		color: #9ca3af;
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
		margin-bottom: 40px;
		column-gap: 1rem;
		color: slategrey;
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
	}
</style>
