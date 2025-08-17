"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div className="w-screen items-center justify-center">
			<Button variant="secondary">
				<a href="/documents">Go to Documents</a>
			</Button>
		</div>
	);
}
