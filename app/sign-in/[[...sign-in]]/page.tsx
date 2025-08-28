"use client";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
	const { isSignedIn } = useAuth();
	const router = useRouter();

	// If already signed in, redirect to documents
	useEffect(() => {
		if (isSignedIn) {
			router.push("/documents");
		}
	}, [isSignedIn, router]);

	// Don't render sign-in if already authenticated
	if (isSignedIn) {
		return (
			<div className="flex h-screen w-screen items-center justify-center">
				<div>Redirecting...</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<SignIn />
		</div>
	);
}
