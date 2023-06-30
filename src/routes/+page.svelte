<script lang="ts">
	import Info from '$lib/components/Info.svelte';
	import { i } from '@inlang/sdk-js';
</script>

<h1>{i('title')}</h1>
<Info>{i('description')}</Info>
