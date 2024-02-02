import { MetadataRoute } from "next";

export function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://catsnewyear.site",
      lastModified: new Date(),
    },
    {
      url: "https://catsnewyear.site/letter",
      lastModified: new Date(),
    },
    {
      url: "https://catsnewyear.site/mailing",
      lastModified: new Date(),
    },
    {
      url: "https://catsnewyear.site/receiver",
      lastModified: new Date(),
    },
  ];
}
