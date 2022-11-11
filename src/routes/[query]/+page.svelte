<script lang="ts">
	import type { PageData } from './$types';
	import Gif from '$lib/components/Gif.svelte';
	import Info from '$lib/components/Info.svelte';
	export let data: PageData;
</script>

<h1>🔍 搜寻结果</h1>

{#if data.tatan.error}
	<Info>{data.tatan.error.status === 'RESOURCE_EXHAUSTED' ? '明天再来吧。' : '出错了'}</Info>

	{#if data.tatan.items}
		<div class="container">
			{#each data.tatan.items as item}
				<Gif gifItem={item} />
			{/each}
		</div>
	{/if}
{:else}
	<Info>没有找到，你可能试下中文 😶‍🌫️</Info>
{/if}

<style>
	h1 {
		font-size: large;
	}
	.container {
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		grid-template-rows: masonry;
		margin-bottom: 80px;
	}

	@media (min-width: 500px) {
		.container {
			grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
		}
	}
</style>
