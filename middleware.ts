/*
 * @Author: VBlazing
 * @Date: 2025-10-24 22:54:58
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 22:57:13
 * @Description: middleware
 */
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};