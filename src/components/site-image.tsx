import NextImage, { type ImageProps } from "next/image";

// Next Link adds basePath automatically; public image URLs need it explicitly.
export default function Image({ src, ...props }: ImageProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const source =
    typeof src === "string" && src.startsWith("/") && !src.startsWith("//")
      ? `${basePath}${src}`
      : src;
  return <NextImage src={source} {...props} />;
}
