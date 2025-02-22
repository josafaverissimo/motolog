import { Phone, Mail } from "lucide-react";

const manager = {
	name: "Gestor",
	cellphone: "(82) 9 8185-2058",
	email: "josafaverissimo98@gmail.com",
	photo: "https://thispersondoesnotexist.com/",
};

const managers = Array(4).fill(manager);

export default function Page() {
	return (
		<>
			<h1 className="text-3xl">Contato</h1>
			<div className="flex justify-center mt-[5%]">
				<div className="max-w-full xl:max-w-[70%] flex flex-col gap-8 xl:flex-row items-center justify-center">
					<div className="flex-1">
						<p className="text-brand-secondary-500 dark:text-brand-secondary-dark-500">
							Transfome desafios em oportunidades!
						</p>
						<p className="text-2xl font-bold text-brand-secondary-500 dark:text-brand-secondary-dark-500">
							Fale conosco e encontre as soluções ideais para sua empresa
						</p>
						<p>
							Nossos gestores de relacionamento estão prontos para oferecer o
							suporte e as informações que você precisa. Entre em contato agora
							para descobrir como podemos ajudá-lo a alcançar segurança e
							eficiência máximas em suas operações.
						</p>
					</div>
					<div className="flex flex-col flex-1 gap-4 justify-center items-center">
						<div className="flex items-center gap-4">
							<img
								className="max-w-32 rounded-full"
								src="https://avatars.githubusercontent.com/u/50150682?v=4"
								alt="Josafá Veríssimo"
							/>

							<div>
								<p>Desenvolvedor</p>
								<span className="flex gap-2">
									<Phone className="!w-4 !h-4" />
									<p>{manager.cellphone}</p>
								</span>
								<span className="flex gap-2">
									<Mail className="!w-4 !h-4" />
									<p>{manager.email}</p>
								</span>
							</div>
						</div>

						<ul className="flex justify-center flex-wrap gap-4">
							{managers.map((manager, index) => (
								<li
									key={manager.name + index}
									className="text-xs flex items-center gap-2"
								>
									<img
										className="max-w-10 rounded-full"
										src={manager.photo}
										alt={manager.name}
									/>
									<div>
										<p>{manager.name}</p>
										<span className="flex gap-2">
											<Phone className="!w-4 !h-4" />
											<p>{manager.cellphone}</p>
										</span>
										<span className="flex gap-2">
											<Mail className="!w-4 !h-4" />
											<p>{manager.email}</p>
										</span>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
