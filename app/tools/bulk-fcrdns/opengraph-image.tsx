import { ImageMetadata } from "@/components/image-metadata";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function Image() {
  const slogan = "Bulk FCrDNS (Forward-confirmed reverse DNS) Record lookup.";
  return ImageMetadata({ slogan });
}
