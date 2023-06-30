<script lang="ts">
	import { browser } from '$app/environment';
	import { languages, switchLanguage } from '@inlang/sdk-js';

	let currentLang: string;

	if (browser) {
		currentLang = localStorage.getItem('language') ?? languages[0];
	}

	async function switchToLang(lang: string) {
		await switchLanguage(lang);
		if (browser) {
			currentLang = localStorage.getItem('language') ?? languages[0];
		}
	}
</script>

<ul>
	{#if currentLang === 'en'}
		<button on:click={() => switchToLang('zh')}> 中文 </button>
	{:else}
		<button on:click={() => switchToLang('en')}> English </button>
	{/if}
</ul>

<style>
	ul {
		text-align: center;
		padding-left: 0;
		margin-block: 0;
	}

	button {
		color: white;
		background: linear-gradient(75deg, #d57373 0%, #f32727 100%);
		border-radius: 14px;
		padding: 0.5rem 1rem;
		border: none;
		cursor: pointer;
		font-size: 12px;
	}
</style>
