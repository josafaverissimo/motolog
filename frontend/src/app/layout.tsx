import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app/layout/sidebar";
import { AppHeader } from "@/components/app/layout/header";

import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" className="dark">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body>
				<SidebarProvider>
					<div className="flex w-screen">
						<AppSidebar />

						<div className="flex flex-col flex-auto">
							<nav className="
								basis-[2rem] flex items-center px-4 py-2
								shadow dark:shadow-zinc-700 bg-gray-50 dark:bg-zinc-900 mx-4 my-2
							">
							  <SidebarTrigger />

								<AppHeader />
							</nav>

							<main className="flex-auto">
								{children}
							</main>
						</div>
					</div>
				</SidebarProvider>
			</body>
		</html>
	);
}
