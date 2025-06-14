<script lang="ts">
	import { pageContent } from "./lib/stores";
</script>

<div class="text">
	{@html $pageContent}
</div>

<style>
	.text {
		color: var(--ash-gray);
		margin-top: 20px;
		margin-left: 20px;
	}
</style>
