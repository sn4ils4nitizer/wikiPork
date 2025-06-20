export function tabber(node: HTMLTextAreaElement) {
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Tab' && !event.shiftKey) {
			event.preventDefault();

			// Get current cursor position and textarea value
			const start = node.selectionStart;
			const end = node.selectionEnd;
			const value = node.value;
			const tab = String.fromCharCode(9);
			// Insert tab in the position
			node.value = value.substring(0, start) + tab + value.substring(end);

			node.selectionStart = node.selectionEnd = start + 1;
		}
	}

	node.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown)
		}
	}
}
