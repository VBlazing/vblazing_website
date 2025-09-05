/*
 * @Author: vblazing
 * @Date: 2025-09-06 00:29:47
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-06 00:39:50
 * @Description: 更换语言环境服务端组件
 */
import { getUserLocaleConfig } from "@/i18n/service";
import LocaleSwitchClient from "./locale_switch";

export default async function LocaleSwitch() {
  const currentLocaleConfig = await getUserLocaleConfig();

  return <LocaleSwitchClient currentLocaleConfig={currentLocaleConfig} />;
}
