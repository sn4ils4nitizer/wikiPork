<script lang="ts">
	import { pageContent } from "./lib/stores";
	import PageView from "./PageView.svelte";
	import type { TreeNode } from "./types";
	import TreeItem from "./TreeItem.svelte";

	export let onSwitch;

	let pageToDelete: string = "";
	let treeData: TreeNode;

	async function fetchData() {
		try {
			const response = await fetch(
				"http://localhost:8080/api/wiki/listv2",
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
			const cleanedPath = path
				.replace(/^pages\//, "")
				.replace(/\.html$/, "");
			const response = await fetch(
				`http://localhost:8080/api/wiki/${cleanedPath}.html`,
			);
			if (!response.ok) {
				throw new Error(
					`HTTP Error! status: ${response.status}`,
				);
			}
			const data = await response.text();
			pageContent.set(data);
		} catch (error) {
			console.error("Fetch error", error);
		}
	}

	async function deletePage(page: string) {
		try {
			const response = await fetch(
				`http://localhost:8080/api/wiki/${page}.html`,
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
			on:click={() => {
				deletePage(pageToDelete).then(() => {
					location.reload();
				});
			}}>Delete</button
		>
		<div>
			<button on:click={() => onSwitch("editor")}
				>Create Page</button
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
