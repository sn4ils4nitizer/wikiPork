<script lang="ts">
	let newPageContent = "";
</script>

<div class="editor">
	<p>Page Editor:</p>

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

	.bigbox {
		display: flex;
		flex-direction: row;
	}
</style>
