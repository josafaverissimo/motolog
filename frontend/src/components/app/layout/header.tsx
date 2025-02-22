"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AppHeader() {
	const [darkMode, setDarkMode] = useState(true);

	function toggleDarkMode() {
		setDarkMode(!darkMode);
		document.documentElement.classList.toggle('dark')
	}

	return (
		<div className="flex w-full items-center justify-between">
			<span className="text-2xl">MotoLog</span>

			<div className="flex">
				<ul className="flex">
					<li>
						<Button variant="link">
							<Link className="text-brand-secondary-500 dark:text-brand-secondary-dark-500" href="#">
								Serviços
							</Link>
						</Button>
					</li>
					<li>
						<Button variant="link">
							<Link className="text-brand-secondary-500 dark:text-brand-secondary-dark-500" href="#">
								Suporte
							</Link>
						</Button>
					</li>
					<li>
						<Button variant="link">
							<Link className="text-brand-secondary-500 dark:text-brand-secondary-dark-500" href="#">
								Contato
							</Link>
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
