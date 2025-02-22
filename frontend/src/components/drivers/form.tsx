"use client";

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
import { Switch } from "@/components/ui/switch"

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

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col flex-wrap"
			>
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
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
							<FormItem>
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
							<FormItem>
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

				<div className="flex gap-4">
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
							<FormItem  className="flex-auto">
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

				<div className="flex gap-4">
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

				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="cnh"
						render={({ field }) => (
							<FormItem className="flex-auto">
								<FormLabel>CNH</FormLabel>

								<FormControl>
									<Input {...field} type="file" />
								</FormControl>

								<FormDescription>Informe onde você mora</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="crlv"
						render={({ field }) => (
							<FormItem className="flex-auto">
								<FormLabel>CRLV</FormLabel>

								<FormControl>
									<Input {...field} type="file" />
								</FormControl>

								<FormDescription>Informe onde você mora</FormDescription>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
