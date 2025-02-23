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
	const [isFormOpen, setIsFormOpen] = useState(true);

	function toggleForm() {
		setIsFormOpen(!isFormOpen);
	}

	return (
		<>
			<h1 className="text-3xl">Motoristas</h1>

			<div className="w-full">
				<div className="flex flex-col items-center">
					<Collapsible
						defaultOpen={isFormOpen}
						className="
							flex flex-col w-full lg:max-w-[60%] lg:w-[60%] 2xl:max-w-[50%] 2xl:w-[50%]
						"
					>
						<CollapsibleTrigger onClick={toggleForm}>
							<div className="flex items-center justify-center space-x-4 px-4">
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
