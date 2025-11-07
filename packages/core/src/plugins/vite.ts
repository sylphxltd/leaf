import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { markdownPlugin } from "./markdown.js";
import type { ReactPressConfig } from "../types.js";

export function createReactPressPlugin(config: ReactPressConfig): Plugin[] {
	return [
		{
			name: "reactpress:config",
			config(_, { mode }) {
				const isProduction = mode === "production";
				return {
					define: {
						__REACTPRESS_CONFIG__: JSON.stringify(config),
						"process.env.NODE_ENV": JSON.stringify(mode),
					},
					esbuild: {
						jsx: "automatic",
						jsxDev: false,
						jsxImportSource: "react",
					},
					resolve: {
						conditions: isProduction ? ["production", "default"] : ["development", "default"],
					},
					optimizeDeps: {
						esbuildOptions: {
							jsx: "automatic",
							jsxDev: false,
						},
					},
				};
			},
		},
		markdownPlugin(config),
		...react({
			jsxRuntime: "automatic",
			jsxImportSource: "react",
		}),
	];
}
