import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
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
