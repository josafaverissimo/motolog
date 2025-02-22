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
		<html lang="pt-BR">
			<body>
				<SidebarProvider>
					<div className="flex w-screen">
						<AppSidebar />

						<div className="flex-auto">
							<nav className="
							  flex items-center px-4 py-2
							">
							  <SidebarTrigger />

								<AppHeader />
							</nav>

							<main>
								{children}
							</main>
						</div>
					</div>
				</SidebarProvider>
			</body>
		</html>
	);
}
