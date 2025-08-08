import Image from "next/image";
import Link from "next/link";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export function NoteCard({
	imageUrl,
	title,
	id,
}: {
	imageUrl: string;
	title: string;
	id: string;
}) {
	return (
		<Card className="w-full max-w-sm bg-[#252525] pt-0 text-[#d6d7d7]">
			<CardHeader className="w-full rounded-xl p-0 pt-0.5">
				<Image
					src={imageUrl}
					alt="cover"
					width={400}
					height={200}
					className="h-40 w-full rounded-t-md object-cover"
				/>
			</CardHeader>
			<CardContent className="relative pt-4">
				<CardTitle className="absolute -top-10 text-xl font-semibold">
					{title}
				</CardTitle>
			</CardContent>
			<CardFooter>
				<Button asChild className="bg-zinc-800 hover:bg-zinc-900">
					<Link href={`/main/${id}`}>Open Note</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
