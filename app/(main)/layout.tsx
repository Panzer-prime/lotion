"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	const { isSignedIn, isLoaded: clerkLoaded } = useAuth();
	const { isAuthenticated, isLoading: convexLoading } = useConvexAuth();
	const router = useRouter();

	// Redirect to sign-in if not authenticated
	useEffect(() => {
		if (clerkLoaded && convexLoading === false && (!isSignedIn || !isAuthenticated)) {
			router.push("/sign-in");
		}
	}, [isSignedIn, isAuthenticated, clerkLoaded, convexLoading, router]);

	// Show loading while authentication is being determined
	if (!clerkLoaded || convexLoading) {
		return (
			<div className="flex h-screen w-screen items-center justify-center">
				<Spinner size="md" />
			</div>
		);
	}

	// Don't render anything while redirecting
	if (!isSignedIn || !isAuthenticated) {
		return (
			<div className="flex h-screen w-screen items-center justify-center">
				<Spinner size="md" />
			</div>
		);
	}

	return (
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
	);
}
