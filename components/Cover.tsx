import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { ClientUploadedFileData } from "uploadthing/types";

export default function Cover({
	href,
	uploadImage,
}: {
	href: string;
	uploadImage: (
		res: ClientUploadedFileData<{
			uploadedBy: string;
		}>[],
	) => void;
}) {
	return (
		<div className="relative flex h-[35vh] w-full justify-end bg-gray-500">
			<Image
				src={href}
				alt="cover"
				sizes="100vw"
				fill
				className="object-cover"
			/>

			<div className="absolute w-3xl pt-3">
				<UploadButton
					endpoint="imageUploader"
					className="ut-button:bg-[#252424] ut-button:hover:bg-[#2f2e2e] ut-allowed-content:text-slate-400 ut-button:h-6 ut-button:w-28 ut-button:rounded-sm flex w-fit items-center justify-center rounded-sm p-2 text-xs font-semibold text-[#898983] outline-none  ut-button:outline-none ut-button:active:outline-none"
					content={{ button: "Change Cover" }}
					onClientUploadComplete={(res) => uploadImage(res)}
				/>
			</div>
		</div>
	);
}
