import type { Plugin } from "unified";
import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

/**
 * Rehype plugin to add anchor links to headings
 * Creates clickable # symbols like VitePress
 */
export const rehypeHeaderAnchors: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, "element", (node: Element) => {
			// Only process h1-h6 tags
			if (!/^h[1-6]$/.test(node.tagName)) return;

			// Skip if no id (rehype-slug should have added it)
			if (!node.properties?.id) return;

			const id = String(node.properties.id);

			// Create anchor link element
			const anchor: Element = {
				type: "element",
				tagName: "a",
				properties: {
					className: ["header-anchor"],
					href: `#${id}`,
					"aria-label": "Permalink to this heading",
				},
				children: [{ type: "text", value: "#" }],
			};

			// Prepend anchor to heading children
			node.children.unshift(anchor);
		});
	};
};
