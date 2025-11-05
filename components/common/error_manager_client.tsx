/*
 * @Author: VBlazing
 * @Date: 2025-10-14 11:08:28
 * @LastEditors: VBlazing
 * @LastEditTime: 2025-11-05 10:56:05
 * @Description: 错误注入
 */
"use client";

import { useEffect } from "react";
import { initErrorManager } from "@/lib/error";
import { useTranslations } from "next-intl";

export default function ErrorManagerClient() {
  const t = useTranslations("error");
  useEffect(() => {
    initErrorManager(t);
  }, [t]);
  return null;
}
