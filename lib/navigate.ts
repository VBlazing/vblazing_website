/*
 * @Author: vblazing
 * @Date: 2025-09-19 16:34:38
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-20 15:27:04
 * @Description: 导航配置
 */
import { BookOpen, Briefcase, Home, UserIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const getNavigate = async () => {
  const t = await getTranslations('nav')
  return [{
    key: 'home',
    title: t('nav_home'),
    href: '/',
    icon: Home
  }, {
    key: 'blog',
    title: t('nav_blog'),
    href: '/blog',
    icon: BookOpen
  }, {
    key: 'products',
    title: t('nav_products'),
    href: '/products',
    icon: Briefcase
  }, {
    key: 'about',
    title: t('nav_about'),
    href: '/about',
    icon: UserIcon
  }]
}