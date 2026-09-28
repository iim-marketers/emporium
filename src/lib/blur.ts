import sharp from "sharp";

import { site } from "@/lib/site";

export async function blurDataURL(src: string) {
  try {
    const response = await fetch(new URL(src, site.url));
    if (!response.ok) return undefined;

    const tiny = await sharp(Buffer.from(await response.arrayBuffer()))
      .resize(16)
      .jpeg({ quality: 60 })
      .toBuffer();
    return `data:image/jpeg;base64,${tiny.toString("base64")}`;
  } catch {
    return undefined;
  }
}
