/*
 * @Author: vblazing
 * @Date: 2025-09-20 22:50:58
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-21 02:01:12
 * @Description: 获取页面数据
 */
import { getUserLocaleConfig } from "@/i18n/service";
import { homeHeroInfo } from "./placeholder_data";

/**
 * @description: 获取主页简介数据
 * @return {*} homeHeroInfo 主页简介数据
 */
export async function fetchHomeHeroInfo() {
  const currentLocaleConfig = await getUserLocaleConfig();
  return homeHeroInfo[currentLocaleConfig?.code]
}