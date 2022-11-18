<div class="skeleton">
	<div role="presentation" />
</div>

<style>
	.skeleton {
		background-color: rgba(220, 220, 220, 0.485);
		color: white;
		border-radius: 10px;
		aspect-ratio: 1/1;
		padding: 0.2rem;
		min-height: max-content;
		cursor: pointer;
		animation: skeleton-loading 600ms linear infinite alternate;
	}

	@keyframes skeleton-loading {
		0% {
			background-color: hsl(200, 20%, 80%);
		}
		100% {
			background-color: hsl(200, 20%, 95%);
		}
	}
</style>
