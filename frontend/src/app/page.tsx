import Link from "next/link";
import { Button } from "@/components/ui/button";

const mainImgUrl =
	"https://www.vertticegr.com.br/wp-content/uploads/2024/05/Grupo-489.png";
const secondaryImgUrl =
	"https://www.vertticegr.com.br/wp-content/uploads/2024/05/Elipse-3.svg";

export default function Home() {
	return (
		<>
			<h1 className="text-3xl">Home</h1>
			<div className="relative w-full max-h-full flex justify-center mt-[5%]">
				<div className="relative flex gap-4 max-w-[95%] 2xl:max-w-[70%] max-h-full">
					<div className="flex flex-col gap-4 flex-1 z-20">
						<p className="text-lg text-brand-secondary-500 dark:text-brand-secondary-dark-500">
							Tecnologia e experiência
						</p>
						<p className="text-5xl font-bold text-brand-secondary-500 dark:text-brand-secondary-dark-500">
							Aliadas para sua tranquilidade
						</p>
						<p className="text-sm">
							Temos um conjunto personalizado de soluções em Gestão de Riscos
							para ajuda-lo a conquistar mais segurança em todas as etapas de
							sua operação, desde as contratações de motoristas até a
							confirmação das entregas de suas cargas
						</p>

						<Button
							className="
						bg-brand-ternary-300 dark:bg-brand-ternary-dark-300
						text-brand-ternary-600 dark:text-brand-ternary-dark-600
						font-bold text-lg
						hover:bg-brand-300 dark:hover:bg-brand-dark-300
						hover:text-brand-600 dark:hover:text-brand-dark-600
					"
						>
							<Link href="/drivers">Cadastrar Motorista</Link>
						</Button>
					</div>

					<div className="hidden md:block z-20 flex-3">
						<img src={mainImgUrl} alt="Imagem principal" />
					</div>

					<div
						className="
					hidden lg:block absolute right-[-20rem] bottom-[-15rem] z-10
				"
					>
						<img src={secondaryImgUrl} alt="Imagem secundária" />
					</div>
				</div>
			</div>
		</>
	);
}
