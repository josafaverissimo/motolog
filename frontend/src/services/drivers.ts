import { api } from "@/lib/api";

interface DriverDataInterface {
	name: string;
	cpf: string;
	birthdate: string;
	email: string;
	address: string;
	cnh: File;
	crlv: File;
	phone?: string;
	status?: boolean;
}

export const useDriversService = () => {
	async function addDriver(driverData: DriverDataInterface) {
		const formdata = new FormData();

		for (const entry of Object.entries(driverData)) {
			const [key, value] = entry;

			if (typeof value === "undefined") {
				continue;
			}

			formdata.append(key, value);
		}

		const headers = { "Content-Type": "multipart/formdata" };

		return await api.post("/driver", formdata, { headers });
	}

	return { addDriver };
};
