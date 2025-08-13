"use client";
import { NoteCard } from "@/components/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const create = useMutation(api.documents.create);
	const Documents = useQuery(api.documents.getUserDocuments);

	const onCreate = () => {
		const promise = create({ title: "thats some title" })
			.then((id) => {
				router.push(`/${id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	console.log(Documents);

	return (
		<div className="relative mx-auto flex flex-col pt-12 lg:max-w-4xl">
			<div className="mb-13">
				<TextareaAutosize
					placeholder="Search Notes"
					className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
				/>
			</div>
			<div className="flex flex-col">
				<div className="flex flex-row justify-between pr-13">
					<p className="mb-5 text-sm font-semibold text-[#7c7d7c]">
						Your notes
					</p>
					<div>
						<Button variant="secondary" onClick={onCreate}>
							<Plus size={64} />
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-y-14">
					{Documents &&
						Documents.map((item) => (
							<NoteCard
								key={item._id}
								imageUrl={item.coverImage}
								id={item._id}
								title={item.title}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

