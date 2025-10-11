/*
 * @Author: vblazing
 * @Date: 2025-09-19 16:34:38
 * @LastEditors: vblazing
 * @LastEditTime: 2025-10-11 15:48:07
 * @Description: 导航配置
 */
import { getTranslations } from 'next-intl/server';

export interface INavigateConfig {
  key: string
  title: string
  href: string
  icon: string
}

/**
 * @description: 获取导航配置
 * @return {*} navigateList 导航配置列表
 */
export async function getNavigate(): Promise<INavigateConfig[]> {

  const t = await getTranslations('nav')
  return [{
    key: 'home',
    title: t('nav_home'),
    href: '/',
    icon: 'Home'
  }, {
    key: 'blog',
    title: t('nav_docs'),
    href: '/blog',
    icon: 'BookOpen'
  }, {
    key: 'products',
    title: t('nav_products'),
    href: '/products',
    icon: 'Briefcase'
  }, {
    key: 'about',
    title: t('nav_about'),
    href: '/about',
    icon: 'UserIcon'
  }]
}

/**
 * @description: 获取跳转文章详情url
 * @return {string} url
 */
export const getBlogDetailUrl = (id: string) => `/${id}/detail`