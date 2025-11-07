import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * Remark plugin for inline badges
 * Syntax: <Badge type="tip" text="NEW" /> or <Badge text="v2.0" />
 */
export const remarkBadge: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, "html", (node: any, index, parent) => {
			if (!parent || index === undefined) return;

			const html = node.value;
			// Match <Badge ...attributes... />
			const badgeMatch = html.match(/<Badge\s+([^>]+)\s*\/>/);

			if (badgeMatch) {
				const attributes = badgeMatch[1];

				// Parse attributes
				const typeMatch = attributes.match(/type=["']([^"']+)["']/);
				const textMatch = attributes.match(/text=["']([^"']+)["']/);

				const type = typeMatch ? typeMatch[1] : "info";
				const badgeText = textMatch ? textMatch[1] : "";

				// Replace with badge HTML
				node.value = `<span class="badge badge-${type}">${badgeText}</span>`;
			}
		});
	};
};
