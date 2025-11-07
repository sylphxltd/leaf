import { createReactPressPlugin, loadConfig } from "@sylphx/reactpress";
import { build as viteBuild } from "vite";

export async function build(root: string = process.cwd()) {
	const config = await loadConfig(root);

	await viteBuild({
		root,
		plugins: createReactPressPlugin(config),
		build: {
			outDir: "dist",
			emptyOutDir: true,
		},
	});

	console.log("Build completed successfully!");
}
