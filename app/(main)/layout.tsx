"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/Spinner";

export default function Layout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, isLoading } = useConvexAuth();

	if (isLoading) {
		return (
			<div className="flex h-screen w-screen items-center justify-center">
				<Spinner size="md" />
			</div>
		);
	}
	if (!isAuthenticated) {
		return redirect("/sign-in");
	}
	return (
		<main>
			<SidebarProvider className="dark">
				<AppSidebar />

				<div className="w-full">
					<div className="w-full bg-stone-900">1</div>
					<SidebarTrigger />
					{children}
				</div>
			</SidebarProvider>
		</main>
	);
}
