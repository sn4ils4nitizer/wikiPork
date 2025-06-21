<script lang="ts">
	import { pageContent } from "./lib/stores";
	import PageView from "./PageView.svelte";
	import type { TreeNode } from "./types";
	import TreeItem from "./TreeItem.svelte";

	export let onSwitch;

	export let onPageLoad: (path: string, content: string) => void;

	let pageToDelete: string = "";
	let treeData: TreeNode;

	async function fetchData() {
		try {
			const response = await fetch(
				"http://192.168.1.30/api/wiki/list",
			);
			if (!response.ok) {
				throw new Error(
					`HTTP Error! status: ${response.status}`,
				);
			}
			const data = await response.json();
			treeData = data;
		} catch (error) {
			console.error("Fetch error", error);
		}
	}

	export async function fetchPageContent(path: string) {
		try {
			const cleanedPath = path.replace(/^pages\//, "");
			const response = await fetch(
				`http://192.168.1.30:8080/api/wiki/${cleanedPath}`,
			);
			if (!response.ok) {
				throw new Error(
					`HTTP Error! status: ${response.status}`,
				);
			}
			const data = await response.text();
			const cleanedPathForDisplay = path
				.replace(/^pages\//, "")
				.replace(/\.html$/, "");
			pageToDelete = path
				.replace(/^pages\//, "")
				.replace(/\.html$/, "");
			pageContent.set(data);
			onPageLoad(cleanedPathForDisplay, data);
		} catch (error) {
			console.error("Fetch error", error);
		}
	}

	async function deletePage(path: string) {
		try {
			const response = await fetch(
				`http://192.168.1.30:8080/api/wiki/${path}.html`,
				{
					method: "DELETE",
				},
			);
			if (!response.ok) {
				throw new Error(
					`HTTP Error! status: ${response.status}`,
				);
			}
			return response;
		} catch (error) {
			console.error("Delete request error: ", error);
			throw error;
		}
	}

	fetchData();
</script>

<div class="sidebar">
	<div>
		<span class="sidebartext" style="margin-top: 5px;">
			<input
				style="background-color: var(--ligh-coral); color: var(--eerie-black);"
				bind:value={pageToDelete}
				placeholder="type page to delete"
			/>
		</span>
		<button
			style="margin-bottom: 2rem;"
			on:click={() => {
				deletePage(pageToDelete).then(() => {
					location.reload();
				});
			}}>Delete</button
		>
		<div>
			<button on:click={() => onSwitch("editor", "create")}
				>Create Page</button
			>
		</div>
		<div>
			<button on:click={() => onSwitch("editor", "edit")}
				>Edit Page</button
			>
		</div>
	</div>
	<span class="sidebartext">
		<ul style="margin-top: 1rem;">
			{#if treeData}
				<TreeItem node={treeData} {fetchPageContent} />
			{/if}
		</ul>
	</span>
</div>

<style>
	.sidebar {
		width: 160px;
		overflow: hidden;
		background: var(--salmon-pink);
		height: 100vh;
		display: flex;
		flex-flow: column;
		flex-shrink: 0;
	}

	.sidebartext {
		font-family: "Lucida Console", monospace;
		color: var(-eerie-black);
		font-size: 16pt;
		line-height: 1;
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: left;
		align-items: left;
		width: 100%;
	}

	button {
		width: 160px;
		border-width: 3px;
		background-color: var(--salmon-pink);
		border-color: var(--light-coral);
		border-radius: 10px;
	}
	ul {
		margin: 0px;
		padding: 0px;
		list-style: none;
	}
</style>
