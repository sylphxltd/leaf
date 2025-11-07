import React from "react";

export interface DocFooterProps {
	prev?: {
		text: string;
		link: string;
	};
	next?: {
		text: string;
		link: string;
	};
	editLink?: {
		pattern: string;
		text?: string;
	};
	lastUpdated?: boolean;
}

export function DocFooter({
	prev,
	next,
	editLink,
	lastUpdated,
}: DocFooterProps): JSX.Element {
	return (
		<footer className="doc-footer">
			{(editLink || lastUpdated) && (
				<div className="doc-footer-meta">
					{editLink && (
						<div className="edit-link">
							<a
								href={editLink.pattern}
								target="_blank"
								rel="noopener noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
									<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
								</svg>
								{editLink.text || "Edit this page"}
							</a>
						</div>
					)}
					{lastUpdated && (
						<div className="last-updated">
							<span className="last-updated-text">Last updated: </span>
							<time id="last-updated-time" />
						</div>
					)}
				</div>
			)}

			{(prev || next) && (
				<nav className="doc-footer-nav">
					<div className="prev">
						{prev && (
							<a href={prev.link} className="pager-link prev-link">
								<span className="desc">Previous page</span>
								<span className="title">{prev.text}</span>
							</a>
						)}
					</div>
					<div className="next">
						{next && (
							<a href={next.link} className="pager-link next-link">
								<span className="desc">Next page</span>
								<span className="title">{next.text}</span>
							</a>
						)}
					</div>
				</nav>
			)}
		</footer>
	);
}
