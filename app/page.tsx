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
		<div className="w-screen items-center justify-center">
			<Button variant="secondary">
				<a href="/documents">Go to Documents</a>
			</Button>
		</div>
	);
}
