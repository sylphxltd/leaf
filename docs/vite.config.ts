import { defineConfig } from "vite";
import {
	createLeafPlugin,
	loadConfig,
	routesPlugin,
} from "@sylphx/leaf";
import { resolve } from "node:path";

const docsDir = resolve(process.cwd(), "docs");
const config = await loadConfig(process.cwd());

export default defineConfig({
	plugins: [routesPlugin(docsDir), ...createLeafPlugin(config)],
});
