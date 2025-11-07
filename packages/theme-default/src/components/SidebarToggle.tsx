import React from "react";

export interface SidebarToggleProps {
	open: boolean;
	onClick: () => void;
}

export function SidebarToggle({
	open,
	onClick,
}: SidebarToggleProps): JSX.Element {
	return (
		<button
			className="sidebar-toggle"
			onClick={onClick}
			aria-label="Toggle sidebar"
			aria-expanded={open}
		>
			<span className="sidebar-toggle-icon">
				<span className="line" />
				<span className="line" />
				<span className="line" />
			</span>
		</button>
	);
}
