import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/manage-fk-2024/', '/api/'],
    },
    sitemap: 'https://furakufine.co.jp/sitemap.xml',
  }
}