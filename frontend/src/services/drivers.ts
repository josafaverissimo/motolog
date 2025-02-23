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

export interface Driver {
  createdAt: string;
  updatedAt: string;
  name: string;
  cpf: string;
  hash: string;
  birthdate: string;
  phone: string;
  email: string;
  address: string;
  status: boolean;
  cnhImageUrl: string;
  crlvImageUrl: string;
}

interface DriversResponse {
  drivers: Driver[];
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

	async function getDrivers(page: number) {
		const querystring = new URLSearchParams({ page: String(page) })

		const { data } = await api.get<DriversResponse>(`/driver?${querystring}`)

		return data
	}

	return { getDrivers, addDriver };
};
