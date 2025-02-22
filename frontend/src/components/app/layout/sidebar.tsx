'use client'

import Link from "next/link";
import { BusFront, Home, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
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

export function AppSidebar() {
	const pathname = usePathname();

	const items = [
		{
			url: "/",
			icon: Home,
			active: false
		},
		{
			url: "/drivers",
			icon: BusFront,
			active: false
		},
		{
			url: "/contact",
			icon: Phone,
			active: false
		}
	];

	for(const item of items) {
		if(item.url === pathname) {
			item.active = true
		}
	}

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<p>MotoLog</p>
					</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.url}>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className={`flex justify-center ${item.active ? 'bg-brand-300 dark:bg-brand-dark-300' : ''}`}
										>
											<item.icon className="!w-6 !h-6" />
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
