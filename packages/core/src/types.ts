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
	vite?: any;
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
	/** Custom rehype plugins */
	rehypePlugins?: any[];
	/** Custom remark plugins */
	remarkPlugins?: any[];
}

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
