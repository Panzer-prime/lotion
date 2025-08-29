"use client";

export default function EnvCheck() {
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Environment Variables Check</h1>
			<div className="space-y-2">
				<p><strong>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:</strong> {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not set'}</p>
				<p><strong>NEXT_PUBLIC_CONVEX_URL:</strong> {process.env.NEXT_PUBLIC_CONVEX_URL ? 'Set' : 'Not set'}</p>
				<p><strong>CLERK_JWT_ISSUER_DOMAIN:</strong> {process.env.CLERK_JWT_ISSUER_DOMAIN ? 'Set' : 'Not set'}</p>
			</div>
			<div className="mt-4">
				<a href="/test-auth" className="text-blue-500 hover:underline">Test Authentication</a>
			</div>
		</div>
	);
}
