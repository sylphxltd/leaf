import { Link } from "./Link";
import { cn } from "../lib/utils";

export interface Card {
	icon?: string;
	title: string;
	description: string;
	link: string;
}

export interface CardsProps {
	cards: Card[];
	columns?: 2 | 3 | 4;
}

export function Cards({ cards, columns = 2 }: CardsProps): JSX.Element {
	if (!cards || cards.length === 0) {
		return <></>;
	}

	return (
		<div
			className={cn(
				"grid gap-4 mt-6",
				columns === 2 && "sm:grid-cols-2",
				columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
				columns === 4 && "sm:grid-cols-2 lg:grid-cols-4"
			)}
			style={{ marginLeft: 0, marginRight: 0 }}
		>
			{cards.map((card, index) => {
				const CardContent = (
					<>
						<div className="mb-2 flex items-center gap-3">
							{card.icon && (
								<span className="text-2xl leading-none" style={{ marginBottom: 0 }}>
									{card.icon}
								</span>
							)}
							<span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
								{card.title}
							</span>
						</div>
						<p className="text-sm text-muted-foreground leading-relaxed" style={{ margin: 0 }}>
							{card.description}
						</p>
					</>
				);

				return (
					<Link
						key={index}
						to={card.link}
						className="group block rounded-lg border border-border bg-background p-5 transition-all hover:border-primary/50 hover:shadow-md"
						style={{ textDecoration: "none" }}
					>
						{CardContent}
					</Link>
				);
			})}
		</div>
	);
}
