import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

export function NoteCard({
	imageUrl,
	title,
	toNote,
	icon,
}: {
	imageUrl?: string;
	toNote: () => void;
	title: string;
	id: string;
	icon: string | undefined;
}) {
	return (
		<Card className="relative h-32 w-32 overflow-hidden bg-[#252525] pt-0 outline-0" onClick={toNote}>
			<CardHeader className="absolute top-0 left-0 h-2/5 w-full p-0">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt="card cover"
						fill
						className="rounded-t-md object-cover"
					/>
				) : (
					<div className="h-full w-full"></div>
				)}
			</CardHeader>
			<CardContent className="absolute bottom-0 left-0 z-50 flex h-3/5 w-full flex-col gap-3 bg-[#252525]">
				<CardTitle className="mb-1 flex items-center gap-0 p-0 text-[24px] leading-none">
					<span className="flex items-center justify-center">
						{icon ? icon : <StickyNote className="h-6 w-6 align-middle" />}
					</span>
				</CardTitle>

				<p className="text-md line-clamp-1 flex flex-row items-center gap-3 truncate font-semibold">
					{title}
				</p>
			</CardContent>
		</Card>
	);
}
