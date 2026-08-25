import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vidyashreeScienceclasses.in'

  const routes = [
    '',
    '/about',
    '/achievements',
    '/contact',
    '/courses',
    '/enquiry',
    '/facilities',
    '/faqs',
    '/gallery',
    '/subjects',
    '/why-us'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes]
}
