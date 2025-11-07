import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";
import { routesPlugin } from "@sylphx/reactpress/plugins/routes.js";
import { resolve } from "node:path";

const docsDir = resolve(process.cwd(), "docs");

export default defineConfig({
	plugins: [
		routesPlugin(docsDir),
		{
			name: "reactpress:mdx",
			enforce: "pre",
			...mdx({
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypeSlug, rehypeHighlight],
			}),
		},
		react(),
	],
});
