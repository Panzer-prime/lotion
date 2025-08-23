"use client";
import { useEffect, useMemo, useState } from "react";

import Cover from "@/components/Cover";
import TextareaAutosize from "react-textarea-autosize";
import { ClientUploadedFileData } from "uploadthing/types";
import { Button } from "@/components/MenuButton";
import { Button as Button2 } from "@/components/ui/button";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { IconPicker } from "@/components/iconpicker";
import { cn } from "@/lib/utils";

export default function Home() {
	const params = useParams<{ documentID: string }>();
	const update = useMutation(api.documents.update);
	const [imageUrl, setImageUrl] = useState<string>();
	const [title, setTitle] = useState<string | undefined>("");

	const document = useQuery(api.documents.getById, {
		documentID: params.documentID,
	});

	const Editor = useMemo(
		() => dynamic(() => import("@/components/editor"), { ssr: false }),
		[],
	);

	const enableCover = async () => {
		try {
			const response = await fetch("https://picsum.photos/800/600");
			if (!response.ok) throw new Error("Failed to fetch image");
			setImageUrl(response.url);
		} catch (e) {
			console.error(e);
		}
	};

	const uploadImage = (
		files: ClientUploadedFileData<{
			uploadedBy: string;
		}>[],
	) => {
		const [res] = files;
		setImageUrl(res.ufsUrl);
	};
	useEffect(() => {
		setTitle(document?.title);
	}, [document?.title]);

	useEffect(() => {
		const handler = setTimeout(() => {
			update({ id: params.documentID, title, coverImage: imageUrl });
		}, 500);

		return () => clearTimeout(handler);
	}, [title, imageUrl]);

	const updateEmoji = (value: string) => {
		update({
			id: params.documentID,
			icon: value,
		});
	};

	const onChange = ({
		content,
		title,
	}: {
		content: string | undefined;
		title: string | undefined;
	}) => {
		update({
			id: params.documentID,
			content: content,
			title: title,
			coverImage: imageUrl,
		});
	};
	if (document == undefined) {
		return <div></div>;
	}
	if (document == null) {
		return <div></div>;
	}
	return (
		<div className="w-full">
			{document.coverImage && (
				<Cover href={document.coverImage} uploadImage={uploadImage} />
			)}

			<div className="relative mx-auto flex flex-col lg:max-w-4xl">
				<div className="group mt-3 mb-11 ml-13">
					<div className="mb-2 flex flex-row gap-3.5">
						{!document.coverImage && (
							<Button
								className="hidden rounded-md px-2 py-1 text-neutral-400 transition-all group-hover:flex hover:bg-[#262626] hover:text-white"
								onClick={enableCover}
							>
								Add Cover
							</Button>
						)}

						<IconPicker onChange={updateEmoji} asChild>
							<p
								className={cn(
									`text-8xl text-neutral-400`,
									document.icon && "absolute -top-16 -left-16",
								)}
							>
								{document.icon ? (
									document.icon
								) : (
									<Button2 variant="ghost" className="text-[16px]">
										pick an emohi
									</Button2>
								)}
							</p>
						</IconPicker>
					</div>

					<TextareaAutosize
						value={title}
						placeholder="Untitled"
						className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
						onChange={(event) => {
							setTitle(event.currentTarget.value);
						}}
					/>
				</div>

				<Editor onChange={onChange} initialContent={document.content} />
			</div>
		</div>
	);
}
