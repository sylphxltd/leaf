/**
 * Initialize copy code button functionality
 * Should be called once when the app mounts
 */
export function initCopyCode(): void {
	// Use event delegation for better performance
	document.addEventListener("click", async (e) => {
		const target = e.target as HTMLElement;
		const button = target.closest(".code-copy-btn");

		if (!button) return;

		// Find the code block
		const wrapper = button.closest(".code-block-wrapper");
		if (!wrapper) {
			// Not a code block, skip
			return;
		}

		const pre = wrapper.querySelector("pre");
		const code = pre?.querySelector("code");

		if (!code) return;

		// Get code text
		const text = code.textContent || "";

		try {
			// Copy to clipboard
			await navigator.clipboard.writeText(text);

			// Visual feedback - change icon
			const icon = button.querySelector("iconify-icon");
			if (icon) {
				icon.setAttribute("icon", "ph:check");
			}
			button.classList.add("copied");

			// Reset after 2 seconds
			setTimeout(() => {
				if (icon) {
					icon.setAttribute("icon", "ph:copy");
				}
				button.classList.remove("copied");
			}, 2000);
		} catch (err) {
			console.error("Failed to copy code:", err);
		}
	});
}
