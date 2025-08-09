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
import { Divide } from "lucide-react";

export function NoteCard({
	imageUrl,
	title,
	id,
}: {
	imageUrl?: string;
	title: string;
	id: string;
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
				<CardTitle className="absolute -top-10 text-xl font-semibold">
					{title}
				</CardTitle>
			</CardContent>
			<CardFooter>
				<Button asChild className="font-semibold" variant="secondary">
					<Link href={`/main/${id}`}>Open Note</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
