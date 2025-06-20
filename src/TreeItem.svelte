<script lang="ts">
	import type { TreeNode } from "./types";
	import TreeItem from "./TreeItem.svelte";
	export let node: TreeNode;
	export let fetchPageContent: (path: string) => void;

	let collapsed = true;

	function toggle() {
		collapsed = !collapsed;
	}
</script>

<li>
	{#if node.isDir}
		<span class="directory" on:click={toggle}
			>{collapsed ? "→" : "⤷"} {node.name}</span
		>
		{#if !collapsed && node.children && node.children.length}
			<ul>
				{#each node.children as child}
					<svelte:self
						node={child}
						{fetchPageContent}
					/>
				{/each}
			</ul>
		{/if}
	{:else}
		<button
			class="tree-item-button"
			on:click={() => fetchPageContent(node.path)}
		>
			{node.name.replace(".html", "")}
		</button>
	{/if}
</li>

<style>
	.directory {
		display: block;
		box-sizing: border-box;
		width: 100%;
		background-color: var(--light-coral);
		font-size: 12pt;
		color: var(--eerie-black);
		cursor: pointer;
		font-weight: bold;
		user-select: none;
	}
	.directory:hover {
		opacity: 0.7;
	}

	ul {
		list-style: none;
		margin-top: 4px;
		padding: 0px;
	}

	li {
		list-style-type: none;
		padding: 0px;
		margin: 0px;
	}

	button {
		width: 160px;
		border-width: 3px;
		background-color: var(--salmon-pink);
		border-color: var(--light-coral);
		border-radius: 10px;
	}
</style>
