export default function Title({ onChange }: { onChange: () => void }) {
	return (
		<div className="w-full">
			<textarea
				placeholder="Untitled"
				className="flex h-28 w-full resize-none items-center justify-center border-none p-2 pt-10 text-4xl outline-none"
				onChange={onChange}
			></textarea>
		</div>
	);
}
