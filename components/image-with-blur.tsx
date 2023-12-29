import { getBlurImage } from "@/actions/blur-image-.action";
import Image from "next/image";

async function ImgWithPlaceholder({ src }: { src: string }) {
  const { placeholder, src: imageURL } = await getBlurImage(src);

  return (
    <Image
      src={imageURL}
      alt={src}
      width={placeholder.metadata.width}
      height={placeholder.metadata.height}
      style={{ objectFit: "contain" }}
      placeholder="blur"
      blurDataURL={placeholder.base64}
    />
  );
}
export default ImgWithPlaceholder;
