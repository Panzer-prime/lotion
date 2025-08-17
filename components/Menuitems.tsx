"use client";
import { useMutation, useQuery } from "convex/react";
import {
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
} from "./ui/sidebar";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

import { Collapsible } from "@radix-ui/react-collapsible";
import { Ellipsis, HomeIcon, Plus, Trash2 } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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

	const deleteDocumet = useMutation(api.documents.deleteDocumet);
	const create = useMutation(api.documents.create);
	const onExpand = (documentId: string) => {
		setExpand((prevExpanded) => ({
			...prevExpanded,
			[documentId]: !prevExpanded[documentId],
		}));
	};

	if (documents == undefined) return <div></div>;
	const deleteNote = async ({ id }: { id: Id<"documents"> }) => {
		await deleteDocumet({ id: id });
	};

	const createSubNote = async ({ id }: { id: Id<"documents"> }) => {
		await create({ parentDocument: id, title: "Untitled" });
	};

	return (
		<SidebarGroupContent className="">
			<Collapsible defaultOpen className="group/collapsible">
				<SidebarMenu>
					{documents?.map((item) => (
						<SidebarMenuItem key={item._id}>
							<SidebarMenuButton
								onClick={() => onExpand(item._id)}
								className="flex flex-row justify-between font-medium"
							>
								<a
									href={`/documents/${item._id}`}
									className="line-clamp-1 flex max-w-[86%] flex-row items-center gap-2 truncate"
								>
									<span className="">
										<HomeIcon size={16} />
									</span>
									{item.title}
								</a>
							</SidebarMenuButton>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuAction
										className="h-5 w-11 rounded-sm"
										onClick={() => {
											console.log("something we are trying");
										}}
									>
										<Ellipsis />
									</SidebarMenuAction>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									side="right"
									align="start"
									className="flex w-48 flex-col gap-2 rounded-md bg-stone-800"
								>
									<DropdownMenuItem className="rounded-sm p-2 outline-none hover:bg-stone-900 hover:outline-none">
										<button
											onClick={() => createSubNote({ id: item._id })}
											className="flex flex-row items-center gap-3"
										>
											<Plus />
											<span>Create subNote</span>
										</button>
									</DropdownMenuItem>
									<DropdownMenuItem className="rounded-sm p-2 outline-none hover:bg-stone-900 hover:outline-none">
										<button
											onClick={() => deleteNote({ id: item._id })}
											className="flex flex-row items-center gap-3"
										>
											<Trash2 size={16} />
											<span>Delete</span>
										</button>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							{/* <div className="absolute -right-31 w-full bg-red-500">1</div> */}

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
