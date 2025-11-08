import React, { useState } from "react";
import { Outlet, useMatches, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { TableOfContents, type TocItem } from "../components/TableOfContents";
import { SidebarToggle } from "../components/SidebarToggle";
import { DocFooter, type DocFooterProps } from "../components/DocFooter";
import { Search } from "../components/Search";

interface LayoutProps {
	config?: any;
}

export function Layout({ config }: LayoutProps): JSX.Element {
	const matches = useMatches();
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Get TOC and docFooter from route handle
	const currentMatch = matches[matches.length - 1];
	const handle = (currentMatch?.handle as any) || {};
	const toc = handle.toc || [];
	const docFooter = handle.docFooter;

	React.useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768 && sidebarOpen) {
				setSidebarOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [sidebarOpen]);

	React.useEffect(() => {
		setSidebarOpen(false);
	}, [location.pathname]);

	return (
		<div className="layout">
			<Header title={config?.title} nav={config?.theme?.nav}>
				<SidebarToggle open={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />
			</Header>
			<Search />
			<div className="layout-content">
				<Sidebar
					items={config?.theme?.sidebar}
					open={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>
				<main className="main-content">
					<div className="doc-content">
						<Outlet />
						{docFooter && <DocFooter {...docFooter} />}
					</div>
				</main>
				{toc && toc.length > 0 && (
					<aside className="toc-aside">
						<TableOfContents items={toc} />
					</aside>
				)}
			</div>
		</div>
	);
}
