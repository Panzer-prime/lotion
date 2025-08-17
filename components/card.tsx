import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Divide, StickyNote } from "lucide-react";

export function NoteCard({
	imageUrl,
	title,
	id,
	icon,
	deleteDocument,
}: {
	imageUrl?: string;
	deleteDocument: () => void;
	title: string;
	id: string;
	icon: string | undefined;
}) {
	return (
		<Card className="w-full max-w-sm border-0 bg-[#252525] pt-0 text-[#d6d7d7] outline-0">
			<CardHeader className="w-full rounded-xl p-0 pt-0.5">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt="cover"
						width={400}
						height={200}
						className="h-40 w-full rounded-t-md object-cover"
					/>
				) : (
					<div className="h-40 w-full rounded-t-md"></div>
				)}
			</CardHeader>
			<CardContent className="relative pt-4">
				<CardTitle className="absolute -top-10 line-clamp-1 flex max-w-3/4 flex-row items-center gap-2 truncate text-xl font-semibold">
					<span className="text-4xl">{icon ? icon : <StickyNote />}</span>
					{title}
				</CardTitle>
			</CardContent>
			<CardFooter className="flex flex-row gap-2">
				<Button asChild className="font-semibold">
					<Link href={`/documents/${id}`}>Open Note</Link>
				</Button>
				<Button onClick={deleteDocument}> delete</Button>
			</CardFooter>
		</Card>
	);
}
