import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker from "emoji-picker-react";

interface IconPickerProps {
	children: React.ReactNode;
	onChange: (value: string) => void;
	asChild?: boolean;
}
export const IconPicker = ({
	children,
	onChange,
	asChild,
}: IconPickerProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
			<PopoverContent className="relative">
				<EmojiPicker
					height={350}
					onEmojiClick={(data) => onChange(data.emoji)}
				/>
			</PopoverContent>
		</Popover>
	);
};
