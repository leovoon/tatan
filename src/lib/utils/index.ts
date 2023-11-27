import { languageTag } from '$lib/paraglide/runtime';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const redirectHref = (href: string) => {
	return languageTag() ? `/${languageTag()}${href}` : href;
};
