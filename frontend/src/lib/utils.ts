import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function validateCpf(cpf: string): boolean {
	cpf = cpf.replace(/[.-]/g, "");
	if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

	const calculateDigit = (part: string) => {
		let sum = 0;
		for (let i = 0; i < part.length; i++) {
			sum += Number.parseInt(part[i]) * (part.length + 1 - i);
		}
		const remainder = (sum * 10) % 11;
		return remainder === 10 ? 0 : remainder;
	};

	const firstDigit = calculateDigit(cpf.slice(0, 9));
	const secondDigit = calculateDigit(cpf.slice(0, 10));

	return (
		firstDigit === Number.parseInt(cpf[9]) &&
		secondDigit === Number.parseInt(cpf[10])
	);
}
