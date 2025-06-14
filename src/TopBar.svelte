<script>
	export let title = "Wiki Pork";
</script>

<div class="titlebar">
	<span class="titletext">{title}</span>
</div>

<style>
	.titlebar {
		background-image: url(./lib/images/topbarbg.jpg);
		background-position: center;
		overflow: hidden;
		background-color: var(--salmon-pink);
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.titletext {
		font-family: "Roboto Mono", monospace;
		color: var(--eerie-black);
		font-size: 10rem;
		line-height: 1;
		margin: 0;
		padding: 0;
	}
</style>
