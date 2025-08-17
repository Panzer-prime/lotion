import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<SignIn afterSignOutUrl="/documents" forceRedirectUrl="/documents" />;
		</div>
	);
}
