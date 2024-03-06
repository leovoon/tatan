<script lang="ts">
	import {
		availableLanguageTags,
		languageTag,
		type AvailableLanguageTag
	} from '$paraglide/runtime';
	import { i18n } from '$lib/i18n';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	function switchToLanguage(e: Event) {
		const newLanguage = (e.target as HTMLSelectElement).value as AvailableLanguageTag;
		if (!newLanguage) return;
		const canonicalPath = i18n.route($page.url.pathname);
		const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
		goto(localisedPath);
	}

	const labels = {
		en: 'English',
		zh: '中文'
	};
</script>

<ul>
	<select on:change={switchToLanguage}>
		{#each availableLanguageTags as langTag}
			<option value={langTag} selected={languageTag() === langTag}>{labels[langTag]}</option>
		{/each}
	</select>
</ul>
