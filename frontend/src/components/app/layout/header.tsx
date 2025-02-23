"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AppHeader() {
	const [darkMode, setDarkMode] = useState(true);

	useEffect(() => {
		setDarkMode(localStorage.getItem("theme") === "dark");
	}, []);

	function toggleDarkMode() {
		const theme = darkMode ? "light" : "dark";
		localStorage.setItem("theme", theme);

		setDarkMode(!darkMode);
		document.documentElement.classList.toggle("dark");
	}

	return (
		<div className="flex w-full items-center justify-between">
			<span className="text-2xl text-brand-400 dark:text-brand-dark-400">
				MotoLog
			</span>

			<div className="flex">
				<ul className="flex">
					<li>
						<Button
							variant="link"
							className="text-brand-secondary-500 dark:text-brand-secondary-dark-500"
						>
							<Link href="https://github.com/josafaverissimo" target="_blank">
								Quem Somos?
							</Link>
						</Button>
					</li>
					<li>
						<Button
							variant="link"
							className="text-brand-secondary-500 dark:text-brand-secondary-dark-500"
						>
							<Link href="/contact">Contato</Link>
						</Button>
					</li>
				</ul>

				<Button variant="ghost" onClick={toggleDarkMode}>
					{darkMode ? <Sun /> : <Moon />}
				</Button>
			</div>
		</div>
	);
}
