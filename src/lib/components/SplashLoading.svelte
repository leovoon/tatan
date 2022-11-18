<div>
	<span class="searchIcon">🔍</span>
</div>

<style>
	div {
		display: grid;
		width: 100%;
		height: 100%;
		place-items: center;
		position: absolute;
		font-size: 8vmax;
		inset: 0;
		z-index: 98;
		pointer-events: auto;
		background-color: rgba(136, 136, 136, 0.5);
	}

	.searchIcon {
		display: inline;
		position: relative;
		top: -80px;
		animation: rotate 1s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
