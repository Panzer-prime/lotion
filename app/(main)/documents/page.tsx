"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { NoteCard } from "@/components/card";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { ChevronDown, Plus, ToggleLeft } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Home() {
	const router = useRouter();
	const create = useMutation(api.documents.create);
	const deleteDocumet = useMutation(api.documents.deleteDocumet);
	const [modeActive, setModeActive] = useState<boolean>();
	const documents = useQuery(api.documents.getUserDocuments);

	const toggleMode = () => {
		setModeActive((prev) => !prev);
	};

	const onCreate = () => {
		const promise = create({ title: "thats some title" })
			.then((id) => {
				router.push(`/documents/${id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	function chunkArray(arr: Doc<"documents">[] | undefined, size = 6) {
		if (!arr || arr.length === 0) return [];

		const res = [];
		for (let i = 0; i < arr.length; i += size) {
			res.push(arr.slice(i, i + size));
		}
		return res;
	}

	console.log(modeActive);

	const deleteNote = async ({ id }: { id: Id<"documents"> }) => {
		console.log("is something wrong ");
		await deleteDocumet({ id: id });
	};

	const chunks = chunkArray(documents);
	return (
		<div className="relative mx-auto flex flex-col gap-8 pt-12 lg:max-w-4xl">
			<div className="flex items-center justify-center text-2xl font-medium">
				<p>How can i help you today?</p>
			</div>
			<div className="flex flex-col rounded-md bg-[#202020]">
				<TextareaAutosize
					placeholder="Ask or make anything "
					className="text-md w-full resize-none appearance-none overflow-hidden bg-transparent py-3 pl-7 font-medium text-[#8A8A8A]/80 focus:outline-none"
				/>
				<div className="flex justify-between px-3 py-5">
					<div className="flex flex-row text-[#8A8A8A]">
						<Button
							variant="ghost"
							onClick={toggleMode}
							className={cn(!modeActive && "text-white")}
						>
							Create Note
						</Button>
						<Button
							variant="ghost"
							className={cn(modeActive && "text-white")}
							onClick={toggleMode}
						>
							Ask AI
						</Button>
					</div>
					<Button className="h-8 w-8 rounded-full">
						<ChevronDown className="rotate-180" />
					</Button>
				</div>
			</div>

			<Carousel className="w-full">
				<CarouselContent>
					{documents &&
						chunkArray(documents, 6).map((group, i) => (
							<CarouselItem key={i}>
								<div className="flex flex-row gap-5">
									{group.map((item) => (
										<NoteCard
											key={item._id}
											imageUrl={item.coverImage}
											title={item.title}
											id={item._id}
											icon={item.icon}
											deleteDocument={() => deleteNote({ id: item._id })}
										/>
									))}
								</div>
							</CarouselItem>
						))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}

// {
// 	chunk(items, 5).map((group, i) => (
// 		<CarouselItem key={i}>
// 			<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
// 				{group.map((num) => (
// 					<Card key={num}>{num}</Card>
// 				))}
// 			</div>
// 		</CarouselItem>
// 	));
// }
