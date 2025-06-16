<script lang="ts">
	let newPageContent = "";
</script>

<div class="editor">
	<h1>HELLO I AM EDITOR</h1>
	<textarea
		style="background-color: var(--salmon-pink); width: 100vh; height: 100vh;"
		bind:value={newPageContent}
		placeholder="Type text here"
	></textarea>
</div>

<style>
	.editor {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}
</style>
