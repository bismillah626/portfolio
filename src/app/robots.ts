import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://portfolio-red-xi-76.vercel.app/sitemap.xml",
  };
}
