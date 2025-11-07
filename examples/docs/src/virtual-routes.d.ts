declare module "virtual:reactpress/routes" {
	import type { ComponentType } from "react";

	export interface RouteData {
		path: string;
		component: ComponentType;
		data: {
			title?: string;
			description?: string;
			frontmatter: Record<string, unknown>;
		};
	}

	export const routes: RouteData[];
}
