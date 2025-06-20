<script lang="ts">
	import TopBar from "../TopBar.svelte";
	import SideBar from "../SideBar.svelte";
	import PageView from "../PageView.svelte";
	import Editor from "../Editor.svelte";

	let currentView = "page";

	let pageToEdit: string = "";
	let pageToEditContent: string = "";

	function handlePageLoad(path: string, content: string) {
		pageToEdit = path;
		pageToEditContent = content;
	}

	function switchView(view: string, mode: "create" | "edit" = "edit") {
		if (view === "editor" && mode === "create") {
			pageToEdit = "";
			pageToEditContent = "";
		}
		currentView = view;
	}
</script>

<TopBar />
<div class="layout">
	<SideBar onSwitch={switchView} onPageLoad={handlePageLoad} />
	<main class="main-content">
		{#if currentView === "page"}
			<PageView />
		{:else if currentView === "editor"}
			<div class="editor-view">
				<Editor
					onSwitch={switchView}
					initialName={pageToEdit}
					initialContent={pageToEditContent}
				/>
			</div>
		{/if}
	</main>
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		background-color: black;
		height: 100vh;
		width: 100%;
		overflow: hidden;
	}

	.layout {
		display: flex;
		height: 100vh;
		width: 100%;
		font-family: monospace;
		font-size: 12pt;
		color: var(--ash-gray);
	}

	.main-content {
		flex-grow: 1;
		min-width: 0;
		width: 100%;
		overflow-y: auto;
		padding: 1.5rem;
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
