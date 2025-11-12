/*
 * @Author: VBlazing
 * @Date: 2025-10-24 20:27:17
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-12 13:41:43
 * @Description: i18n 包裹后的路由方法
 */
import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/lib/i18n/routing';
import { HOST, LOCALE_CODE } from '@/lib/const';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);

/**
 * @description: 获取完整url链接
 * @param {pathname, locale} 路径，语言环境
 * @return {string} url
 */
export const getUrl = (pathname: string, locale: LOCALE_CODE) => {
  return `${HOST}${getPathname({ href: pathname, locale })}`
}