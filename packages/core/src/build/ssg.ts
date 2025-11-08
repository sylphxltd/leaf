import { readFile } from "node:fs/promises";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { type Route, generateRoutes } from "../utils/routes.js";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import { remarkContainers } from "../plugins/remark-containers.js";
import { remarkCodeGroups } from "../plugins/remark-code-groups.js";
import { remarkCodeMeta } from "../plugins/remark-code-meta.js";
import { remarkBadge } from "../plugins/remark-badge.js";
import { rehypeLineHighlight } from "../plugins/rehype-line-highlight.js";
import { rehypeExternalLinks } from "../plugins/rehype-external-links.js";
import { rehypeMermaid } from "../plugins/rehype-mermaid.js";
import matter from "gray-matter";
import { generateSearchIndex } from "./search.js";
import { getLastModifiedTime, formatLastModified } from "../utils/git.js";

interface TocItem {
	text: string;
	id: string;
	level: number;
}

export interface SSGOptions {
	root: string;
	outDir: string;
	template: string;
	clientBundle: string;
}

export async function generateStaticSite(options: SSGOptions): Promise<void> {
	const { root, outDir, template } = options;

	// Load configuration
	const { loadConfig } = await import("../config/index.js");
	const config = await loadConfig(root);

	// Get all routes
	const routes = await generateRoutes(root);

	console.log(`Generating static HTML for ${routes.length} routes...`);

	// Generate HTML for each route
	for (const route of routes) {
		await generatePageHTML(route, outDir, template, config);
	}

	console.log(`✓ Generated ${routes.length} static pages`);

	// Generate search index
	await generateSearchIndex(routes, outDir);
}

