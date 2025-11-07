import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
	title?: string;
	nav?: Array<{ text: string; link: string }>;
	children?: React.ReactNode;
}

export function Header({ title = "ReactPress", nav = [], children }: HeaderProps): JSX.Element {
	return (
		<header className="header">
			<div className="header-content">
				{children && <div className="header-mobile-menu">{children}</div>}
				<Link to="/" className="logo">
					{title}
				</Link>
				<nav className="nav">
					{nav.map((item) => (
						<Link key={item.link} to={item.link} className="nav-link">
							{item.text}
						</Link>
					))}
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
