"use client";

import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IMaskInput } from "@/components/common/imaskInput";
import { Switch } from "@/components/ui/switch";
import { ImagePreview } from "@/components/common/imagePreview";
import { DatePicker } from "@/components/ui/datepicker";
import { validateCpf } from "@/lib/utils";

const minimumAge = new Date();
minimumAge.setFullYear(minimumAge.getFullYear() - 18);

const MIN_3_CHARACTERS = "O campo deve ter no mínimo 3 caracteres";
const MAX_500_CHARACTERS = "O campo deve ter no máximo 500 caracteres";
const LENGTH_14_CHARACTERS = "O campo deve ter 14 caracteres";
const LENGTH_16_CHARACTERS = "O campo deve ter 16 caracteres";

const IMAGE_VALIDATION = z
	.instanceof(File, { message: "O campo é obrigatório" })
	.refine(
		(file) => file.type.split("/")[0] === "image",
		"O arquivo deve ser uma imagem",
	);

const formSchema = z.object({
	name: z.string().min(3, MIN_3_CHARACTERS).max(500, MAX_500_CHARACTERS),
	cpf: z.string().length(14, LENGTH_14_CHARACTERS).refine(validateCpf, 'O cpf não é válido'),
	birthdate: z
		.string()
		.refine(
			(date) => new Date(date) < minimumAge,
			"Deve-se ter no mínimo 18 anos",
		),
	phone: z.string().length(16, LENGTH_16_CHARACTERS),
	email: z
		.string()
		.email("Email inválido")
		.min(3, MIN_3_CHARACTERS)
		.max(500, MAX_500_CHARACTERS),
	address: z
		.string()
		.min(10, "O campo deve ter no mínimo 10 caracteres")
		.max(500, "O campo deve ter no máximo 500 caracteres"),
	status: z.boolean().default(false).optional(),
	cnh: IMAGE_VALIDATION,
	crlv: IMAGE_VALIDATION,
});

export function DriversForm() {
	const cnhRef = useRef<HTMLInputElement | null>(null);
	const crlvRef = useRef<HTMLInputElement | null>(null);
	const [cnh, setCnh] = useState<File | null>(null);
	const [crlv, setCrlv] = useState<File | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			cpf: "",
			birthdate: "",
			phone: "",
			email: "",
			address: "",
			status: false,
			cnh: undefined,
			crlv: undefined,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	function handlerImageInput(
		event: ChangeEvent<HTMLInputElement>,
		field: ControllerRenderProps<any, string>,
		setter: React.Dispatch<React.SetStateAction<File | null>>,
	) {
		const input = event.target;

		if (!input.files) {
			return;
		}

		setter(input.files[0]);
		field.onChange(input.files[0]);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col flex-wrap w-full gap-2"
			>
				<div className="flex flex-col md:flex-row gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="flex-auto">
								<FormLabel>Nome</FormLabel>

								<FormControl>
									<Input {...field} />
								</FormControl>

								<FormDescription>Informe seu nome</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="cpf"
						render={({ field }) => (
							<FormItem className="flex-auto">
								<FormLabel>CPF</FormLabel>

								<FormControl>
									<IMaskInput {...field} mask="000.000.000-00" />
								</FormControl>

								<FormDescription>Informe seu cpf</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="birthdate"
						render={({ field }) => (
							<FormItem className="flex-auto">
								<FormLabel>Data de nascimento</FormLabel>

								<FormControl>
									<div>
										<DatePicker
											onSelectAction={(date) => {
												field.onChange(date?.toISOString().split("T")[0]);
											}}
										/>
									</div>
								</FormControl>

								<FormDescription>
									Informe sua data de nascimento
								</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-4">
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="flex-auto">
								<FormLabel>Celular</FormLabel>

								<FormControl>
									<IMaskInput {...field} mask="(00) 9 0000-0000" />
								</FormControl>

								<FormDescription>
									Informe seu número de telefone
								</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="flex-auto">
								<FormLabel>Email</FormLabel>

								<FormControl>
									<Input {...field} />
								</FormControl>

								<FormDescription>Informe seu melhor email</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem className="flex-auto">
								<FormLabel>Endereço</FormLabel>

								<FormControl>
									<Input {...field} />
								</FormControl>

								<FormDescription>Informe onde você mora</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col md:flex-row gap-4">
					<FormField
						control={form.control}
						name="cnh"
						render={({ field }) => (
							<FormItem className="basis-[50%]">
								<FormLabel>CNH</FormLabel>

								<FormControl>
									<div
										className="cursor-pointer"
										onClick={() => cnhRef.current?.click()}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												crlvRef.current?.click();
											}
										}}
									>
										<Input
											ref={cnhRef}
											type="file"
											accept="image/*"
											onChange={(e) => handlerImageInput(e, field, setCnh)}
											className="hidden"
										/>
										<ImagePreview image={cnh} />
									</div>
								</FormControl>

								<FormDescription>Envie a foto da CNH</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="crlv"
						render={({ field }) => (
							<FormItem className="basis-[50%]">
								<FormLabel>CRLV</FormLabel>

								<FormControl>
									<div
										className="cursor-pointer"
										onClick={() => crlvRef.current?.click()}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												crlvRef.current?.click();
											}
										}}
									>
										<Input
											ref={crlvRef}
											type="file"
											accept="image/*"
											onChange={(e) => handlerImageInput(e, field, setCrlv)}
											className="hidden"
										/>

										<ImagePreview image={crlv} />
									</div>
								</FormControl>

								<FormDescription>Envie a foto do CRLV</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div>
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem className="basis-[5%] flex flex-col">
								<FormLabel>Ativo</FormLabel>

								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button
					type="submit"
					className="
						bg-brand-ternary-300 dark:bg-brand-ternary-dark-300
						text-brand-ternary-600 dark:text-brand-ternary-dark-600
						font-bold text-lg
						hover:bg-brand-300 dark:hover:bg-brand-dark-300
						hover:text-brand-600 dark:hover:text-brand-dark-600
					"
				>
					Enviar
				</Button>
			</form>
		</Form>
	);
}
