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
				? `import { ${uniqueComponents.join(", ")} } from '@sylphx/leaf-theme-default';\nimport { render as _$render, createComponent as _$createComponent } from 'solid-js/web';\nimport { onMount } from 'solid-js';\n`
				: ``;

			// Generate component mapping - not needed anymore, we'll create components directly
			const componentMapping = "";

			// Generate render function using SolidJS render API to mount components
			const renderFunction = hasComponents
				? `
  let containerRef;

  onMount(() => {
    // Mount components after HTML is rendered
    ${components.map((c) => {
				// Generate createComponent call with props object
				const propsObj = JSON.stringify(c.props);
				return `
    const placeholder_${c.id.replace(/-/g, '_')} = containerRef.querySelector('[data-leaf-component="${c.id}"]');
    if (placeholder_${c.id.replace(/-/g, '_')}) {
      _$render(() => _$createComponent(${c.name}, ${propsObj}), placeholder_${c.id.replace(/-/g, '_')});
    }`;
			}).join('')}
  });

  return (
    <div ref={containerRef} class="markdown-content" innerHTML={${JSON.stringify(html)}} />
  );`
				: `
  return (
    <div class="markdown-content" innerHTML={${JSON.stringify(html)}} />
  );`;

			// Generate SolidJS component that renders the HTML and exports TOC
			const component = `
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
export default function MarkdownContent() {${renderFunction}}
`;

			return {
				code: component,
				map: null,
			};
		},
	};
}
