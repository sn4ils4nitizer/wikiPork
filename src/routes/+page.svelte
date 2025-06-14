<script>
	import TopBar from "../TopBar.svelte";
	import SideBar from "../SideBar.svelte";
	import PageView from "../PageView.svelte";
</script>

<TopBar />
<div class="layout">
	<SideBar />
	<PageView />
</div>

<style>
	:global(body) {
		margin: 0;
		background-color: black;
	}

	.layout {
		display: flex;
		height: 100vh;
		color: var(--ash-gray);
	}
</style>
