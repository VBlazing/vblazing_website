/*
 * @Author: vblazing
 * @Date: 2025-09-05 22:45:02
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-06 00:23:50
 * @Description: 国际化服务
 */
'use server'

import { cookies, headers } from "next/headers";
import { defaultLocaleConfig, localeConfigs } from "./config";

const COOKIE_NAME = 'VBLAZING_LOCALE'

/**
 * @description: 获取当前用户语言环境
 * @return {*} localeConfig 当前用户语言环境
 */
export async function getUserLocaleConfig() {
  // cookie中携带的语言环境
  const cookiesLocale = (await cookies()).get(COOKIE_NAME)?.value

  // 请求头中携带的语言环境
  const acceptLanguage = (await headers()).get('accept-language')

  const acceptLocale = acceptLanguage?.split(',')?.[0]?.split('-')?.[0]

  const locale = cookiesLocale || acceptLocale

  if (!locale) {
    return defaultLocaleConfig
  }

  // 确认当前语言环境是否支持翻译，不支持返回默认语言环境
  return localeConfigs.find(item => item.code === locale) ?? defaultLocaleConfig
}


/**
 * @description: 设置语言环境到cookie中
 * @param {*} locale 语言环境缩写
 */
export async function setUserLocale(locale: string) {
  (await cookies()).set(COOKIE_NAME, locale)
}
