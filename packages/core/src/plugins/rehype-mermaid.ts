import type { Root, Element } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * Rehype plugin to mark mermaid code blocks for client-side rendering
 * Transforms <pre><code class="language-mermaid"> to <div class="mermaid">
 */
export const rehypeMermaid: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, "element", (node: Element, index, parent) => {
			if (!parent || index === undefined) return;
			if (node.tagName !== "pre") return;

			// Find code element inside pre
			const codeElement = node.children.find(
				(child): child is Element =>
					child.type === "element" && child.tagName === "code",
			);

			if (!codeElement) return;

			// Check if it's a mermaid code block
			const classNames = (codeElement.properties?.className as string[]) || [];
			const isMermaid = classNames.some((cls) => cls === "language-mermaid");

			if (!isMermaid) return;

			// Extract mermaid code
			const mermaidCode = codeElement.children
				.filter((child) => child.type === "text")
				.map((child: any) => child.value)
				.join("");

			// Replace pre element with mermaid div
			const mermaidDiv: Element = {
				type: "element",
				tagName: "div",
				properties: {
					className: ["mermaid"],
				},
				children: [
					{
						type: "text",
						value: mermaidCode,
					},
				],
			};

			parent.children[index] = mermaidDiv;
		});
	};
};
