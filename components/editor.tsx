"use client";

import React, { useState, useEffect } from "react";
import { useCreateBlockNote } from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";
import { Block } from "@blocknote/core";
import { uploadFiles } from "@/utils/uploadthing";

export default function MyEditor() {
	const [blocks, setBlocks] = useState<Block[]>([]);

	// Creates a new editor instance.
	const editor = useCreateBlockNote({
		uploadFile: async (file: File) => {
			const [res] = await uploadFiles("imageUploader", { files: [file] });
			return res.ufsUrl;
		},
		initialContent: [
			{
				type: "paragraph",
				content: "Welcome to this demo!",
			},
			{
				type: "heading",
				content: "This is a heading block",
			},
			{
				type: "paragraph",
				content: "This is a paragraph block",
			},
			{
				type: "paragraph",
			},
		],
	});
	console.log(JSON.stringify(blocks, null, 2));
	// Renders the editor instance and its document JSON.
	return (
		<BlockNoteView
			editor={editor}
			autoFocus
			onChange={() => {
				setBlocks(editor.document);
			}}
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
