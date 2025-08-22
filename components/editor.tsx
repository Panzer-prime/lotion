"use client";

import React, { useState, useEffect } from "react";
import {
	FormattingToolbar,
	FormattingToolbarController,
	getFormattingToolbarItems,
	getDefaultReactSlashMenuItems,
	SuggestionMenuController,
	useCreateBlockNote,
} from "@blocknote/react";
// Or, you can use ariakit, shadcn, etc.
import { BlockNoteView } from "@blocknote/mantine";
// Default styles for the mantine editor
import "@blocknote/mantine/style.css";
// Include the included Inter font
import "@blocknote/core/fonts/inter.css";
import {
	Block,
	BlockNoteEditor,
	filterSuggestionItems,
	PartialBlock,
} from "@blocknote/core";
import { uploadFiles } from "@/utils/uploadthing";
import { en } from "@blocknote/core/locales";
import { en as aiEn } from "@blocknote/xl-ai/locales";
import {
	AIMenuController,
	AIToolbarButton,
	createAIExtension,
	getAISlashMenuItems,
} from "@blocknote/xl-ai";
import "@blocknote/xl-ai/style.css";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

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
	console.log(
		process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY as string,
		"write somethign for fuck sake",
	);
	const model = createGoogleGenerativeAI({
		apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY as string,
	})("gemini-2.5-flash");

	// Creates a new editor instance.
	const editor = useCreateBlockNote({
		initialContent: initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: undefined,
		uploadFile: async (file: File) => {
			const [res] = await uploadFiles("imageUploader", { files: [file] });
			return res.ufsUrl;
		},
		dictionary: {
			...en,
			ai: aiEn, // add default translations for the AI extension
		},
		extensions: [createAIExtension({ model })],
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
		>
			<AIMenuController />
			{/* Create you own Formatting Toolbar with an AI button,
    (see the full example code below) */}
			<FormattingToolbarWithAI />
			{/* Create you own SlashMenu with an AI option,
    (see the full example code below) */}
			<SuggestionMenuWithAI editor={editor} />
		</BlockNoteView>
	);
}

function FormattingToolbarWithAI() {
	return (
		<FormattingToolbarController
			formattingToolbar={() => (
				<FormattingToolbar>
					{...getFormattingToolbarItems()}
					{/* Add the AI button */}
					<AIToolbarButton />
				</FormattingToolbar>
			)}
		/>
	);
}
// Slash menu with the AI option added
function SuggestionMenuWithAI(props: {
	editor: BlockNoteEditor<any, any, any>;
}) {
	return (
		<SuggestionMenuController
			triggerCharacter="/"
			getItems={async (query) =>
				filterSuggestionItems(
					[
						...getDefaultReactSlashMenuItems(props.editor),
						// add the default AI slash menu items, or define your own
						...getAISlashMenuItems(props.editor),
					],
					query,
				)
			}
		/>
	);
}
