"use client";

import React, { useState, useEffect } from "react";
import { useCreateBlockNote } from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";
import { Block, PartialBlock } from "@blocknote/core";
import { uploadFiles } from "@/utils/uploadthing";

interface EditorProps {
	initialContent?: string;
	onChange: ({
		content,
		title,
	}: {
		content: undefined | string;
		title: string | undefined;
	}) => void;
}
export default function MyEditor({ initialContent, onChange }: EditorProps) {
	const [blocks, setBlocks] = useState<Block[]>([]);

	// Creates a new editor instance.
	const editor = useCreateBlockNote({
		initialContent: initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: undefined,
		uploadFile: async (file: File) => {
			const [res] = await uploadFiles("imageUploader", { files: [file] });
			return res.ufsUrl;
		},
	});
	const handleOnChange = () => {
		onChange({ content: JSON.stringify(editor.document), title: undefined });
	};
	return (
		<BlockNoteView
			editor={editor}
			onChange={handleOnChange}
			theme={{
				colors: {
					editor: {
						background: "#0a0a0a",
					},
				},
			}}
		/>
	);
}
