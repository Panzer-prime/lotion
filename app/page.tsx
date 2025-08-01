"use client";
import Image from "next/image";
import Cover from "@/components/Cover";
import { Editor } from "@/components/index";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/MenuButton";
import { ClientUploadedFileData } from "uploadthing/types";
import { setCookie, getCookie } from "@/utils/utils";
export default function Home() {
	const [imageUrl, setImageUrl] = useState<string>();
	const [emoji, setEmoji] = useState<string>("s");

	useEffect(() => {
		const cookie = getCookie("imageUrl");
		if (cookie) {
			setImageUrl(cookie);
		}
	}, []);

	const enableCover = async () => {
		const response = await fetch("https://picsum.photos/800/600");

		setImageUrl(response.url);
		setCookie("imageUrl", response.url, 12);
	};

	const uploadImage = (
		files: ClientUploadedFileData<{
			uploadedBy: string;
		}>[],
	) => {
		const [res] = files;

		setImageUrl(res.ufsUrl);
		setCookie("imageUrl", res.ufsUrl, 12);
	};
	return (
		<div className="">
			{imageUrl && <Cover href={imageUrl} uploadImage={uploadImage} />}
			<div className="relative mx-auto flex flex-col lg:max-w-4xl">
				<div className="group mt-3 mb-11 ml-13">
					<div className="mb-2 flex flex-row gap-3.5">
						{!imageUrl && (
							<Button
								className="hidden rounded-md px-2 py-1 text-neutral-400 transition-all group-hover:flex hover:bg-[#262626]"
								onClick={enableCover}
							>
								Add Cover
							</Button>
						)}

						{!emoji && (
							<Button
								className="hidden rounded-md px-2 py-1 text-neutral-400 transition-all group-hover:flex hover:bg-[#262626]"
								onClick={() => {}}
							>
								Pick icon
							</Button>
						)}
					</div>

					<TextareaAutosize
						placeholder="Untitled"
						className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
					/>
				</div>

				<Editor />
			</div>
		</div>
	);
}
