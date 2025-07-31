import { JSX } from "react";

export const Button = ({
	onClick,
	className,
	children,
}: {
	onClick: () => void;
	className: string;
	children: string;
}) => {
	return (
		<button
			className={`hover:bg-[#262626]" hidden rounded-md px-2 py-1 text-neutral-400 transition-all group-hover:flex ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
