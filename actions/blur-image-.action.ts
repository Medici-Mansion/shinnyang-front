"use server";
import { getPlaiceholder } from "plaiceholder";
import path from "path";
const fs = require("fs").promises;

export interface ImageMetadata {
  path: string;
  name: string;
}

export interface ImageWithBlur
  extends Awaited<ReturnType<typeof getBlurImage>> {
  src: string;
}

export async function getBlurImage(src: string) {
  "use server";
  if (!src.includes("http")) {
    const imagePath = src;
    const buffer = await fs.readFile(path.join(process.cwd(), imagePath));
    const placeholder = await getPlaiceholder(buffer);
    return {
      placeholder,
      src: imagePath,
    };
  } else {
    const response = await fetch(src, {
      cache: "force-cache",
    });
    const arrayBuffer = Buffer.from(await response.arrayBuffer());
    const placeholder = await getPlaiceholder(arrayBuffer);
    return {
      placeholder,
      src: src,
    };
  }
}

export async function generateBlurImageByImageList<T extends ImageMetadata[]>(
  imageList: [...T],
) {
  "use server";
  const result = await Promise.all(
    imageList.map((img) => getBlurImage(img.path)),
  );
  const imageDict = {};
  imageList.forEach((image, index) => {
    (imageDict as any)[image.name] = result[index];
  });
  return imageDict as { [key in T[number]["name"]]: ImageWithBlur };
}
