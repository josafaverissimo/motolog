"use client";

import { AppHeader } from "@/components/app/layout/header";
import { AppSidebar } from "@/components/app/layout/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		setTheme(localStorage.getItem("theme") || "dark");
	}, []);

	return (
		<html lang="pt-BR" className={theme === "dark" ? "dark" : ""}>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body className="max-w-[100vw]">
				<QueryClientProvider client={queryClient}>
					<SidebarProvider>
						<div className="flex w-screen">
							<AppSidebar />

							<div className="flex flex-col flex-auto min-w-0">
								<nav
									className="
										basis-[2rem] flex items-center px-4 py-2 rounded-xl
										shadow dark:shadow-zinc-700 bg-gray-50 dark:bg-zinc-900 mx-4 my-2
									"
								>
									<SidebarTrigger />

									<AppHeader />
								</nav>

								<main className="flex-auto px-4">{children}</main>
							</div>
						</div>
					</SidebarProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
