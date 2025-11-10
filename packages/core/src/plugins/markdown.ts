import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import type { Plugin } from "vite";
import type { LeafConfig } from "../types.js";
import { createMarkdownProcessor } from "../markdown/processor.js";
import type { ComponentPlaceholder } from "./rehype-components.js";

export function markdownPlugin(config: LeafConfig): Plugin {
	return {
		name: "leaf:markdown",
		enforce: "pre",

		async load(id: string) {
			// Only process .md files
			if (!id.endsWith(".md")) {
				return null;
			}

			// Read the markdown file
			const rawCode = await readFile(id, "utf-8");

			// Parse frontmatter and extract content
			const { content: code } = matter(rawCode);

			// Create unified processor with TOC extraction
			const { processor, getToc } = createMarkdownProcessor({
				config,
				extractToc: true,
			});

			const vfile = await processor.process(code);
			const html = String(vfile);
			const toc = getToc();
			const components = (vfile.data.components as ComponentPlaceholder[]) || [];

			// Generate component imports if any components were detected
			const hasComponents = components.length > 0;
			const uniqueComponents = Array.from(
				new Set(components.map((c) => c.name)),
			);

			const componentImports = hasComponents
				? `import { parse, ${uniqueComponents.join(", ")} } from '@sylphx/leaf-theme-default';\n`
				: "";

			// Generate component mapping and props
			const componentMapping = hasComponents
				? `\nconst __LEAF_COMPONENTS__ = {\n${components.map((c) => `  '${c.id}': ${c.name}`).join(",\n")}\n};\n\nconst __LEAF_COMPONENT_PROPS__ = {\n${components.map((c) => `  '${c.id}': ${JSON.stringify(c.props)}`).join(",\n")}\n};\n`
				: "";

			// Generate replace function for html-react-parser
			const replaceFunction = hasComponents
				? `
  const options = {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.attribs && domNode.attribs['data-leaf-component']) {
        const id = domNode.attribs['data-leaf-component'];
        const Component = __LEAF_COMPONENTS__[id];
        const props = __LEAF_COMPONENT_PROPS__[id];
        if (Component) {
          return React.createElement(Component, props);
        }
      }
    }
  };

  return React.createElement('div', {
    className: 'markdown-content'
  }, parse(${JSON.stringify(html)}, options));`
				: `
  return React.createElement('div', {
    className: 'markdown-content',
    dangerouslySetInnerHTML: { __html: ${JSON.stringify(html)} }
  });`;

			// Generate React component that renders the HTML and exports TOC
			// Use React.createElement to avoid JSX parsing issues
			const component = `
import React from 'react';
${componentImports}
// Build-time TOC as fallback
const buildTimeToc = ${JSON.stringify(toc)};

// Try to read preloaded data from SSG (preferred)
let runtimeToc = buildTimeToc;
let preloadedLastModified = null;

if (typeof window !== 'undefined') {
  const preloadScript = document.getElementById('__LEAF_PRELOAD__');
  if (preloadScript) {
    try {
      const preloadData = JSON.parse(preloadScript.textContent || '{}');
      if (preloadData.toc && preloadData.toc.length > 0) {
        runtimeToc = preloadData.toc;
      }
      preloadedLastModified = preloadData.lastModified;
    } catch (e) {
      // Ignore preload errors, use build-time TOC
    }
  }
}

// Export runtime TOC (preloaded from SSG, or build-time fallback)
export const toc = runtimeToc;
${componentMapping}
export default function MarkdownContent() {${replaceFunction}
}
`;

			return {
				code: component,
				map: null,
			};
		},
	};
}
