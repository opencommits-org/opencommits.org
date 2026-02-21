import type { MetadataRoute } from 'next'

const BASE_URL = 'https://opencommits.org'
const LOCALES = ['en', 'de', 'fr', 'es'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/spec`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  for (const locale of LOCALES) {
    if (locale === 'en') {
      continue
    }

    entries.push(
      {
        url: `${BASE_URL}/${locale}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/${locale}/spec`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    )
  }

  return entries
}
