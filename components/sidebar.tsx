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

// Menu items.

export function AppSidebar() {
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

			<SidebarContent>
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
									<User2 /> Username
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="flex w-56 flex-col gap-2 rounded-md bg-stone-800 outline-none"
							>
								<DropdownMenuItem className="rounded-sm p-2 outline-none hover:bg-stone-900 hover:outline-none">
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="rounded-sm p-2 outline-none hover:bg-stone-900 hover:outline-none">
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="rounded-sm p-2 outline-none hover:bg-stone-900 hover:outline-none">
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
