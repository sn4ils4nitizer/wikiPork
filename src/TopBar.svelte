<script>
	export let title = "Wiki Pork";
</script>

<div class="titlebar">
	<span class="titletext">{title}</span>
</div>

<style>
	.titlebar {
		width: 100%;
		height: 200px;
		overflow: hidden;
		background-color: var(--salmon-pink);
		/* pretty background image~ */
		background-image: url("./lib/images/topbarbackground5.jpg"),
			url("./lib/images/topbarbackgroundfill.jpg");
		background-size: contain, contain;
		background-repeat: no-repeat, repeat;
		background-position: center, center;
		display: block;
		align-items: center;
		position: relative;
	}

	.titletext {
		width: 50px;
		position: absolute;
		left: 2rem;
		font-family: "Roboto Mono", monospace;
		color: transparent;
		-webkit-text-stroke: 3px var(--eerie-black);
		text-stroke: 3px var(--light-coral);
		font-size: 6rem;
		line-height: 1;
		margin: 0;
		padding: 0;
	}
</style>
