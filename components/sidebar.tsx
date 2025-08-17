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
		<Sidebar className="bg-black">
			<SidebarHeader>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
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
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<p className="flex flex-row items-center gap-2">
										<User2 /> <span>{user?.fullName}</span>
									</p>
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="flex w-56 flex-col gap-2 rounded-md bg-stone-800 outline-none"
							>
								<DropdownMenuItem
									className="rounded-sm p-2 outline-none hover:bg-stone-900 hover:outline-none"
									asChild
								>
									<SignOutButton redirectUrl="/">Log out</SignOutButton>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
