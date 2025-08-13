import {
	Calendar,
	CircleUserIcon,
	Home,
	Inbox,
	Search,
	Settings,
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

// Menu items.

export function AppSidebar() {
	return (
		<Sidebar className="bg-black">
			<SidebarHeader>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<CircleUserIcon /> <p>UserName</p>
								</SidebarMenuButton>
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

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Favorites</SidebarGroupLabel>
					<MenuItems></MenuItems>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="">
				<SidebarMenu>
					<SidebarMenuItem>
						<button>gay</button>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
