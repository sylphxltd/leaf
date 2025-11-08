import React, { useState, useEffect } from "react";
import { Outlet, useMatches, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { TableOfContents, type TocItem } from "../components/TableOfContents";
import { DocFooter, type DocFooterProps } from "../components/DocFooter";
import { Search } from "../components/Search";
import { cn } from "../lib/utils";

interface LayoutProps {
	config?: any;
}

export function Layout({ config }: LayoutProps): JSX.Element {
	const matches = useMatches();
	const location = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const currentMatch = matches[matches.length - 1];
	const handle = (currentMatch?.handle as any) || {};
	const toc = handle.toc || [];
	const docFooter = handle.docFooter;

	useEffect(() => {
		setSidebarOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768 && sidebarOpen) {
				setSidebarOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [sidebarOpen]);

	return (
		<div className="min-h-screen bg-background">
			<Header
				title={config?.title}
				nav={config?.theme?.nav}
				onMenuClick={() => setSidebarOpen(!sidebarOpen)}
			/>
			<Search />

			<div className="pt-16">
				<Sidebar
					items={config?.theme?.sidebar}
					open={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>

				<div className="lg:pl-64">
					<div className="flex px-8 py-8 gap-8 lg:gap-10 xl:gap-12">
						<main className="flex-1 min-w-0">
							<article className="mx-auto" style={{ maxWidth: '48rem' }}>
								<div className="prose prose-slate dark:prose-invert max-w-none">
									<Outlet />
								</div>
								{docFooter && (
									<div className="mt-16 pt-8 border-t border-border/40">
										<DocFooter {...docFooter} />
									</div>
								)}
							</article>
						</main>

						{toc && toc.length > 0 && (
							<aside className="hidden xl:block w-64 flex-shrink-0">
								<TableOfContents items={toc} />
							</aside>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
