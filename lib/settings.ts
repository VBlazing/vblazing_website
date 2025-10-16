'use server'

import { cache } from 'react';
import { SettingsType } from "@/lib/definitions";
import { getCookie, setCookie } from "@/lib/cookie";

const defaultSettings: SettingsType = {
  mode: 'full'
}

/**
 * @description 获取“页面设置”cookie
 * @returns {SettingsType}
 */
export const getSettings = cache(async () => {
  const settings = await getCookie(["setting_mode"]);
  return Object.entries(settings).reduce((acc, [key, value]) => {
    const newKey = key.split('setting_')[1] as keyof SettingsType
    return {
      ...acc,
      [newKey]: (value || defaultSettings[newKey]) as SettingsType[typeof newKey]
    }
  }, {} as SettingsType)
})

/**
 * @description 设置“页面设置”cookie
 * @param {SettingsType}
 */
export const setSettings = async (value: SettingsType) => {
  const cookieSettings = Object.entries(value).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [`setting_${key}`]: value
    }
  }, {} as Record<string, string>)
  await setCookie(cookieSettings)
}