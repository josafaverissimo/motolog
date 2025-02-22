"use client";

import { useState } from "react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import { DriversForm } from "@/components/drivers/form";

export default function Drivers() {
	const [isFormOpen, setIsFormOpen] = useState(false);

	function toggleForm() {
		setIsFormOpen(!isFormOpen);
	}

	return (
		<>
			<h1 className="text-3xl">Motoristas</h1>

			<div className="w-full">
				<div className="flex flex-col items-center">
					<Collapsible className="flex flex-col items-center">
						<CollapsibleTrigger onClick={toggleForm}>
							<div className="flex items-center justify-between space-x-4 px-4">
								{isFormOpen ? (
									<>
										<ChevronsDownUp className="h-4 w-4" />
										<span>Fechar formulário</span>
									</>
								) : (
									<>
										<ChevronsUpDown className="h-4 w-4" />
										<span>Abrir formulário</span>
									</>
								)}
							</div>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<div className="flex justify-center">
								<DriversForm />
							</div>
						</CollapsibleContent>
					</Collapsible>
				</div>
			</div>
		</>
	);
}
