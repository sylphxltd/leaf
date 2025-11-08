import type { UserConfig as ViteUserConfig } from "vite";

export interface LeafConfig {
	/** Site title */
	title?: string;
	/** Site description */
	description?: string;
	/** Base URL */
	base?: string;
	/** Theme configuration */
	theme?: ThemeConfig;
	/** Markdown configuration */
	markdown?: MarkdownConfig;
	/** Vite configuration */
	vite?: ViteUserConfig;
}

export interface ThemeConfig {
	/** Navigation items */
	nav?: NavItem[];
	/** Sidebar configuration */
	sidebar?: SidebarConfig;
	/** Logo */
	logo?: string;
	/** Social links */
	socialLinks?: SocialLink[];
}

export interface NavItem {
	text: string;
	link: string;
}

export type SidebarConfig = SidebarItem[] | Record<string, SidebarItem[]>;

export interface SidebarItem {
	text: string;
	link?: string;
	items?: SidebarItem[];
	collapsed?: boolean;
}

export interface SocialLink {
	icon: "github" | "twitter" | "discord";
	link: string;
}

export interface MarkdownConfig {
	/** Enable line numbers in code blocks */
	lineNumbers?: boolean;
	/** Custom rehype plugins to process HTML */
	rehypePlugins?: RehypePlugin[];
	/** Custom remark plugins to process markdown */
	remarkPlugins?: RemarkPlugin[];
}

// Re-export plugin types from plugins module
export type { RemarkPlugin, RehypePlugin } from "./plugins/index.js";

export interface PageData {
	/** Page title from frontmatter */
	title?: string;
	/** Page description from frontmatter */
	description?: string;
	/** Page frontmatter */
	frontmatter: Record<string, any>;
	/** Page relative path */
	relativePath: string;
}
