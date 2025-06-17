<script lang="ts">
	import { pageContent } from "./lib/stores";
	import PageView from "./PageView.svelte";

	export let onSwitch;

	let pageToDelete: string = "";
	let pages: string[] = [];

	async function fetchData() {
		try {
			const response = await fetch(
				"http://localhost:8080/api/wiki2/list",
			);
			if (!response.ok) {
				throw new Error(
					`HTTP Error! status: ${response.status}`,
				);
			}
			const data = await response.json();
			console.log(data);
			pages = data;
		} catch (error) {
			console.error("Fetch errror", error);
		}
	}

	async function fetchPageContent(page: string) {
		try {
			const response = await fetch(
				`http://localhost:8080/api/wiki/${page}.html`,
			);
			if (!response.ok) {
				throw new Error(
					`HTTP Error! status: ${response.status}`,
				);
			}
			const data = await response.text();
			console.log(data);
			console.log(typeof pageContent, pageContent);
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
			<button on:click={() => onSwitch("page")}
				>Page View</button
			>
			<button on:click={() => onSwitch("editor")}
				>Editor View</button
			>
		</div>
	</div>
	<span class="sidebartext">
		<ul>
			{#each pages as item}
				<li style="list-style: none; margin-top: 5px;">
					<button
						on:click={() =>
							fetchPageContent(
								item.replace(
									".html",
									"",
								),
							)}>{item}</button
					>
				</li>
			{/each}
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
		border-width: 3px;
		background-color: var(--salmon-pink);
		border-color: var(--light-coral);
		border-radius: 10px;
	}
</style>
