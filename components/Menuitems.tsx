"use client";
import { useQuery } from "convex/react";
import {
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from "./ui/sidebar";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

import { Collapsible } from "@radix-ui/react-collapsible";
import { Ellipsis } from "lucide-react";

export const MenuItems = ({
	parentId,
	level = 0,
}: {
	parentId?: Id<"documents">;
	level?: number;
}) => {
	const [expand, setExpand] = useState<Record<string, boolean>>({});

	const documents = useQuery(api.documents.getSidebar, {
		parentId: parentId,
	});
	const onExpand = (documentId: string) => {
		setExpand((prevExpanded) => ({
			...prevExpanded,
			[documentId]: !prevExpanded[documentId],
		}));
	};

	if (documents == undefined) return <div></div>;

	return (
		<SidebarGroupContent>
			<Collapsible defaultOpen className="group/collapsible">
				<SidebarMenu>
					{documents?.map((item) => (
						<SidebarMenuItem key={item._id}>
							<SidebarMenuButton
								onClick={() => onExpand(item._id)}
								className="flex flex-row justify-between font-medium"
							>
								<a href={`/documents/${item._id}`}>{item.title}</a>
							</SidebarMenuButton>

							<SidebarMenuAction
								className="h-5 w-11 rounded-sm"
								onClick={() => {
									console.log("something we are trying");
								}}
							>
								<Ellipsis />
							</SidebarMenuAction>

							{expand[item._id] && (
								<SidebarMenuSub>
									<MenuItems parentId={item._id} level={level + 1} />
								</SidebarMenuSub>
							)}
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</Collapsible>
		</SidebarGroupContent>
	);
};
