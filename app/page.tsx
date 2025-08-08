"use client";
import { NoteCard } from "@/components/card";
import { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Home() {
	const [imageUrl, setImageUrl] = useState<string>("");

	const getImage = async () => {
		const response = await fetch("https://picsum.photos/800/600");
		setImageUrl(response.url);
		console.log(imageUrl, "writing the  url state");
	};
	useEffect(() => {
		getImage();
	}, []);

	const something = [1, 2, 3, 4];

	return (
		<div className="relative mx-auto flex flex-col pt-12 lg:max-w-4xl">
			<div className="mb-13">
				<TextareaAutosize
					placeholder="Search Notes"
					className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl font-bold focus:outline-none"
				/>
			</div>
			<div className="flex flex-col">
				<p className="mb-5 text-sm font-semibold text-[#7c7d7c]">Your notes</p>
				<div className="grid grid-cols-2 gap-y-14">
					{something.map(
						(value) =>
							imageUrl && (
								<NoteCard
									imageUrl={imageUrl}
									id="some random gay"
									title="some title"
								/>
							),
					)}
				</div>
			</div>
		</div>
	);
}
