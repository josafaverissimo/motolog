"use client";

import { useState, useEffect } from "react";
import { Driver } from '@/services/drivers'
import { DriversForm } from "@/components/drivers/form";
import type { DriverToEdit } from '@/components/drivers/form'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { DriversTable } from "@/components/drivers/table";

export default function Drivers() {
	const [driverDataToEdit, setDriverDataToEdit] = useState<DriverToEdit>()
	const [isFormOpen, setIsFormOpen] = useState(false);

	useEffect(() => {
		setIsFormOpen(localStorage.getItem("isFormOpen") === "true");
	}, []);

	function toggleForm() {
		setIsFormOpen(!isFormOpen);

		localStorage.setItem("isFormOpen", String(!isFormOpen));
	}

	function handlerEditDriver(driver: Driver) {
		const driverData: DriverToEdit = {
			hash: driver.hash,
			name: driver.name,
			cpf: driver.cpf,
			birthdate: driver.birthdate,
			phone: driver.phone,
			email: driver.email,
			address: driver.address,
			status: driver.status,
			cnh: driver.cnhImageUrl,
			crlv: driver.crlvImageUrl
		}

		setDriverDataToEdit(driverData)
	}

	function handlerDeleteDriver(driver: Driver) {
		console.log('deleting')
		console.log(driver)
	}

	return (
		<>
			<h1 className="text-3xl">Motoristas</h1>

			<div className="w-full flex flex-col gap-4">
				<div className="flex justify-center">
					<Collapsible
						open={isFormOpen}
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
								<DriversForm driverToEdit={driverDataToEdit} setDriverToEdit={setDriverDataToEdit}/>
							</div>
						</CollapsibleContent>
					</Collapsible>
				</div>

				<hr className="w-full" />

				<div className="w-full flex justify-center">
					<div className="max-w-[90%]">
						<DriversTable onEditRow={handlerEditDriver} onDeleteRow={handlerDeleteDriver} />
					</div>
				</div>
			</div>
		</>
	);
}
