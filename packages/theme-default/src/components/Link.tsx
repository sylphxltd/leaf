import React from "react";
import { open } from "@sylphx/zen-router";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string;
	children: React.ReactNode;
}

/**
 * Link component that works with zen-router
 * Intercepts clicks and uses zen-router's open() for SPA navigation
 */
export function Link({ to, children, ...props }: LinkProps) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		// Allow default behavior for:
		// - External links
		// - Modified clicks (ctrl/cmd/shift)
		// - Right clicks
		if (
			to.startsWith("http") ||
			to.startsWith("//") ||
			e.ctrlKey ||
			e.metaKey ||
			e.shiftKey ||
			e.button !== 0
		) {
			return;
		}

		e.preventDefault();
		open(to);
	};

	return (
		<a href={to} onClick={handleClick} {...props}>
			{children}
		</a>
	);
}
