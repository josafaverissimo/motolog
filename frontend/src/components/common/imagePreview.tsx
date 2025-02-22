import { useState, useEffect } from "react";
import { Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type ImagePreviewProps = {
  image: File | null;
};

export function ImagePreview({ image }: ImagePreviewProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      setImageSrc(null);

      return;
    }

    setImageSrc(URL.createObjectURL(image));

    console.log(imageSrc);

    return () => URL.revokeObjectURL(imageSrc!);
  }, [image]);

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
    </Card>
  );
}
