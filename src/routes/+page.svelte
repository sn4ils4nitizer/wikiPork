<script lang="ts">
	import TopBar from "../TopBar.svelte";
	import SideBar from "../SideBar.svelte";
	import PageView from "../PageView.svelte";
	import Editor from "../Editor.svelt";

	let currentView = "page";

	function switchView(view: string) {
		currentView = view;
	}
</script>

<TopBar />
<div class="layout">
	<SideBar onSwitch={switchView} />
	{#if currentView === "page"}
		<PageView />
	{:else if currentView === "editor"}
		<Editor />
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		background-color: black;
	}

	.layout {
		display: flex;
		height: 100vh;
		font-family: monospace;
		font-size: 12pt;
		color: var(--ash-gray);
	}
</style>
