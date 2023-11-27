<script lang="ts">
	import { setLanguageTag, languageTag } from '$lib/paraglide/runtime';
</script>

<ul>
	{#if languageTag() === 'en'}
		<button on:click={() => setLanguageTag('zh')}> 中文 </button>
	{:else}
		<button on:click={() => setLanguageTag('en')}> English </button>
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
