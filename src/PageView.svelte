<script lang="ts">
	import { pageContent } from "./lib/stores";
</script>

<div class="text">
	{@html $pageContent}
</div>

<style>
	.text {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		margin-top: 20px;
		margin-left: 20px;
	}
</style>
