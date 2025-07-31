import Image from "next/image";

export default function Cover({ href }: { href: string }) {
	return (
		<div className="relative h-[35vh] w-full bg-gray-500">
			<Image
				src={href}
				alt="cover"
				sizes="100vw"
				fill
				className="object-fill"
			/>
		</div>
	);
}
