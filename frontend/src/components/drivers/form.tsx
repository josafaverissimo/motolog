"use client";

import { useState, useRef, ChangeEvent } from "react";

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
import { Switch } from "@/components/ui/switch";
import { ImagePreview } from "@/components/common/imagePreview";

const formSchema = z.object({
	name: z.string().min(2).max(50),
	cpf: z.string().min(2).max(50),
	birthdate: z.string().min(2).max(50),
	phone: z.string().min(2).max(50),
	email: z.string().min(2).max(50),
	address: z.string().min(2).max(50),
	status: z.string().min(2).max(50),
	cnh: z.string().min(2).max(50),
	crlv: z.string().min(2).max(50),
});

export function DriversForm() {
	const cnhRef = useRef<HTMLInputElement | null>(null)
	const crlvRef = useRef<HTMLInputElement | null>(null)
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
			status: "",
			cnh: "",
			crlv: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	function handlerImageInput(
		event: ChangeEvent<HTMLInputElement>,
		setter: React.Dispatch<React.SetStateAction<File | null>>,
	) {
		const input = event.target;

		if (!input.files) {
			return;
		}

		setter(input.files[0]);
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
									<Input {...field} />
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
									<Input {...field} />
								</FormControl>

								<FormDescription>Informe seu cpf</FormDescription>

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
									<Input {...field} />
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

				<div>
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem className="basis-[5%] flex flex-col">
								<FormLabel>Status</FormLabel>

								<FormControl>
									<Switch {...field} />
								</FormControl>

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
							<FormItem className="basis-[50%] flex-grow-0 flex-shrink-0 min-w-0">
								<FormLabel>CNH</FormLabel>

								<FormControl>
									<div className="cursor-pointer" onClick={() => cnhRef.current!.click()}>
										<Input
											{...field}
											ref={cnhRef}
											type="file"
											accept="image/*"
											onChange={(e) => handlerImageInput(e, setCnh)}
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
							<FormItem className="basis-[50%] flex-grow-0 flex-shrink-0 min-w-0">
								<FormLabel>CRLV</FormLabel>

								<FormControl>
									<div className="cursor-pointer" onClick={() => crlvRef.current!.click()}>
										<Input
											{...field}
											ref={crlvRef}
											type="file"
											accept="image/*"
											onChange={(e) => handlerImageInput(e, setCrlv)}
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

				<Button
					type="submit"
					className="
						bg-brand-300 dark:bg-brand-dark-300
						text-brand-600 dark:text-brand-dark-600
						hover:bg-brand-400 dark:hover:bg-brand-dark-200
						mt-4
					"
				>
					Enviar
				</Button>
			</form>
		</Form>
	);
}
