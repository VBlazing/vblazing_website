/*
 * @Author: VBlazing
 * @Date: 2025-10-24 20:34:36
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 20:34:50
 * @Description: i18n 代理
 */

import createMiddleware from 'next-intl/middleware';
import { routing } from '@/lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};