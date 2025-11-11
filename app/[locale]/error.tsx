/*
 * @Author: vblazing
 * @Date: 2025-09-21 19:40:07
 * @LastEditors: vblazing
 * @LastEditTime: 2025-09-23 18:08:43
 * @Description: 报错页面
 */
"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error_page");

  useEffect(() => {
    // todo
    // 1. 页面打印信息
    // 2. 上报
    console.error("Error", error.message);
  }, [error]);

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-8 sm:items-start">
      <div className="space-y-6 text-center sm:ml-[10%] sm:text-left">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-slate-300">Oops...</h1>
        </div>
        <h2 className="text-subtitle text-2xl">
          {error.message || t("wrong")}
        </h2>
        <div className="mt-10">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => reset()}
          >
            <span>{t("try_again")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
