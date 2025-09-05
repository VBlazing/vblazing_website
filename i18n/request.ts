/*
 * @Author: vblazing
 * @Date: 2025-09-05 17:30:18
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-06 00:45:32
 * @Description: 国际化获取翻译文本
 */
import { getRequestConfig } from 'next-intl/server'
import { getUserLocaleConfig } from './service';

export default getRequestConfig(async () => {

  const localeConfig = await getUserLocaleConfig()
  const messages = await import(`../messages/${localeConfig.code}.json`)
  return {
    locale: localeConfig.code,
    messages: messages.default
  }
});