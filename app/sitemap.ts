import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://catsnewyear.site",
      changeFrequency: "yearly",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://catsnewyear.site/letter",
      changeFrequency: "yearly",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://catsnewyear.site/mailing",
      changeFrequency: "yearly",
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: "https://catsnewyear.site/receiver",
      changeFrequency: "yearly",
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}
