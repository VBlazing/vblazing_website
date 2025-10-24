/*
 * @Author: VBlazing
 * @Date: 2025-10-24 20:16:25
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-10-24 20:26:31
 * @Description: i18n 路由设置
 */
import { defineRouting } from 'next-intl/routing'
import { LOCALE_CODE } from '@/lib/const'

export const routing = defineRouting({
  locales: [LOCALE_CODE.ZH, LOCALE_CODE.EN],
  defaultLocale: LOCALE_CODE.ZH,
})