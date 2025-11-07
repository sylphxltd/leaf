import { defineConfig } from "vite";
import { createReactPressPlugin, routesPlugin } from "@sylphx/reactpress";
import { resolve } from "node:path";

const docsDir = resolve(process.cwd(), "docs");

export default defineConfig({
	plugins: [routesPlugin(docsDir), ...createReactPressPlugin({
		title: "Sylphx Documentation",
		description: "Documentation for Sylphx tools",
		base: "/",
	})],
});
