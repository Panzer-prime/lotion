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
import { Stick } from "next/font/google";

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
		<Card className="relative h-32 w-32 overflow-hidden bg-[#252525] pt-0 outline-0">
			<CardHeader className="absolute top-0 left-0 h-2/5 w-full p-0">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt="card cover"
						fill
						className="rounded-md object-cover"
					/>
				) : (
					<div className="h-full w-full rounded-t-md"></div>
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

{
	/* <Card className="w-full max-w-sm border-0 bg-[#252525] ">
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
					<Link href={`/documents/${id}`} prefetch={false}>
						Open Note
					</Link>
				</Button>
				<Button onClick={deleteDocument}> delete</Button>
			</CardFooter>
		</Card> */
}
