<script lang="ts">
	import {
		onSetLanguageTag,
		type AvailableLanguageTag,
		setLanguageTag,
		languageTag
	} from '../../paraglide/runtime';
	import { browser } from '$app/environment';

	// initialize a reactive language tag
	let currentLang: AvailableLanguageTag;

	if (import.meta.env.SSR === false) {
		currentLang = (window.localStorage.getItem('lang') as AvailableLanguageTag) ?? 'en';
		console.log(currentLang);
		setLanguageTag(currentLang);
		onSetLanguageTag(() => {
			window.localStorage.setItem('lang', languageTag());
			currentLang = languageTag();
		});
	}
</script>

{#key currentLang}
	<slot />
{/key}
