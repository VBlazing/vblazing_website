/*
 * @Author: VBlazing
 * @Date: 2025-11-10 17:13:42
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-10 17:54:03
 * @Description: sitemap 站点地图
 */
import { MetadataRoute } from 'next';
import { getPathname } from '@/lib/i18n/navigation';
import { fetchPublishedBlogList } from '@/server/data';

const host = 'https://blog.vblazing.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogList = await fetchPublishedBlogList() ?? []

  const blogSiteUrl: MetadataRoute.Sitemap = blogList?.map(item => ({
    url: `${host}/${item.id}/detail`,
    lastModified: item.last_edited_time,
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: {
      languages: {
        en: host + getPathname({ locale: 'en', href: `/${item.id}/detail` }),
        zh: host + getPathname({ locale: 'zh', href: `/${item.id}/detail` })
      }
    }
  }))

  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: host + getPathname({ locale: 'en', href: '/' }),
          zh: host + getPathname({ locale: 'zh', href: '/' })
        }
      }
    },
    {
      url: host + '/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: host + getPathname({ locale: 'en', href: '/blog' }),
          zh: host + getPathname({ locale: 'zh', href: '/blog' })
        }
      }
    },
    {
      url: host + '/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: {
        languages: {
          en: host + getPathname({ locale: 'en', href: '/about' }),
          zh: host + getPathname({ locale: 'zh', href: '/about' })
        }
      }
    },
    ...blogSiteUrl,
  ];
}