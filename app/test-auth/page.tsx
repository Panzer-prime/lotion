"use client";
import { useAuth } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

export default function TestAuth() {
	const { isSignedIn, userId } = useAuth();
	const { isAuthenticated, isLoading } = useConvexAuth();

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
			
			<div className="space-y-4">
				<div>
					<h2 className="text-lg font-semibold">Clerk Auth Status:</h2>
					<p>Is Signed In: {isSignedIn ? "Yes" : "No"}</p>
					<p>User ID: {userId || "None"}</p>
				</div>
				
				<div>
					<h2 className="text-lg font-semibold">Convex Auth Status:</h2>
					<p>Is Loading: {isLoading ? "Yes" : "No"}</p>
					<p>Is Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
				</div>
				
				<div>
					<h2 className="text-lg font-semibold">Actions:</h2>
					<a 
						href="/documents" 
						className="text-blue-500 hover:underline block"
					>
						Try to access /documents
					</a>
					<a 
						href="/sign-in" 
						className="text-blue-500 hover:underline block"
					>
						Go to sign-in
					</a>
				</div>
			</div>
		</div>
	);
}
