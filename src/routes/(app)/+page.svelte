<script lang="ts">
	import Info from '$lib/components/Info.svelte';
	import * as m from '$paraglide/messages';
</script>

<h1>{m.title()}</h1>
<Info>{m.description()}</Info>
