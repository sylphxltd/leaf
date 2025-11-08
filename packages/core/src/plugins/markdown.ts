import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import type { Plugin } from "vite";
import type { LeafConfig } from "../types.js";
import { createMarkdownProcessor } from "../markdown/processor.js";

export function markdownPlugin(config: LeafConfig): Plugin {
	return {
		name: "leaf:markdown",
		enforce: "pre",

		async load(id: string) {
			// Only process .md and .mdx files
			if (!id.endsWith(".md") && !id.endsWith(".mdx")) {
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

			// Generate React component that renders the HTML and exports TOC
			// Use React.createElement to avoid JSX parsing issues
			const component = `
import React from 'react';

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

export default function MarkdownContent() {
  return React.createElement('div', {
    className: 'markdown-content',
    dangerouslySetInnerHTML: { __html: ${JSON.stringify(html)} }
  });
}
`;

			return {
				code: component,
				map: null,
			};
		},
	};
}
