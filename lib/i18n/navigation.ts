/*
 * @Author: VBlazing
 * @Date: 2025-10-24 20:27:17
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 20:27:57
 * @Description: i18n 包裹后的路由方法
 */
import { createNavigation } from 'next-intl/navigation';
import { routing } from '@/lib/i18n/routing';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);