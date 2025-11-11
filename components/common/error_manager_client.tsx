/*
 * @Author: VBlazing
 * @Date: 2025-10-14 11:08:28
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-10 16:20:40
 * @Description: 错误注入
 */
"use client";

import { useEffect } from "react";
import { initErrorManager } from "@/lib/error";
import { useTranslations } from "next-intl";

export default function ErrorManagerClient() {
  const t = useTranslations("error");
  // todo next 更新16后 使用 useEffectEvent 重置
  // const globalEffectHandlerWithT = useEffectEvent
  useEffect(() => {
    initErrorManager(t);
  }, [t]);
  return null;
}
