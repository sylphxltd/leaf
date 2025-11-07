import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
	text: string;
	link?: string;
	items?: SidebarItem[];
}

interface SidebarProps {
	items?: SidebarItem[];
}

export function Sidebar({ items = [] }: SidebarProps) {
	const location = useLocation();

	return (
		<aside className="sidebar">
			<nav className="sidebar-nav">
				{items.map((item) => {
					if (!item.link) return null;
					const isActive = location.pathname === item.link;
					return (
						<Link
							key={item.link}
							to={item.link}
							className={isActive ? "sidebar-link active" : "sidebar-link"}
						>
							{item.text}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
