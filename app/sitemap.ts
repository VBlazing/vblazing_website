/*
 * @Author: VBlazing
 * @Date: 2025-11-10 17:13:42
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-21 13:02:29
 * @Description: sitemap 站点地图
 */
import { MetadataRoute } from 'next';
import { getUrl } from '@/lib/i18n/navigation';
import { LOCALE_CODE } from '@/lib/const';
import { fetchPublishedPostList } from '@/server/data';
import { getPostPath } from '@/lib/navigate';
import { routing } from '@/lib/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const localeList = routing.locales
  const postList = await fetchPublishedPostList() ?? []

  const postSiteUrl: MetadataRoute.Sitemap = postList?.map(item => ({
    url: getPostPath(item.slug),
    lastModified: new Date(item.last_edited_time),
    changeFrequency: 'weekly',
    priority: 0.9,
    alternates: {
      languages: {
        en: getUrl(getPostPath(item.slug), LOCALE_CODE.EN),
        zh: getUrl(getPostPath(item.slug), LOCALE_CODE.ZH),
      }
    }
  }))

  // 单语言下的所有页面
  const singleLocalePageList: MetadataRoute.Sitemap = [
    {
      url: '/',
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
      url: '/blog',
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
      url: '/about',
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
    ...postSiteUrl,
  ];

  // 添加不同语言
  const pageList = localeList.flatMap(locale => {
    return singleLocalePageList.map(page => ({
      ...page,
      url: getUrl(page.url, locale)
    }))
  })

  return pageList
}