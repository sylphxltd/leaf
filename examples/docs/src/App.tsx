import { Layout } from "@sylphx/reactpress-theme-default";
import { Route, Routes } from "react-router-dom";
import { routes } from "virtual:reactpress/routes";

const config = {
	title: "Sylphx Documentation",
	description: "Documentation for Sylphx tools",
	base: "/",
	theme: {
		nav: [
			{ text: "Zen", link: "/zen" },
			{ text: "Craft", link: "/craft" },
			{ text: "Silk", link: "/silk" },
		],
		sidebar: [
			{ text: "Introduction", link: "/" },
			{ text: "Zen", link: "/zen" },
			{ text: "Craft", link: "/craft" },
			{ text: "Silk", link: "/silk" },
		],
	},
};

export function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout config={config} />}>
				{routes.map((route) => (
					<Route
						key={route.path}
						path={route.path === "/" ? undefined : route.path}
						index={route.path === "/"}
						element={<route.component />}
					/>
				))}
			</Route>
		</Routes>
	);
}
