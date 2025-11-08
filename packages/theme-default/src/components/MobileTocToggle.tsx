import { useState, useEffect } from "preact/hooks";
import "iconify-icon";
import type { TocItem } from "./TableOfContents";

interface MobileTocToggleProps {
	toc: TocItem[];
}

export function MobileTocToggle({ toc }: MobileTocToggleProps): JSX.Element | null {
	const [isOpen, setIsOpen] = useState(false);

	// Don't render if no TOC items
	if (!toc || toc.length === 0) return null;

	useEffect(() => {
		// Close on route change
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			// Close if clicking a TOC link
			if (target.closest(".mobile-toc a")) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("click", handleClick);
			return () => document.removeEventListener("click", handleClick);
		}
	}, [isOpen]);

	return (
		<>
			{/* Toggle button - only visible on mobile */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="lg:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full border border-border bg-background shadow-lg hover:bg-muted transition-colors flex items-center justify-center"
				aria-label="Toggle table of contents"
			>
				<iconify-icon
					icon={isOpen ? "ph:x" : "ph:list"}
					width="24"
					height="24"
				/>
			</button>

			{/* Mobile TOC overlay */}
			{isOpen && (
				<div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
					<div className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background border-l border-border overflow-y-auto p-6">
						<h2 className="text-lg font-semibold mb-4">On this page</h2>
						<nav className="mobile-toc">
							<ul className="space-y-2">
								{toc.map((item) => (
									<li
										key={item.id}
										style={{
											paddingLeft: `${(item.level - 2) * 0.75}rem`,
										}}
									>
										<a
											href={`#${item.id}`}
											className="block py-1 text-sm hover:text-primary transition-colors"
											style={{
												color: "hsl(var(--foreground) / 0.7)",
											}}
										>
											{item.text}
										</a>
									</li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			)}
		</>
	);
}