async function generatePageHTML(
	route: Route,
	outDir: string,
	template: string,
	config: any,
): Promise<void> {
	// Convert route path to file path
	const htmlPath = routeToHtmlPath(route.path, outDir);

	// Read and process the markdown file
	const fileContent = await readFile(route.component, "utf-8");

	// Strip frontmatter before processing
	const { content: markdownContent } = matter(fileContent);

	// Get last modified time from git
	const lastModified = await getLastModifiedTime(route.component);
	const lastModifiedText = lastModified
		? formatLastModified(lastModified)
		: null;

	// Extract TOC
	const toc: TocItem[] = [];

	function extractToc() {
		return (tree: Root) => {
			visit(tree, "heading", (node) => {
				if (node.depth >= 2 && node.depth <= 3) {
					const text = node.children
						.filter((child) => child.type === "text")
						.map((child: any) => child.value)
						.join("");

					const id = text
						.toLowerCase()
						.replace(/\s+/g, "-")
						.replace(/[^\w-]/g, "");

					toc.push({
						text,
						id,
						level: node.depth,
					});
				}
			});
		};
	}

	// Process markdown with unified (same pipeline as the Vite plugin)
	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkMath) // Process math equations
		.use(remarkBadge) // Process badges in markdown text
		.use(remarkCodeGroups) // Must run before remarkContainers
		.use(remarkContainers)
		.use(remarkCodeMeta)
		.use(extractToc)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeSlug)
		.use(rehypeKatex) // Render math equations with KaTeX
		.use(rehypeMermaid) // Mark mermaid diagrams before highlighting
		.use(rehypeHighlight)
		.use(rehypeLineHighlight)
		.use(rehypeExternalLinks) // Add external link icons
		.use(rehypeStringify, { allowDangerousHtml: true });

	const vfile = await processor.process(markdownContent);
	const contentHtml = String(vfile);

	// Generate TOC HTML
	const tocHtml =
		toc.length > 0
			? `
		<aside class="toc-aside">
			<nav class="toc">
				<h3 class="toc-title">On this page</h3>
				<ul class="toc-list">
					${toc.map((item) => `<li class="toc-item toc-level-${item.level}"><a href="#${item.id}" class="toc-link">${item.text}</a></li>`).join("\n\t\t\t\t\t")}
				</ul>
			</nav>
		</aside>
	`
			: "";

	// Inline TOC script (lightweight, no dependencies)
	const tocScript =
		toc.length > 0
			? `
		<script>
		(function() {
			if (typeof window === "undefined") return;
			const toc = document.querySelector(".toc");
			if (!toc) return;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const id = entry.target.getAttribute("id");
						if (!id) return;
						const tocLink = toc.querySelector('a[href="#' + id + '"]');
						if (!tocLink) return;
						const tocItem = tocLink.closest(".toc-item");
						if (!tocItem) return;

						if (entry.isIntersecting) {
							toc.querySelectorAll(".toc-item").forEach((item) => {
								item.classList.remove("active");
							});
							tocItem.classList.add("active");
						}
					});
				},
				{
					rootMargin: "-80px 0px -80% 0px",
					threshold: 0,
				}
			);

			const headings = document.querySelectorAll("h2[id], h3[id]");
			headings.forEach((heading) => {
				observer.observe(heading);
			});
		})();
		</script>
	`
			: "";

	// Code copy script
	const codeCopyScript = `
		<script>
		(function() {
			if (typeof window === "undefined") return;

			const codeBlocks = document.querySelectorAll("pre code");

			codeBlocks.forEach((codeBlock) => {
				const pre = codeBlock.parentElement;
				if (!pre) return;
				if (pre.querySelector(".code-copy-btn")) return;

				const wrapper = document.createElement("div");
				wrapper.className = "code-block-wrapper";

				pre.parentNode.insertBefore(wrapper, pre);
				wrapper.appendChild(pre);

				const languageClass = Array.from(codeBlock.classList).find((cls) =>
					cls.startsWith("language-")
				);
				const language = languageClass
					? languageClass.replace("language-", "")
					: "text";

				const langLabel = document.createElement("span");
				langLabel.className = "code-lang";
				langLabel.textContent = language;
				wrapper.appendChild(langLabel);

				const button = document.createElement("button");
				button.className = "code-copy-btn";
				button.innerHTML = '<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
				button.setAttribute("aria-label", "Copy code");

				button.addEventListener("click", async () => {
					const code = codeBlock.textContent || "";
					try {
						await navigator.clipboard.writeText(code);
						button.classList.add("copied");
						setTimeout(() => {
							button.classList.remove("copied");
						}, 2000);
					} catch (err) {
						console.error("Failed to copy code:", err);
					}
				});

				wrapper.appendChild(button);
			});
		})();
		</script>
	`;

	// Code groups script
	const codeGroupsScript = `
		<script>
		(function() {
			if (typeof window === "undefined") return;

			const codeGroups = document.querySelectorAll(".code-group");

			codeGroups.forEach((container) => {
				const dataAttr = container.getAttribute("data-code-group");
				if (!dataAttr) return;

				try {
					const tabs = JSON.parse(dataAttr);
					if (tabs.length === 0) return;

					const tabsContainer = document.createElement("div");
					tabsContainer.className = "code-group-tabs";

					tabs.forEach((tab, index) => {
						const button = document.createElement("button");
						button.className = "code-group-tab" + (index === 0 ? " active" : "");
						button.textContent = tab.label;
						button.setAttribute("data-index", String(index));

						button.addEventListener("click", () => {
							tabsContainer.querySelectorAll(".code-group-tab").forEach((btn) => {
								btn.classList.remove("active");
							});
							button.classList.add("active");

							contentContainer.querySelectorAll(".code-group-content").forEach((content) => {
								content.classList.remove("active");
							});
							const targetContent = contentContainer.querySelector(".code-group-content[data-index=\\"" + index + "\\"]");
							if (targetContent) {
								targetContent.classList.add("active");
							}
						});

						tabsContainer.appendChild(button);
					});

					const contentContainer = document.createElement("div");
					contentContainer.className = "code-group-contents";

					tabs.forEach((tab, index) => {
						const contentDiv = document.createElement("div");
						contentDiv.className = "code-group-content" + (index === 0 ? " active" : "");
						contentDiv.setAttribute("data-index", String(index));

						const wrapper = document.createElement("div");
						wrapper.className = "code-block-wrapper";

						const pre = document.createElement("pre");
						const code = document.createElement("code");
						code.className = "hljs language-" + tab.language;
						code.textContent = tab.code;

						pre.appendChild(code);
						wrapper.appendChild(pre);

						const langLabel = document.createElement("span");
						langLabel.className = "code-lang";
						langLabel.textContent = tab.language;
						wrapper.appendChild(langLabel);

						const copyButton = document.createElement("button");
						copyButton.className = "code-copy-btn";
						copyButton.innerHTML = '<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
						copyButton.setAttribute("aria-label", "Copy code");

						copyButton.addEventListener("click", async () => {
							try {
								await navigator.clipboard.writeText(tab.code);
								copyButton.classList.add("copied");
								setTimeout(() => {
									copyButton.classList.remove("copied");
								}, 2000);
							} catch (err) {
								console.error("Failed to copy code:", err);
							}
						});

						wrapper.appendChild(copyButton);
						contentDiv.appendChild(wrapper);
						contentContainer.appendChild(contentDiv);

						if (typeof hljs !== "undefined") {
							hljs.highlightElement(code);
						}
					});

					container.innerHTML = "";
					container.appendChild(tabsContainer);
					container.appendChild(contentContainer);
				} catch (err) {
					console.error("Failed to parse code group:", err);
				}
			});
		})();
		</script>
	`;

	// Generate Sidebar HTML from config
	function generateSidebarHTML(items: any[], level = 0): string {
		if (!items || items.length === 0) return "";

		return items
			.map((item) => {
				const hasChildren = item.items && item.items.length > 0;
				const paddingLeft = level * 1 + 0.75;

				if (!hasChildren && item.link) {
					// Simple link
					const isActive = item.link === route.path;
					return `<a href="${item.link}" class="sidebar-link${isActive ? " active" : ""}" style="padding-left: ${paddingLeft}rem">${item.text}</a>`;
				}

				if (hasChildren) {
					// Group with children
					const hasActiveChild = item.items.some(
						(child: any) => child.link === route.path
					);
					const childrenHTML = generateSidebarHTML(item.items, level + 1);

					if (item.link) {
						// Group with link
						const isActive = item.link === route.path;
						return `<div class="sidebar-group">
							<div class="sidebar-group-header">
								<a href="${item.link}" class="sidebar-link${isActive ? " active" : ""}" style="padding-left: ${paddingLeft}rem">${item.text}</a>
								<button class="sidebar-group-toggle" aria-label="Expand group">
									<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(0deg); transition: transform 0.2s;">
										<polyline points="6 9 12 15 18 9" />
									</svg>
								</button>
							</div>
							<div class="sidebar-group-items expanded">${childrenHTML}</div>
						</div>`;
					} else {
						// Group without link (label only)
						return `<div class="sidebar-group">
							<button class="sidebar-group-label" style="padding-left: ${paddingLeft}rem">
								<span>${item.text}</span>
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(0deg); transition: transform 0.2s;">
									<polyline points="6 9 12 15 18 9" />
								</svg>
							</button>
							<div class="sidebar-group-items expanded">${childrenHTML}</div>
						</div>`;
					}
				}

				return "";
			})
			.join("");
	}

	const sidebarItems = config.theme?.sidebar || [];
	const sidebarHTML = generateSidebarHTML(sidebarItems);

	// Last updated script
	const lastUpdatedScript =
		lastModifiedText
			? `
		<script>
		(function() {
			if (typeof window === "undefined") return;
			const timeElement = document.getElementById("last-updated-time");
			if (timeElement) {
				timeElement.textContent = "${lastModifiedText}";
			}
		})();
		</script>
	`
			: "";

	// Mermaid script - only add if there are mermaid diagrams
	const hasMermaid = contentHtml.includes('class="mermaid"');
	const mermaidScript = hasMermaid
		? `
		<script type="module">
		import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
		mermaid.initialize({
			startOnLoad: true,
			theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default'
		});
		</script>
	`
		: "";

	// Generate DocFooter HTML with last updated
	const docFooterHtml = lastModifiedText
		? `
		<footer class="doc-footer">
			<div class="doc-footer-meta">
				<div class="last-updated">
					<span class="last-updated-text">Last updated: </span>
					<time id="last-updated-time">${lastModifiedText}</time>
				</div>
			</div>
		</footer>
	`
		: "";

	// Generate Nav HTML from config
	const navHTML = (config.theme?.nav || [])
		.map((item: any) => {
			const isExternal = item.link.startsWith("http");
			return `<a href="${item.link}" class="nav-link"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ""}>${item.text}</a>`;
		})
		.join("");

	// Critical CSS for instant layout rendering (prevent FOUC)
	const criticalCSS = `<style>
		/* Critical layout styles - inline for instant render */
		.layout{display:flex;flex-direction:column;min-height:100vh}
		.header{position:fixed;top:0;left:0;right:0;height:60px;z-index:100;background:var(--bg-color,#fff);border-bottom:1px solid var(--border-color,#e2e8f0)}
		.header-container{display:flex;align-items:center;justify-content:space-between;height:100%;max-width:1440px;margin:0 auto;padding:0 24px}
		.layout-content{display:flex;margin-top:60px;max-width:1440px;width:100%;margin-left:auto;margin-right:auto}
		.sidebar{position:fixed;top:60px;left:0;bottom:0;width:280px;overflow-y:auto;border-right:1px solid var(--border-color,#e2e8f0);background:var(--bg-color,#fff);z-index:50}
		.main-content{flex:1;margin-left:280px;padding:32px 48px;max-width:calc(100% - 280px)}
		@media(max-width:768px){.sidebar{transform:translateX(-100%);transition:transform 0.3s}.main-content{margin-left:0;max-width:100%;padding:24px}}
	</style>`;

	// Inject the rendered content, TOC, and scripts into the template
	let html = template.replace(
		'<div id="root"></div>',
		`<div id="root">
			<div class="layout">
				<header class="header">
					<div class="header-container">
						<a href="/" class="site-title">${config.title || "ReactPress"}</a>
						<nav class="nav">${navHTML}</nav>
						<button class="sidebar-toggle" aria-label="Toggle sidebar" aria-expanded="false">
							<span class="sidebar-toggle-icon">
								<span class="line"></span>
								<span class="line"></span>
								<span class="line"></span>
							</span>
						</button>
						<button class="theme-toggle" aria-label="Toggle theme">🌙</button>
					</div>
				</header>
				<button class="search-btn" aria-label="Search">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="11" cy="11" r="8"></circle>
						<path d="m21 21-4.35-4.35"></path>
					</svg>
					<span>Search</span>
					<kbd>⌘K</kbd>
				</button>
				<div class="layout-content">
					<aside class="sidebar">
						<nav class="sidebar-nav">${sidebarHTML}</nav>
					</aside>
					<main class="main-content">
						<div class="doc-content">
							<div class="markdown-content">${contentHtml}</div>
							${docFooterHtml}
						</div>
					</main>
					${tocHtml}
				</div>
			</div>
		</div>${tocScript}${codeCopyScript}${codeGroupsScript}${mermaidScript}${lastUpdatedScript}`,
	);

	// Inject critical CSS into <head>
	html = html.replace("</head>", `${criticalCSS}</head>`);

	// Ensure directory exists
	await mkdir(dirname(htmlPath), { recursive: true });

	// Write HTML file
	await writeFile(htmlPath, html, "utf-8");

	console.log(`  Generated: ${htmlPath}`);
}

function routeToHtmlPath(routePath: string, outDir: string): string {
	if (routePath === "/") {
		return join(outDir, "index.html");
	}

	// Remove leading slash
	const cleanPath = routePath.replace(/^\//, "");

	// Create /path/index.html for clean URLs
	return join(outDir, cleanPath, "index.html");
}
