<script lang="ts">
	export let deferredPrompt: any;

	async function installApp() {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			console.log('🆗 Installation Dialog opened');
			// Find out whether the user confirmed the installation or not
			const { outcome } = await deferredPrompt.userChoice;
			// The deferredPrompt can only be used once.
			deferredPrompt = null;
			// Act on the user's choice
			if (outcome === 'accepted') {
				console.log('😀 User accepted the install prompt.', true);
			} else if (outcome === 'dismissed') {
				console.log('😟 User dismissed the install prompt');
			}
			// We hide the install button
		}
	}
</script>

<div>
	<button on:click={installApp}> Install </button>
</div>

<style>
	div {
		width: 100%;
		display: grid;
		place-content: center;
		margin-top: 3rem;
	}
	button {
		background-color: antiquewhite;
		font-weight: bold;
		padding: 0.3rem 1rem;
		font-size: large;
		border: 0.5px solid darkgoldenrod;
		border-radius: 30px;
	}

	@media (max-width: 640px) {
		div {
			margin-top: 0;
			position: fixed;
			top: 0;
			right: 0;
			width: fit-content;
			padding: 1rem;
		}
	}
</style>
