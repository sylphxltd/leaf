import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

interface LayoutProps {
	config?: any;
}

export function Layout({ config }: LayoutProps) {
	return (
		<div className="layout">
			<Header title={config?.title} nav={config?.theme?.nav} />
			<div className="layout-content">
				<Sidebar items={config?.theme?.sidebar} />
				<main className="main-content">
					<div className="doc-content">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
}
