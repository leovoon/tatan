<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	import * as m from '$paraglide/messages';
	const { needRefresh, updateServiceWorker, offlineReady } = useRegisterSW({
		onRegistered(r) {
			// uncomment following code if you want check for updates
			// r &&
			// 	setInterval(() => {
			// 		console.log('Checking for sw update');
			// 		r.update();
			// 	}, 3000 /* 20s for testing purposes */);
			console.log(`SW Registered: ${r}`);
		},
		onRegisterError(error) {
			console.log('SW registration error', error);
		}
	});
	const close = () => {
		console.log('clicked');
		offlineReady.set(false);
		needRefresh.set(false);
	};
	$: toast = $offlineReady || $needRefresh;
</script>

{#if toast}
	<div class="pwa-toast" role="alert">
		<div class="message">
			{#if $offlineReady}
				<span>{m.offline_ready()}<br /> </span>
			{:else}
				<span> <br /> {m.newupdate()} </span>
			{/if}
		</div>
		{#if $needRefresh}
			<button on:click={() => updateServiceWorker(true)}> Reload 刷新 </button>
		{/if}
		<button on:click={close}> Close </button>
	</div>
{/if}

<style>
	.pwa-toast {
		z-index: 99;
		position: fixed;
		right: 0;
		bottom: 0;
		margin: 16px;
		padding: 12px;
		border: 1px solid #8885;
		border-radius: 4px;
		text-align: left;
		box-shadow: 3px 4px 5px 0 #8885;
		background-color: white;
		pointer-events: auto;
	}
	.pwa-toast .message {
		margin-bottom: 8px;
	}
	.pwa-toast button {
		border: 1px solid #8885;
		outline: none;
		margin-right: 5px;
		border-radius: 2px;
		padding: 3px 10px;
		position: relative;
	}

	@media (max-width: 480px) {
		.pwa-toast {
			bottom: 6rem;
		}
	}
</style>
