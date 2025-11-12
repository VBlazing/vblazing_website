/*
 * @Author: VBlazing
 * @Date: 2025-11-10 17:13:42
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-12 12:45:10
 * @Description: sitemap 站点地图
 */
import { MetadataRoute } from 'next';
import { getUrl } from '@/lib/i18n/navigation';
import { HOST, LOCALE_CODE } from '@/lib/const';
import { fetchPublishedBlogList } from '@/server/data';
import { getPostPath } from '@/lib/navigate';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogList = await fetchPublishedBlogList() ?? []

  const blogSiteUrl: MetadataRoute.Sitemap = blogList?.map(item => ({
    url: HOST + getPostPath(item.id),
    lastModified: new Date(item.last_edited_time),
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: {
      languages: {
        en: getUrl(getPostPath(item.id), LOCALE_CODE.EN),
        zh: getUrl(getPostPath(item.id), LOCALE_CODE.ZH),
      }
    }
  }))

  return [
    {
      url: HOST,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: getUrl('/', LOCALE_CODE.EN),
          zh: getUrl('/', LOCALE_CODE.ZH),
        }
      }
    },
    {
      url: HOST + '/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: getUrl('/blog', LOCALE_CODE.EN),
          zh: getUrl('/blog', LOCALE_CODE.ZH),
        }
      }
    },
    {
      url: HOST + '/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: {
        languages: {
          en: getUrl('/about', LOCALE_CODE.EN),
          zh: getUrl('/about', LOCALE_CODE.ZH),
        }
      }
    },
    ...blogSiteUrl,
  ];
}