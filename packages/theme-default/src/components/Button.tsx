import type { ComponentChildren } from "preact";
import { cn } from "../lib/utils";

interface ButtonProps {
	children: ComponentChildren;
	onClick?: () => void;
	className?: string;
	variant?: "icon" | "default";
	type?: "button" | "submit" | "reset";
	"aria-label"?: string;
	"aria-pressed"?: boolean;
}

export function Button({
	children,
	onClick,
	className,
	variant = "default",
	type = "button",
	"aria-label": ariaLabel,
	"aria-pressed": ariaPressed,
}: ButtonProps): JSX.Element {
	const baseStyles = "inline-flex items-center justify-center rounded-lg transition-all active:scale-95";

	const variantStyles = {
		icon: "h-9 w-9 p-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
		default: "gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground",
	};

	return (
		<button
			type={type}
			className={cn(baseStyles, variantStyles[variant], className)}
			onClick={onClick}
			aria-label={ariaLabel}
			aria-pressed={ariaPressed}
		>
			{children}
		</button>
	);
}
