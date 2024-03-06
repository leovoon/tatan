import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { paraglide } from "@inlang/paraglide-js-adapter-sveltekit/vite"
const config: UserConfig = {
	server: {
		port: 3000
	},
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/paraglide'
		}),
		SvelteKitPWA({
			srcDir: './src',
			mode: 'development',
			selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
			manifest: {
				short_name: 'Tatan Gif',
				name: 'Tatan Gif',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				icons: [
					{
						src: '/tatan.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/tatan.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/tatan.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			injectManifest: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
			},
			devOptions: {
				enabled: true,
				suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
				type: 'module',
				navigateFallback: '/'
			}
		})
	],
};

export default config;
