import {
	Calendar,
	ChevronUp,
	CircleUserIcon,
	Home,
	Inbox,
	Search,
	Settings,
	User2,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MenuItems } from "./Menuitems";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
// Menu items.

export function AppSidebar() {
	const { user } = useUser();
	return (
		<Sidebar className="text-[#8A8A8A]">
			<SidebarHeader>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem className="transition-all delay-100 ease-in-out">
								<DropdownMenu>
									<DropdownMenuTrigger asChild className="">
										<SidebarMenuButton>
											<p className="flex flex-row items-center gap-2">
												<User2 /> <span>{user?.fullName}</span>
											</p>
											<ChevronUp className="ml-auto" />
										</SidebarMenuButton>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										side="bottom"
										className="z-50 ml-11 w-64 bg-stone-800"
									>
										<DropdownMenuItem className="rounded-sm p-2">
											<SignOutButton redirectUrl="/">Log out</SignOutButton>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<a href="/documents">
										<Home /> Home
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarHeader>

			<SidebarContent className="overflow-visible">
				<SidebarGroup>
					<SidebarGroupLabel>Your Notes</SidebarGroupLabel>
					<MenuItems />
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="">
				<SidebarMenu></SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
