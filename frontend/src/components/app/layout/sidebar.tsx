"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BusFront, Home, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
	const pathname = usePathname();

	const items = [
		{
			url: "/",
			icon: Home,
			active: false,
			name: "Home",
		},
		{
			url: "/drivers",
			icon: BusFront,
			active: false,
			name: "Motoristas",
		},
		{
			url: "/contact",
			icon: Phone,
			active: false,
			name: "Contato",
		},
	];

	for (const item of items) {
		if (item.url === pathname) {
			item.active = true;
		}
	}

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup className="h-full">
					<SidebarGroupContent className="h-full">
						<SidebarMenu className="flex flex-col justify-center items-center h-full gap-12">
							{items.map((item) => (
								<SidebarMenuItem
									key={item.url}
									className="flex flex-col items-center"
								>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className={`flex justify-center ${item.active ? "bg-brand-300 dark:bg-brand-dark-300" : ""}`}
										>
											<item.icon className="!w-6 !h-6" />
										</Link>
									</SidebarMenuButton>
									<span className="text-xs">{item.name}</span>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
