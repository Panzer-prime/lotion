"use client";
import { useRouter } from "next/navigation";
import { SignUp } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

export default function Page() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<SignUp />
		</div>
	);
}
