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
import { ChevronDown } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Id, Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import { getAiResponse } from "@/lib/googleAI";

export default function Home() {
	const router = useRouter();

	const create = useMutation(api.documents.create);
	const deleteDocumet = useMutation(api.documents.deleteDocumet);
	const documents = useQuery(api.documents.getUserDocuments);

	// instead of boolean, use a string union type
	const [mode, setMode] = useState<"note" | "ai">("note");
	const [input, setInput] = useState<string>("");
	const [aiContent, setAiContent] = useState<string>();

	const handleAction = async () => {
		if (!input || input.trim().length === 0) return;

		if (mode === "ai") {
			const text = await getAiResponse(input);
			setAiContent(text);
			return;
		}

		if (mode === "note") {
			await create({ title: input || "Untitled" })
				.then((id) => {
					router.push(`/documents/${id}`);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	function chunkArray(arr: Doc<"documents">[] | undefined, size = 6) {
		if (!arr || arr.length === 0) return [];
		const res = [];
		for (let i = 0; i < arr.length; i += size) {
			res.push(arr.slice(i, i + size));
		}
		return res;
	}

	const toNote = async ({ id }: { id: Id<"documents"> }) => {
		router.push(`/documents/${id}`);
	};

	return (
		<div className="relative mx-auto flex flex-col gap-8 pt-12 lg:max-w-4xl">
			<div className="flex items-center justify-center text-2xl font-medium">
				<p>How can I help you today?</p>
			</div>
			<div className="flex flex-col rounded-md bg-[#202020]">
				<TextareaAutosize
					onChange={(event) => setInput(event.currentTarget.value)}
					placeholder="Ask or make anything"
					className="text-md w-full resize-none appearance-none overflow-hidden bg-transparent py-3 pl-7 font-medium text-[#8A8A8A]/80 focus:outline-none"
				/>
				<div className="flex justify-between px-3 py-5">
					<div className="flex flex-row text-[#8A8A8A]">
						<Button
							variant="ghost"
							onClick={() => setMode("note")}
							className={cn(mode === "note" && "text-white")}
						>
							Create Note
						</Button>
						<Button
							variant="ghost"
							onClick={() => setMode("ai")}
							className={cn(mode === "ai" && "text-white")}
						>
							Ask AI
						</Button>
					</div>
					<Button className="h-8 w-8 rounded-full" onClick={handleAction}>
						<ChevronDown className="rotate-180" />
					</Button>
				</div>
			</div>

			<Carousel className="w-full">
				<CarouselContent>
					{documents &&
						chunkArray(documents, 6).map((group, index) => (
							<CarouselItem key={index}>
								<div className="flex flex-row gap-5">
									{group.map((item) => (
										<NoteCard
											key={item._id}
											imageUrl={item.coverImage}
											title={item.title}
											id={item._id}
											icon={item.icon}
											toNote={() => toNote({ id: item._id })}
										/>
									))}
								</div>
							</CarouselItem>
						))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>

			{aiContent && mode === "ai" && (
				<div className="prose prose-invert min-h-44 w-full rounded-md bg-[#202020] p-3 whitespace-pre-wrap">
					<ReactMarkdown
						rehypePlugins={[rehypeHighlight, remarkGfm]}
						remarkPlugins={[remarkBreaks]}
					>
						{aiContent}
					</ReactMarkdown>
				</div>
			)}
		</div>
	);
}
