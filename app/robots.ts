import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/login/dashboard/'],
        },
        sitemap: 'https://edushield.ai/sitemap.xml',
    }
}
