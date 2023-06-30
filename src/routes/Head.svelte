<script lang="ts">
	// Temporary workaround for https://github.com/inlang/inlang/issues/687
	export let title = '';
	export let webManifestLink = '';
</script>

<svelte:head>
	<title>{title}</title>
	{@html webManifestLink}
</svelte:head>
