<script lang="ts">
	export let onSwitch: (view: string) => void;
	let newPageContent = "";
	let newPageName = "";

	async function savePage(name: string, content: string) {
		try {
			const response = await fetch(
				`http://localhost:8080/api/wiki/${name}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "text/plain",
					},
					body: content,
				},
			);

			if (!response.ok) {
				throw new Error(
					"HTTP error! Status: ${response.status}",
				);
			}

			console.log("Page saved successfully.");
		} catch (err) {
			console.error("Error saving page: ", err);
		}
	}
</script>

<div></div>
<div class="editor">
	<p>Page Editor:</p>
	<div>
		<input
			style="background-color: var(--light-coral); color: var(--eerie-black);"
			bind:value={newPageName}
			placeholder="Page Name"
		/>
		<button
			on:click={() => {
				savePage(newPageName, newPageContent).then(
					() => {
						location.reload();
					},
				);
			}}>Save</button
		>
		<button on:click={() => onSwitch("page")}>Cancel</button>
	</div>
	<textarea bind:value={newPageContent} placeholder="Type text here"
	></textarea>
</div>

<style>
	.editor {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	textarea {
		flex: 1;
		background-color: var(--salmon-pink);
		width: 100%;
		height: 100vh;
		resize: none;
		border: none;
		padding: 1rem;
		font-family: "Lucida Console";
		font-size: 14pt;
		box-sizing: border-box;
		overflow: auto;
	}

	button {
		border-width: 3px;
		background-color: var(--salmon-pink);
		border-color: var(--light-coral);
		border-radius: 10px;
	}
</style>
