/*
 * @Author: VBlazing
 * @Date: 2025-10-24 20:28:17
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 20:56:46
 * @Description: 服务器组件 & server action 调用翻译方法
 */

import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from '@/lib/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = await import(`@/locales/${locale}.json`)

  return {
    locale,
    messages: messages.default
  };
});