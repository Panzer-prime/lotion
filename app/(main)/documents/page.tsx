"use client";
import { NoteCard } from "@/components/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Plus } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";

export default function Home() {
	const router = useRouter();
	const { session } = useSession();
	const create = useMutation(api.documents.create);
	const deleteDocumet = useMutation(api.documents.deleteDocumet);
	const Documents = useQuery(api.documents.getUserDocuments);

	const onCreate = () => {
		const promise = create({ title: "thats some title" })
			.then((id) => {
				router.push(`/documents/${id}`);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteNote = async ({ id }: { id: Id<"documents"> }) => {
		console.log("is something wrong ");
		await deleteDocumet({ id: id });
	};
	return (
		<div className="relative mx-auto flex flex-col pt-12 lg:max-w-4xl">
			<div className="mb-13">
				<TextareaAutosize
					placeholder="Search Notes"
					className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
				/>
			</div>
			<div className="flex flex-col">
				<div className="flex flex-row items-center justify-between pr-13">
					<p className="mb-5 text-sm font-semibold text-[#7c7d7c]">
						Your notes
					</p>

					<Button onClick={onCreate}>
						<Plus size={64} />
					</Button>
				</div>
				<div className="grid grid-cols-2 gap-y-14">
					{Documents &&
						Documents.map((item) => (
							<NoteCard
								key={item._id}
								imageUrl={item.coverImage}
								id={item._id}
								title={item.title}
								deleteDocument={() => deleteNote({ id: item._id })}
								icon={item.icon}
							/>
						))}
				</div>
			</div>
		</div>
	);
}
