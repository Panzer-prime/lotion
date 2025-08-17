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
			<div className="flex w-screen h-screen items-center justify-center">
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
					<SidebarTrigger />
					{children}
				</div>
			</SidebarProvider>
		</main>
	);
}
