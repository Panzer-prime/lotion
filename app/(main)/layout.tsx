"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Authenticated, Unauthenticated } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

function UnauthenticatedRedirect() {
	const router = useRouter();
	const { isSignedIn, isLoaded } = useAuth();

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.push('/sign-in');
		}
	}, [isLoaded, isSignedIn, router]);

	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<div className="text-lg">Redirecting to sign in...</div>
		</div>
	);
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Authenticated>
				<main>
					<SidebarProvider className="dark text-defaultText">
						<AppSidebar />

						<div className="w-full">
							<div className="w-full bg-stone-900"></div>
							<SidebarTrigger />
							{children}
						</div>
					</SidebarProvider>
				</main>
			</Authenticated>
			<Unauthenticated>
				<UnauthenticatedRedirect />
			</Unauthenticated>
		</>
	);
}
