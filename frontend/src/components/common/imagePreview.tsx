import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Image } from "lucide-react";
import { useEffect, useState } from "react";

type ImagePreviewProps = {
	image: File | null;
};

export function ImagePreview({ image }: ImagePreviewProps) {
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string>("");
	const [imageSize, setImageSize] = useState<string>("");

	useEffect(() => {
		if (!image) {
			setImageSrc(null);

			return;
		}

		const sizeKib = Number((image.size / 1024).toFixed(2));
		const sizeMib = Number((sizeKib / 1024).toFixed(2));
		const size = sizeKib > 1024 ? `${sizeMib}MiB` : `${sizeKib}KiB`;

		setImageName(image.name);
		setImageSize(size);

		setImageSrc(URL.createObjectURL(image));
	}, [image]);

	function renderFooter() {
		if (!imageName || !imageSize) {
			return;
		}

		return (
			<CardFooter>
				<p className="text-xs">
					{imageName} | {imageSize}
				</p>
			</CardFooter>
		);
	}

	return (
		<Card>
			<CardContent className="flex justify-center items-center p-0 max-h-[10rem] h-[10rem]">
				{imageSrc ? (
					<img
						src={imageSrc}
						alt="imagem"
						className="max-w-full max-h-full object-contain"
					/>
				) : (
					<Image />
				)}
			</CardContent>

			{renderFooter()}
		</Card>
	);
}
