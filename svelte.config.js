import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			runtime: 'edge'
		}),
		serviceWorker: {
			register: false
		},
		alias: {
			$paraglide: './src/paraglide'
		},
		prerender: {
			//Needed for correctly prerendering <link rel="alternate" hreflang="x" href="y">
			origin: "http://localhost:3000",
		},
	}
};

export default config;
