import { resolve } from "node:path";
import { createReactPressPlugin, loadConfig } from "@sylphx/leaf";
import { createServer } from "vite";

export async function dev(root: string = process.cwd()) {
	const config = await loadConfig(root);

	const server = await createServer({
		root,
		plugins: createReactPressPlugin(config),
		server: {
			port: 5173,
			open: true,
		},
	});

	await server.listen();

	server.printUrls();
	server.bindCLIShortcuts({ print: true });
}
