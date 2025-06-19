<script lang="ts">
	import TopBar from "../TopBar.svelte";
	import SideBar from "../SideBar.svelte";
	import PageView from "../PageView.svelte";
	import Editor from "../Editor.svelte";

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
		<div class="editor-view">
			<Editor onSwitch={switchView} />
		</div>
	{/if}
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		background-color: black;
		height: 100%;
		width: 100%;
		overflow-y: auto;
	}

	.layout {
		display: flex;
		height: 100vh;
		width: 100%;
		font-family: monospace;
		font-size: 12pt;
		color: var(--ash-gray);
	}

	.editor-view {
		flex-grow: 1;
		min-width: 0;
		box-sizing: border-box;
		padding-left: 2rem;
		padding-right: 2rem;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}
</style>
